package middleware

import (
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/database"
)

func Database(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(r)

		ctx.DB = database.DB

		next.ServeHTTP(w, r)
	})
}
