package routes

import (
	"net/http"

	"github.com/zwzn/comicbox/comicboxd/app/controller"
	"github.com/zwzn/comicbox/comicboxd/app/middleware"
	"github.com/zwzn/comicbox/comicboxd/data"
	"github.com/zwzn/comicbox/comicboxd/server"
	assetfs "github.com/elazarl/go-bindata-assetfs"
)

func Web(s *server.Server) {

	middleware.Global(s.Router)

	s.Router.HandleFunc("/login", controller.User.Login).Methods("POST")

	GraphQL(s.Router)

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

	s.Router.Methods("GET").Handler(http.FileServer(&assetfs.AssetFS{
		Asset:     data.Asset,
		AssetDir:  data.AssetDir,
		AssetInfo: data.AssetInfo,
		Prefix:    "../cordova/platforms/browser/www",
	}))

	// s.Router.Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 	d, err := data.Asset("../cordova/www/index.html")
	// 	errors.Check(err)
	// 	_, err = w.Write(d)
	// 	errors.Check(err)
	// })

}
