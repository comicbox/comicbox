package middleware

import (
	"database/sql"
	"encoding/base64"
	"net/http"
	"strings"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
)

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(r)

		if uid, ok := ctx.SGet("user_id"); ok {

			ctx.User = &model.User{}
			err := ctx.DB.Get(ctx.User, `select * from user where id=? limit 1`, uid)
			if err == sql.ErrNoRows {
				ctx.SClear("user_id")
				ctx.User = nil
			} else if err != nil {
				panic(err)
			}
		}

		if ctx.User == nil {

			auth := strings.SplitN(r.Header.Get("Authorization"), " ", 2)

			if len(auth) != 2 || auth[0] != "Basic" {
				http.Error(w, "authorization failed", http.StatusUnauthorized)
				return
			}

			payload, _ := base64.StdEncoding.DecodeString(auth[1])
			pair := strings.SplitN(string(payload), ":", 2)
			user, pass := pair[0], pair[1]

			if len(pair) != 2 {
				http.Error(w, "authorization failed", http.StatusUnauthorized)
				return
			}

			ctx.User = &model.User{}
			err := ctx.DB.Get(ctx.User, `select * from user where username=? limit 1`, user)
			if err != nil {
				panic(err)
			}

			if !controller.CheckPasswordHash(pass, ctx.User.Password) {
				http.Error(w, "authorization failed", http.StatusUnauthorized)
				return
			}
		}

		if ctx.User == nil {
			ctx.User = &model.User{
				Name:     "Guest",
				Username: "guest",
			}
		}

		next.ServeHTTP(w, r)
	})
}
