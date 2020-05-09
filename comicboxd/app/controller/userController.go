package controller

import (
	"database/sql"
	"net/http"

	"github.com/comicbox/comicbox/comicboxd/app"
	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/app/model"
	"github.com/comicbox/comicbox/comicboxd/errors"
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
	err = database.Get(&user, `select * from user where username=? COLLATE NOCASE`, body.Username)
	if err == sql.ErrNoRows {
		c.Response = errors.HTTP(401)
		return
	} else if err != nil {
		c.Response = err
		return
	}

	if !checkPasswordHash(body.Password, user.Password) {
		c.Response = errors.HTTP(401)
		return
	}

	c.SSet("user_id", user.ID.String())

	c.Response = user
}

// from https://gowebexamples.com/password-hashing/
func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
