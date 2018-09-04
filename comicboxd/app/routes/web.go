package routes

import (
	"fmt"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/data"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
	assetfs "github.com/elazarl/go-bindata-assetfs"
)

func Web(s *server.Server) {

	s.Router.PathPrefix("/web/").Handler(http.StripPrefix("/web/", http.FileServer(&assetfs.AssetFS{
		Asset:     data.Asset,
		AssetDir:  data.AssetDir,
		AssetInfo: data.AssetInfo,
		Prefix:    "web/dist",
	})))

	s.Router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello World!")
	})
}
