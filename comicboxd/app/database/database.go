package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"regexp"

	"github.com/golang-migrate/migrate"
	"github.com/golang-migrate/migrate/database/sqlite3"
	bindata "github.com/golang-migrate/migrate/source/go_bindata"
	"github.com/jmoiron/sqlx"
	sqlite3Driver "github.com/mattn/go-sqlite3"
	"github.com/zwzn/comicbox/comicboxd/data"
	"github.com/zwzn/comicbox/comicboxd/j"
)

var db *sqlx.DB

func init() {
	var regex = func(re, s string) (bool, error) {
		return regexp.MatchString(re, s)
	}
	sql.Register("sqlite3_regex",
		&sqlite3Driver.SQLiteDriver{
			ConnectHook: func(conn *sqlite3Driver.SQLiteConn) error {
				return conn.RegisterFunc("regexp", regex, true)
			},
		})
	var err error
	db, err = sqlx.Connect("sqlite3_regex", "test.sqlite")
	if err != nil {
		j.Error(err)
		os.Exit(1)
	}

	m, err := getMigrate()
	if err != nil {
		log.Fatal(err)
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Fatal(err)
	}
}

func getMigrate() (*migrate.Migrate, error) {

	dir, err := data.AssetDir("comicboxd/migrations")
	if err != nil {
		return nil, fmt.Errorf("error finding migration folder: %v", err)
	}

	assetSource := bindata.Resource(dir,
		func(name string) ([]byte, error) {
			return data.Asset("comicboxd/migrations/" + name)
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
