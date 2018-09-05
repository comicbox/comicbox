package controller

import (
	"encoding/json"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type Context struct {
	vars           map[string]string
	ResponseWriter http.ResponseWriter
	Request        *http.Request
	DB             *sqlx.DB
	User           *model.User
}

func (c Context) Var(key string) string {
	if c.vars == nil {
		c.vars = mux.Vars(c.Request)
	}
	return c.vars[key]
}

func (c Context) DecodeBody(v interface{}) error {
	return json.NewDecoder(c.Request.Body).Decode(v)
}
