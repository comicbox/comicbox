package middleware

import "github.com/gorilla/mux"

func Global(r *mux.Router) {
	r.Use(Log)
}
