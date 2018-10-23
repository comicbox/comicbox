package routes

import (
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/middleware"
	"bitbucket.org/zwzn/comicbox/comicboxd/data"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
	assetfs "github.com/elazarl/go-bindata-assetfs"
)

func Web(s *server.Server) {

	middleware.Global(s.Router)

	s.Router.HandleFunc("/login", controller.User.Login).Methods("POST")

	GraphQL(s.Router)

	if auth := s.Router.PathPrefix("/api").Subrouter(); true {
		auth.Use(middleware.Auth)
		auth.Use(middleware.Cache)

		auth.HandleFunc("/v1/book/{id:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}/page/{page:[0-9]+}.{ext:(?:jpg|png)}", controller.BookPage).Methods("GET")
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
