package middleware

import (
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/j"
)

func Log(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		j.Info(r.RequestURI)

		next.ServeHTTP(w, r)
	})
}
