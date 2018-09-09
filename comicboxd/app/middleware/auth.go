package middleware

import (
	"database/sql"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
)

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(w, r)

		if uid, ok := ctx.SGetInt64("user_id"); ok {

			ctx.User = &model.User{}
			err := ctx.DB.Get(ctx.User, `select * from user where id=? limit 1`, uid)
			if err == sql.ErrNoRows {
				ctx.SClear("user_id")

				ctx.User = &model.User{
					Name:     "Guest",
					Username: "guest",
				}
			} else if err != nil {
				panic(err)
			}
		} else {
			ctx.User = &model.User{
				Name:     "Guest",
				Username: "guest",
			}
		}

		next.ServeHTTP(w, r)
	})
}
