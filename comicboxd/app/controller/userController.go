package controller

import (
	"database/sql"
	"fmt"
	"net/http"

	sq "github.com/Masterminds/squirrel"
	"github.com/abibby/comicbox/comicboxd/app"
	"github.com/abibby/comicbox/comicboxd/app/database"
	"github.com/abibby/comicbox/comicboxd/app/gql"
	"github.com/abibby/comicbox/comicboxd/app/model"
	"github.com/abibby/comicbox/comicboxd/errors"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
	"golang.org/x/crypto/bcrypt"
)

type UserQuery struct {
	PageInfo gql.Page      `json:"page_info"`
	Results  []*model.User `json:"results"`
}

type user struct{}

var User = user{}

func (a *user) Login(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(r)

	body := struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}{}
	err := c.DecodeBody(&body)
	if err != nil {
		c.Response = err
		return
	}

	user := model.User{}
	err = database.Get(&user, `select * from user where username=?`, body.Username)
	if err != nil {
		c.Response = err
		return
	}

	if !CheckPasswordHash(body.Password, user.Password) {
		c.Response = errors.HTTP(401)
		return
	}

	c.SSet("user_id", user.ID.String())

	c.Response = user
}

// from https://gowebexamples.com/password-hashing/
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// from https://gowebexamples.com/password-hashing/
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

var UserType = graphql.NewObject(graphql.ObjectConfig{
	Name: "User",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type:        graphql.ID,
			Description: "a unique id for the books",
			Resolve:     gql.ResolveVal("ID"),
		},
		"created_at": &graphql.Field{
			Type:        graphql.DateTime,
			Description: "the date a book was created",
			Resolve:     gql.ResolveVal("CreatedAt"),
		},
		"updated_at": &graphql.Field{
			Type:    graphql.DateTime,
			Resolve: gql.ResolveVal("UpdatedAt"),
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"username": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var UserQueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "UserQuery",
	Fields: graphql.Fields{
		"page_info": &graphql.Field{
			Type: gql.PageInfoType,
		},
		"results": &graphql.Field{
			Type: graphql.NewList(UserType),
		},
	},
})

var UserQueries = graphql.Fields{
	"me": &graphql.Field{
		Type: UserType,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)
			return c.User, nil
		},
	},
	"users": &graphql.Field{
		Args: gql.QueryArgs(model.User{}, graphql.FieldConfigArgument{
			"take": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
			"skip": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"me": &graphql.ArgumentConfig{
				Type: graphql.Boolean,
			},
		}),
		Type: UserQueryType,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)

			skip, _ := p.Args["skip"].(int)
			take, _ := p.Args["take"].(int)

			me, _ := p.Args["me"].(bool)
			delete(p.Args, "me")

			if 0 > take || take > 100 {
				return nil, fmt.Errorf("you must take between 0 and 100 items")
			}

			query := sq.Select().From("user") //.Where(sq.Eq{"id": c.User.ID})
			if me {
				query = query.Where(sq.Eq{"id": c.User.ID})
			}
			query = gql.Args(query, model.User{}, p.Args)
			query = query.OrderBy("name")
			sqll, args, err := query.Columns("count(*)").ToSql()
			errors.Check(err)

			var count int
			err = database.Get(&count, sqll, args...)
			if err == sql.ErrNoRows {
				count = 0
			} else if err != nil {
				return nil, err
			}

			users := []*model.User{}
			sqll, args, err = query.
				Columns("*").
				Offset(uint64(skip)).
				Limit(uint64(take)).
				ToSql()
			errors.Check(err)

			err = database.Select(&users, sqll, args...)
			if err == sql.ErrNoRows {
				return nil, nil
			} else if err != nil {
				return nil, err
			}

			return UserQuery{
				PageInfo: gql.Page{
					Skip:  skip,
					Take:  take,
					Total: count,
				},
				Results: users,
			}, nil
		},
	},
}

var UserInput = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "UserInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"name": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"username": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"password": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
	},
})

var UserMutations = graphql.Fields{
	"user": &graphql.Field{
		Type: UserType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.ID,
			},
			"user": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(UserInput),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			var err error
			c := gql.Ctx(p)

			if (c.User.ID == uuid.UUID{}) {
				return nil, fmt.Errorf("you must be logged in to mutate series")
			}

			id, ok := p.Args["id"]

			if ok {
				numRows := 0
				err := database.Get(&numRows, "select count(*) from user where id=?", id)
				if err != nil {
					return nil, err
				}
				if numRows == 0 {
					return nil, fmt.Errorf("no user with id %s", id)
				}
			} else {
				id, err = uuid.NewRandom()
				if err != nil {
					return nil, err
				}
			}

			userMap := p.Args["user"].(map[string]interface{})

			if password, ok := userMap["password"]; ok {
				hash, err := HashPassword(password.(string))
				if err != nil {
					return nil, err
				}
				userMap["password"] = hash
			}

			err = gql.InsertOrUpdate("user", model.User{}, userMap, map[string]interface{}{
				"id": id,
			})
			if err != nil {
				return nil, err
			}

			user := &model.User{}
			err = database.Get(user, "select * from user where id=?", id)
			if err != nil {
				return nil, err
			}

			return user, nil
		},
	},
}
