package routes

import (
	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/middleware"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
)

func APIv1(s *server.Server) {
	s.Router.HandleFunc("/api/v1/login", route(s, controller.Auth.Login)).Methods("POST")

	r := s.Router.PathPrefix("/api/v1").Subrouter()
	r.Use(middleware.Auth)

	r.HandleFunc("/book", route(s, controller.Book.Index)).Methods("GET")
	r.HandleFunc("/book/{id}", route(s, controller.Book.Show)).Methods("GET")
}
