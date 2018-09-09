package middleware

import (
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("something-very-secret"))

func Session(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(w, r)

		session, err := store.Get(r, "session-name")
		if err != nil {
			writeError(w, err, 500)
		}
		ctx.Session = session

		next.ServeHTTP(w, r)

		ctx.Session.Save(r, w)
	})
}
