package routes

import (
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/middleware"
	"bitbucket.org/zwzn/comicbox/comicboxd/data"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
	assetfs "github.com/elazarl/go-bindata-assetfs"
)

func Web(s *server.Server) {

	auth := s.Router.PathPrefix("/").Subrouter()
	auth.Use(middleware.Auth)
	GraphQL(auth)

	auth.HandleFunc("/api/v1/book/{id:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}/page/{page:[0-9]+}.{ext:(?:jpg|png)}", controller.BookPage).Methods("GET")

	auth.HandleFunc("/login", controller.User.Login).Methods("POST")

	s.Router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(&assetfs.AssetFS{
		Asset:     data.Asset,
		AssetDir:  data.AssetDir,
		AssetInfo: data.AssetInfo,
		Prefix:    "web/dist",
	}))).Methods("GET")

	s.Router.Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		d, err := data.Asset("web/dist/index.html")
		errors.Check(err)
		_, err = w.Write(d)
		errors.Check(err)
	})

}
