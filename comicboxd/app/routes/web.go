package routes

import (
	"io/ioutil"
	"net/http"
	"os"
	"path"

	"github.com/comicbox/comicbox/comicboxd/app/controller"
	"github.com/comicbox/comicbox/comicboxd/app/middleware"
	"github.com/comicbox/comicbox/comicboxd/app/schema"
	"github.com/comicbox/comicbox/comicboxd/data"
	"github.com/comicbox/comicbox/comicboxd/errors"
	"github.com/comicbox/comicbox/comicboxd/server"
	assetfs "github.com/elazarl/go-bindata-assetfs"
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

	s.Router.PathPrefix("/v2").Handler(http.StripPrefix("/v2", FileServer404(&assetfs.AssetFS{
		Asset:     data.Asset,
		AssetDir:  data.AssetDir,
		AssetInfo: data.AssetInfo,
		Prefix:    "web2/dist",
	}, "index.html"))).Methods("GET")

	s.Router.Methods("GET").Handler(http.FileServer(&assetfs.AssetFS{
		Asset:     data.Asset,
		AssetDir:  data.AssetDir,
		AssetInfo: data.AssetInfo,
		Prefix:    "web/dist",
	}))
}

func FileServer404(root http.FileSystem, fallbackPath string) http.Handler {
	var fallback []byte
	f, err := root.Open(fallbackPath)
	if err == nil {
		fallback, err = ioutil.ReadAll(f)
		if err != nil {
			fallback = nil
		}
	}

	fsh := http.FileServer(root)

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := root.Open(path.Clean(r.URL.Path))
		if os.IsNotExist(err) {
			w.Write(fallback)
			return
		}
		fsh.ServeHTTP(w, r)
	})
}
