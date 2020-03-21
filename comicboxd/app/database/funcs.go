package database

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
)

var debug = false

func init() {
	flag.BoolVar(&debug, "debug", false, "prints query timings")
}

func debugTime(sTime time.Time, query string) {
	fmt.Printf("query took %v: %s\n", time.Now().Sub(sTime), query)
}

func Tx(ctx context.Context, cb func(*sqlx.Tx) error) error {
	return nil
}

// sqlx functions

func BeginTxx(ctx context.Context, opts *sql.TxOptions) (*sqlx.Tx, error) {
	return nil, nil
}
func Beginx() (*sqlx.Tx, error) {
	return nil, nil
}
func BindNamed(query string, arg interface{}) (string, []interface{}, error) {
	return "", nil, nil
}
func DriverName() string {
	return ""
}
func Get(dest interface{}, query string, args ...interface{}) error {
	return nil
}
func GetContext(ctx context.Context, dest interface{}, query string, args ...interface{}) error {
	return nil
}
func MapperFunc(mf func(string) string) {
}
func MustBegin() *sqlx.Tx {
	return nil
}
func MustBeginTx(ctx context.Context, opts *sql.TxOptions) *sqlx.Tx {
	return nil
}
func MustExec(query string, args ...interface{}) sql.Result {
	return nil
}
func MustExecContext(ctx context.Context, query string, args ...interface{}) sql.Result {
	return nil
}
func NamedExec(query string, arg interface{}) (sql.Result, error) {
	return nil, nil
}
func NamedExecContext(ctx context.Context, query string, arg interface{}) (sql.Result, error) {
	return nil, nil
}
func NamedQuery(query string, arg interface{}) (*sqlx.Rows, error) {
	return nil, nil
}
func NamedQueryContext(ctx context.Context, query string, arg interface{}) (*sqlx.Rows, error) {
	return nil, nil
}
func PrepareNamed(query string) (*sqlx.NamedStmt, error) {
	return nil, nil
}
func PrepareNamedContext(ctx context.Context, query string) (*sqlx.NamedStmt, error) {
	return nil, nil
}
func Preparex(query string) (*sqlx.Stmt, error) {
	return nil, nil
}
func PreparexContext(ctx context.Context, query string) (*sqlx.Stmt, error) {
	return nil, nil
}
func QueryRowx(query string, args ...interface{}) *sqlx.Row {
	return nil
}
func QueryRowxContext(ctx context.Context, query string, args ...interface{}) *sqlx.Row {
	return nil
}
func Queryx(query string, args ...interface{}) (*sqlx.Rows, error) {
	return nil, nil
}
func QueryxContext(ctx context.Context, query string, args ...interface{}) (*sqlx.Rows, error) {
	return nil, nil
}
func Rebind(query string) string {
	return ""
}
func Select(dest interface{}, query string, args ...interface{}) error {
	return nil
}
func SelectContext(ctx context.Context, dest interface{}, query string, args ...interface{}) error {
	return nil
}
func Unsafe() *sqlx.DB {
	return nil
}
