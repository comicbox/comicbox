package routes

import (
	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/middleware"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
)

func APIv1(s *server.Server) {
	s.Router.HandleFunc("/api/v1/login", controller.User.Login).Methods("POST")
	s.Router.HandleFunc("/api/v1/user", controller.User.Create).Methods("POST")

	r := s.Router.PathPrefix("/api/v1").Subrouter()
	r.Use(middleware.Auth)

	r.HandleFunc("/book", controller.Book.Index).Methods("GET")
	r.HandleFunc("/book/{id}", controller.Book.Show).Methods("GET")
}
