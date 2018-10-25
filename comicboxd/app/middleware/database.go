package middleware

import (
	"net/http"

	"github.com/abibby/comicbox/comicboxd/app"
	"github.com/abibby/comicbox/comicboxd/app/database"
)

func Database(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(r)

		ctx.DB = database.DB

		next.ServeHTTP(w, r)
	})
}
