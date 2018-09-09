package middleware

import (
	"fmt"
	"net/http"
	"os"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/data"
	"bitbucket.org/zwzn/comicbox/comicboxd/j"
	"github.com/golang-migrate/migrate"
	"github.com/golang-migrate/migrate/database/sqlite3"
	bindata "github.com/golang-migrate/migrate/source/go_bindata"
	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func init() {
	var err error
	db, err = sqlx.Connect("sqlite3", "test.sqlite")
	if err != nil {
		j.Error(err)
		os.Exit(1)
	}

	m, err := getMigrate()
	if err != nil {
		j.Error(err)
		os.Exit(1)
	}

	m.Up()
	if err != nil && err.Error() != "no change" {
		j.Error(err)
		os.Exit(1)
	}
}

func Database(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(w, r)

		ctx.DB = db

		next.ServeHTTP(w, r)
	})
}

func getMigrate() (*migrate.Migrate, error) {

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

	dbDriver, err := sqlite3.WithInstance(db.DB, &sqlite3.Config{})
	if err != nil {
		return nil, fmt.Errorf("db driver error: %v", err)
	}

	m, err := migrate.NewWithInstance("go-bindata", assetDriver, "sqlite3", dbDriver)

	if err != nil {
		return nil, fmt.Errorf("migrate error: %v", err)
	}
	return m, nil
}
