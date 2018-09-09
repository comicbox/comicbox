package middleware

import "github.com/gorilla/mux"

func Global(r *mux.Router) {
	r.Use(Recover)
	r.Use(Log)
	r.Use(Database)
	r.Use(Session)
	r.Use(Response)
}
