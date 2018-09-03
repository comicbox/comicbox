package routes

import (
	"fmt"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/server"
)

func Web(s *server.Server) {

	s.Router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello World!")
	})
}
