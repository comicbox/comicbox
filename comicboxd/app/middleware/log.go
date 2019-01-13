package middleware

import (
	"net/http"
	"time"

	"github.com/comicbox/comicbox/comicboxd/j"
)

func Log(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		sTime := time.Now()

		next.ServeHTTP(w, r)

		eTime := time.Now()
		duration := eTime.Sub(sTime).Round(time.Millisecond)
		j.Infof("%5v [%s] %s - %s", duration, r.Method, r.RequestURI, r.RemoteAddr)
	})
}
