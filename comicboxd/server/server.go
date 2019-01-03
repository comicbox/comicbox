package server

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/spf13/viper"
	"github.com/zwzn/comicbox/comicboxd/app/database"
	"github.com/zwzn/comicbox/comicboxd/j"
	"github.com/zwzn/comicbox/comicboxd/server/tls"

	_ "github.com/golang-migrate/migrate/source/file"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

// Server is the http server for the service. It runs the web interface and the API
type Server struct {
	srv *http.Server

	Router *mux.Router
	// DB     *sqlx.DB
}

func New() *Server {

	s := &Server{}

	s.Router = mux.NewRouter()

	s.srv = &http.Server{
		Addr:    fmt.Sprintf(":%d", viper.GetInt("port")),
		Handler: s.Router,

		WriteTimeout: 30 * time.Second,
		ReadTimeout:  30 * time.Second,
	}

	if viper.GetBool("https") {
		if err := tls.ConfigureTLS(s.srv); err != nil {
			j.Errorf("Error configuring TLS: %s", err)
		}
	}

	return s
}

func (s *Server) Start() error {
	err := database.SetUp()
	if err != nil {
		return err
	}

	if viper.GetBool("https") {
		j.Infof("Starting server at https://localhost:%d", viper.GetInt("port"))
		return s.srv.ListenAndServeTLS(viper.GetString("tls-cert"), viper.GetString("tls-key"))
	}

	j.Infof("Starting server at http://localhost:%d", viper.GetInt("port"))
	return s.srv.ListenAndServe()
}

func (s *Server) Stop() error {
	err := database.TearDown()
	if err != nil {
		return err
	}

	return s.srv.Shutdown(context.Background())
}
