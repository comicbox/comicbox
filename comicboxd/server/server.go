package server

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"github.com/spf13/viper"
	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/j"
	"github.com/comicbox/comicbox/comicboxd/server/tls"

	_ "github.com/golang-migrate/migrate/source/file"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

// Server is the http server for the service. It runs the web interface and the API
type Server struct {
	http  *http.Server
	https *http.Server

	Router *mux.Router
	// DB     *sqlx.DB
}

func httpsRedirect(w http.ResponseWriter, req *http.Request) {
	// remove/add not default ports from req.Host
	host, _, err := net.SplitHostPort(req.Host)
	if err != nil {
		j.Errorf("error issuing redirect: %v", err)
	}
	port := strconv.Itoa(viper.GetInt("https-port"))
	host = net.JoinHostPort(host, port)

	target := url.URL{Scheme: "https", Host: host, Path: req.URL.Path, RawQuery: req.URL.RawQuery}

	j.Infof("redirect to: %s", target.String())

	http.Redirect(w, req, target.String(), http.StatusTemporaryRedirect)
}

func New() (*Server, error) {

	s := &Server{}

	s.Router = mux.NewRouter()

	s.http = &http.Server{
		Addr:    fmt.Sprintf(":%d", viper.GetInt("http-port")),
		Handler: s.Router,

		WriteTimeout: 30 * time.Second,
		ReadTimeout:  30 * time.Second,
	}

	if viper.GetBool("https") {
		s.http.Handler = http.HandlerFunc(httpsRedirect)
		s.https = &http.Server{
			Addr:    fmt.Sprintf(":%d", viper.GetInt("https-port")),
			Handler: s.Router,

			WriteTimeout: 30 * time.Second,
			ReadTimeout:  30 * time.Second,
		}
		if err := tls.ConfigureTLS(s.https); err != nil {
			j.Errorf("Error configuring TLS: %s", err)
			return s, err
		}
	}

	return s, nil
}

func (s *Server) Start() error {
	err := database.SetUp()
	if err != nil {
		return err
	}

	if viper.GetBool("https") {
		j.Infof("Starting server at https://localhost:%d", viper.GetInt("https-port"))
		j.Infof("Starting server at http://localhost:%d", viper.GetInt("http-port"))

		httpErrc, httpsErrc := make(chan error), make(chan error)

		// Listen for HTTP requests
		go func() {
			httpErrc <- s.http.ListenAndServe()
		}()

		// Listen for HTTPS requests
		go func() {
			httpsErrc <- s.https.ListenAndServeTLS(viper.GetString("tls-cert"), viper.GetString("tls-key"))
		}()

		var httpErr, httpsErr error
		select {
		case httpErr = <-httpErrc:
			// HTTP server crashed, clean up the HTTPS server
			httpsErr = s.https.Shutdown(nil)
		case httpsErr = <-httpsErrc:
			// HTTPS server crashed, clean up the HTTP server
			httpErr = s.http.Shutdown(nil)
		}

		if httpErr != nil || httpsErr != nil {
			// Combine errors if any
			return fmt.Errorf("http: (%v); https: (%v)", httpErr, httpsErr)
		}
		return nil
	}

	j.Infof("Starting server at http://localhost:%d", viper.GetInt("http-port"))
	return s.http.ListenAndServe()
}

func (s *Server) Stop() error {
	err := database.TearDown()
	if err != nil {
		return err
	}

	ctx := context.Background()
	var httpsErr, httpErr error
	if viper.GetBool("https") {
		httpsErr = s.https.Shutdown(ctx)
	}
	httpErr = s.http.Shutdown(ctx)
	if httpErr != nil || httpsErr != nil {
		// Combine errors if any
		return fmt.Errorf("error shutting down http server (%v); error shutting down https server (%v)", httpErr, httpsErr)
	}
	return nil
}
