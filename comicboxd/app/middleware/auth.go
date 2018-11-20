package middleware

import (
	"database/sql"
	"net/http"

	"github.com/abibby/comicbox/comicboxd/app"
	"github.com/abibby/comicbox/comicboxd/app/controller"
	"github.com/abibby/comicbox/comicboxd/app/model"
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
			if user, pass, ok := r.BasicAuth(); ok {
				ctx.User = &model.User{}
				err := ctx.DB.Get(ctx.User, `select * from user where username=? limit 1`, user)
				if err != nil {
					panic(err)
				}

				if !controller.CheckPasswordHash(pass, ctx.User.Password) {
					ctx.User = nil
				}
			}

		}

		if ctx.User == nil {
			// http.Error(w, "authorization failed", http.StatusUnauthorized)
			// return
			ctx.User = &model.User{
				Name:     "Guest",
				Username: "guest",
			}
		}

		next.ServeHTTP(w, r)
	})
}
