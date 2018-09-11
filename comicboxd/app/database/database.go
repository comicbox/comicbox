package database

import (
	"fmt"
	"os"

	"bitbucket.org/zwzn/comicbox/comicboxd/data"
	"bitbucket.org/zwzn/comicbox/comicboxd/j"
	"github.com/golang-migrate/migrate"
	"github.com/golang-migrate/migrate/database/sqlite3"
	bindata "github.com/golang-migrate/migrate/source/go_bindata"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB

func init() {
	var err error
	DB, err = sqlx.Connect("sqlite3", "test.sqlite")
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

	dbDriver, err := sqlite3.WithInstance(DB.DB, &sqlite3.Config{})
	if err != nil {
		return nil, fmt.Errorf("db driver error: %v", err)
	}

	m, err := migrate.NewWithInstance("go-bindata", assetDriver, "sqlite3", dbDriver)

	if err != nil {
		return nil, fmt.Errorf("migrate error: %v", err)
	}
	return m, nil
}
