package controller

import "bitbucket.org/zwzn/comicbox/comicboxd/app/model"

type auth struct{}

var Auth = auth{}

func (a *auth) Login(c Context) interface{} {
	body := struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}{}
	c.DecodeBody(&body)

	user := model.User{}
	err := c.DB.Get(&user, `select * from user where username=?`, body.Username)
	if err != nil {
		return err
	}

	return user
}
