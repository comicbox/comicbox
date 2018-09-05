package server

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/middleware"
	"bitbucket.org/zwzn/comicbox/comicboxd/data"
	"github.com/golang-migrate/migrate"
	"github.com/golang-migrate/migrate/database/sqlite3"
	_ "github.com/golang-migrate/migrate/source/file"
	bindata "github.com/golang-migrate/migrate/source/go_bindata"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

// Server is the http server for the service. It runs the web interface and the API
type Server struct {
	srv *http.Server

	Router *mux.Router
	DB     *sqlx.DB
}

func New() *Server {
	s := &Server{}

	s.Router = mux.NewRouter()

	middleware.Global(s.Router)

	s.srv = &http.Server{
		Addr:    ":8080",
		Handler: s.Router,

		WriteTimeout: 30 * time.Second,
		ReadTimeout:  30 * time.Second,
	}

	return s
}

func (s *Server) Start() error {
	var err error

	s.DB, err = sqlx.Connect("sqlite3", "test.sqlite")
	if err != nil {
		return err
	}

	m, err := s.Migrate()
	if err != nil {
		return err
	}

	err = m.Up()
	if err != nil && err.Error() != "no change" {
		return err
	}

	return s.srv.ListenAndServe()
}

func (s *Server) Stop() error {
	err := s.DB.Close()
	if err != nil {
		return err
	}
	return s.srv.Shutdown(context.TODO())
}

func (s *Server) Migrate() (*migrate.Migrate, error) {
	dir, err := data.AssetDir("migrations")
	if err != nil {
		return nil, fmt.Errorf("error finding migration folder: %v", err)
	}

	assetSource := bindata.Resource(dir,
		func(name string) ([]byte, error) {
			return data.Asset("migrations/" + name)
		},
	)
	assetDriver, err := bindata.WithInstance(assetSource)
	if err != nil {
		return nil, fmt.Errorf("source driver error: %v", err)
	}

	dbDriver, err := sqlite3.WithInstance(s.DB.DB, &sqlite3.Config{})
	if err != nil {
		return nil, fmt.Errorf("db driver error: %v", err)
	}

	m, err := migrate.NewWithInstance("go-bindata", assetDriver, "sqlite3", dbDriver)

	if err != nil {
		return nil, fmt.Errorf("migrate error: %v", err)
	}
	return m, nil

}
