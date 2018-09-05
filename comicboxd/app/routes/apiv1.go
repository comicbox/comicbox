package routes

import (
	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
)

func APIv1(s *server.Server) {
	r := s.Router.PathPrefix("/api/v1").Subrouter()

	r.HandleFunc("/book", route(s, controller.Book.Index))

	r.HandleFunc("/book/{id}", route(s, controller.Book.Show))
}
