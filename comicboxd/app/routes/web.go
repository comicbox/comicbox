package routes

import (
	"net/http"

	assetfs "github.com/elazarl/go-bindata-assetfs"
	"github.com/zwzn/comicbox/comicboxd/app/controller"
	"github.com/zwzn/comicbox/comicboxd/app/middleware"
	"github.com/zwzn/comicbox/comicboxd/app/schema"
	"github.com/zwzn/comicbox/comicboxd/data"
	"github.com/zwzn/comicbox/comicboxd/errors"
	"github.com/zwzn/comicbox/comicboxd/server"
)

func Web(s *server.Server) {

	middleware.Global(s.Router)

	s.Router.HandleFunc("/login", controller.User.Login).Methods("POST")

	if auth := s.Router.PathPrefix("/api").Subrouter(); true {
		auth.Use(middleware.Auth)
		// auth.Use(middleware.Cache)

		auth.HandleFunc("/push", controller.Push.Sub)
		auth.HandleFunc("/scan", controller.Book.Scan)

		if auth := auth.PathPrefix("/v1").Subrouter(); true {
			// auth.Use(middleware.Cache)
			auth.Use(middleware.HTTPCache)
			auth.HandleFunc("/book/{id:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}/page/{page:[0-9]+}.{ext:(?:jpg|png|bmp)}", controller.Book.Page).Methods("GET")
		}
	}

	s.Router.Handle("/graphql", middleware.Auth(schema.Handler())).Methods("POST")
	s.Router.HandleFunc("/graphql", func(w http.ResponseWriter, r *http.Request) {
		_, err := w.Write(data.MustAsset("web/dist/graphql.html"))
		errors.Check(err)
	}).Methods("GET")

	s.Router.Methods("GET").Handler(http.FileServer(&assetfs.AssetFS{
		Asset:     data.Asset,
		AssetDir:  data.AssetDir,
		AssetInfo: data.AssetInfo,
		Prefix:    "web/dist",
	}))
}
