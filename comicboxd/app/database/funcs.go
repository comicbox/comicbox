package database

import (
	"context"
	"database/sql"
	"database/sql/driver"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
)

var debug = false

func debugTime(sTime time.Time, query string) {
	fmt.Printf("query took %v: %s\n", time.Now().Sub(sTime), query)
}

// sqlx functions

func BeginTxx(ctx context.Context, opts *sql.TxOptions) (*sqlx.Tx, error) {
	return db.BeginTxx(ctx, opts)
}
func Beginx() (*sqlx.Tx, error) {
	return db.Beginx()
}
func BindNamed(query string, arg interface{}) (string, []interface{}, error) {
	return db.BindNamed(query, arg)
}
func DriverName() string {
	return db.DriverName()
}
func Get(dest interface{}, query string, args ...interface{}) error {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.Get(dest, query, args...)
}
func GetContext(ctx context.Context, dest interface{}, query string, args ...interface{}) error {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.GetContext(ctx, dest, query, args...)
}
func MapperFunc(mf func(string) string) {
	db.MapperFunc(mf)
}
func MustBegin() *sqlx.Tx {
	return db.MustBegin()
}
func MustBeginTx(ctx context.Context, opts *sql.TxOptions) *sqlx.Tx {
	return db.MustBeginTx(ctx, opts)
}
func MustExec(query string, args ...interface{}) sql.Result {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.MustExec(query, args...)
}
func MustExecContext(ctx context.Context, query string, args ...interface{}) sql.Result {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.MustExecContext(ctx, query, args...)
}
func NamedExec(query string, arg interface{}) (sql.Result, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.NamedExec(query, arg)
}
func NamedExecContext(ctx context.Context, query string, arg interface{}) (sql.Result, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.NamedExecContext(ctx, query, arg)
}
func NamedQuery(query string, arg interface{}) (*sqlx.Rows, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.NamedQuery(query, arg)
}
func NamedQueryContext(ctx context.Context, query string, arg interface{}) (*sqlx.Rows, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.NamedQueryContext(ctx, query, arg)
}
func PrepareNamed(query string) (*sqlx.NamedStmt, error) {
	return db.PrepareNamed(query)
}
func PrepareNamedContext(ctx context.Context, query string) (*sqlx.NamedStmt, error) {
	return db.PrepareNamedContext(ctx, query)
}
func Preparex(query string) (*sqlx.Stmt, error) {
	return db.Preparex(query)
}
func PreparexContext(ctx context.Context, query string) (*sqlx.Stmt, error) {
	return db.PreparexContext(ctx, query)
}
func QueryRowx(query string, args ...interface{}) *sqlx.Row {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.QueryRowx(query, args...)
}
func QueryRowxContext(ctx context.Context, query string, args ...interface{}) *sqlx.Row {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.QueryRowxContext(ctx, query, args...)
}
func Queryx(query string, args ...interface{}) (*sqlx.Rows, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.Queryx(query, args...)
}
func QueryxContext(ctx context.Context, query string, args ...interface{}) (*sqlx.Rows, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.QueryxContext(ctx, query, args...)
}
func Rebind(query string) string {
	return db.Rebind(query)
}
func Select(dest interface{}, query string, args ...interface{}) error {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.Select(dest, query, args...)
}
func SelectContext(ctx context.Context, dest interface{}, query string, args ...interface{}) error {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.SelectContext(ctx, dest, query, args...)
}
func Unsafe() *sqlx.DB {
	return db.Unsafe()
}

// sql functions

func Begin() (*sql.Tx, error) {
	return db.Begin()
}
func BeginTx(ctx context.Context, opts *sql.TxOptions) (*sql.Tx, error) {
	return db.BeginTx(ctx, opts)
}
func Close() error {
	return db.Close()
}
func Conn(ctx context.Context) (*sql.Conn, error) {
	return db.Conn(ctx)
}
func Driver() driver.Driver {
	return db.Driver()
}
func Exec(query string, args ...interface{}) (sql.Result, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.Exec(query, args...)
}
func ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.ExecContext(ctx, query, args...)
}
func Ping() error {
	return db.Ping()
}
func PingContext(ctx context.Context) error {
	return db.PingContext(ctx)
}
func Prepare(query string) (*sql.Stmt, error) {
	return db.Prepare(query)
}
func PrepareContext(ctx context.Context, query string) (*sql.Stmt, error) {
	return db.PrepareContext(ctx, query)
}
func Query(query string, args ...interface{}) (*sql.Rows, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.Query(query, args...)
}
func QueryContext(ctx context.Context, query string, args ...interface{}) (*sql.Rows, error) {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.QueryContext(ctx, query, args...)
}
func QueryRow(query string, args ...interface{}) *sql.Row {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.QueryRow(query, args...)
}
func QueryRowContext(ctx context.Context, query string, args ...interface{}) *sql.Row {
	if debug {
		defer debugTime(time.Now(), query)
	}
	return db.QueryRowContext(ctx, query, args...)
}
func SetConnMaxLifetime(d time.Duration) {
	db.SetConnMaxLifetime(d)
}
func SetMaxIdleConns(n int) {
	db.SetMaxIdleConns(n)
}
func SetMaxOpenConns(n int) {
	db.SetMaxOpenConns(n)
}
func Stats() sql.DBStats {
	return db.Stats()
}
