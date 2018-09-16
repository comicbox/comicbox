package routes

import (
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/data"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
	assetfs "github.com/elazarl/go-bindata-assetfs"
)

func Web(s *server.Server) {

	s.Router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(&assetfs.AssetFS{
		Asset:     data.Asset,
		AssetDir:  data.AssetDir,
		AssetInfo: data.AssetInfo,
		Prefix:    "web/dist",
	})))

	GraphQL(s)

	s.Router.Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		d, err := data.Asset("web/dist/index.html")
		errors.Check(err)
		_, err = w.Write(d)
		errors.Check(err)
	})

}
