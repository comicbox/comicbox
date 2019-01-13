package middleware

import (
	"net/http"

	"github.com/comicbox/comicbox/comicboxd/app"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("change this"))

// var store = sessions.NewFilesystemStore("./session")

func Session(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(r)

		session, err := store.Get(r, "comicbox-session")
		if err != nil {
			writeError(w, err, 500)
			return
		}

		ctx.Session = session

		next.ServeHTTP(w, r)

		err = session.Save(r, w)
		if err != nil {
			writeError(w, err, 500)
			return
		}

	})
}
