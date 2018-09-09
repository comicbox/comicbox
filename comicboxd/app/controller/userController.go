package controller

import (
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"golang.org/x/crypto/bcrypt"
)

type user struct{}

var User = user{}

func (a *user) Login(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(w, r)

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
	c := app.Ctx(w, r)

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
