package middleware

import (
	"net/http"
)

type ErrorResponse struct {
	Error  string `json:"error"`
	Status int    `json:"status"`
	Stack  string `json:"-"`
}

func Recover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			v := recover()
			if v != nil {
				writeError(w, v, 500)
			}
		}()
		next.ServeHTTP(w, r)
	})
}
