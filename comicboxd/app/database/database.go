package database

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"regexp"

	"github.com/spf13/viper"

	"github.com/golang-migrate/migrate"
	"github.com/golang-migrate/migrate/database/sqlite3"
	bindata "github.com/golang-migrate/migrate/source/go_bindata"
	"github.com/jmoiron/sqlx"
	sqlite3Driver "github.com/mattn/go-sqlite3"
	"github.com/zwzn/comicbox/comicboxd/data"
)

var db *sqlx.DB

func init() {
	var regex = func(query, field string) (bool, error) {
		return regexp.MatchString(query, field)
	}
	sql.Register("sqlite3_regex", &sqlite3Driver.SQLiteDriver{
		ConnectHook: func(conn *sqlite3Driver.SQLiteConn) error {
			return conn.RegisterFunc("regexp", regex, true)
		},
	})

}

func SetUp() error {
	var err error

	os.MkdirAll(filepath.Dir(viper.GetString("db")), 0777)
	db, err = sqlx.Connect("sqlite3_regex", viper.GetString("db"))
	if err != nil {
		return err
	}

	m, err := getMigrate()
	if err != nil {
		return err
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		return err
	}
	return nil
}

func TearDown() error {
	db.Close()
	return nil
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
