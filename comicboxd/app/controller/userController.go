package controller

import (
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/gql"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
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

	c.SSet("user_id", user.ID)

	c.Response = user
}

func (a *user) Create(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(r)

	// since password doesn't have a json tag i need to make a new struct
	body := struct {
		Username string `json:"username"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}{}
	err := c.DecodeBody(&body)
	if err != nil {
		c.Response = err
		return
	}

	hash, err := HashPassword(body.Password)
	user := model.User{
		Username: body.Username,
		Password: hash,
		Name:     body.Name,
	}

	_, err = c.DB.NamedExec(model.InsertSQL("user", user), user)
	if err != nil {
		c.Response = err
		return
	}
	user2 := model.User{}

	err = c.DB.Get(&user2, `select * from user where username=?`, user.Username)
	if err != nil {
		c.Response = err
		return
	}

	c.Response = user2
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
