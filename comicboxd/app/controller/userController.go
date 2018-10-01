package controller

import (
	"fmt"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/gql"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
	"golang.org/x/crypto/bcrypt"
)

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
	err = c.DB.Get(&user, `select * from user where username=?`, body.Username)
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

var UserQueries = graphql.Fields{
	"me": &graphql.Field{
		Type: UserType,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)
			return c.User, nil
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
				err := c.DB.Get(&numRows, "select count(*) from user where id=?", id)
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
			hash, err := HashPassword(userMap["password"].(string))
			if err != nil {
				return nil, err
			}

			userMap["password"] = hash
			err = gql.InsertOrUpdate(c.DB, "user", model.User{}, userMap, map[string]interface{}{
				"id": id,
			})
			if err != nil {
				return nil, err
			}

			user := &model.User{}
			err = c.DB.Get(user, "select * from user where id=?", id)
			if err != nil {
				return nil, err
			}

			return user, nil
		},
	},
}
