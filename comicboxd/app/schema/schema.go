package schema

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/zwzn/comicbox/comicboxd/app"
	"github.com/zwzn/comicbox/comicboxd/app/gql"

	"github.com/zwzn/comicbox/comicboxd/data"
	"github.com/zwzn/comicbox/comicboxd/errors"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

type ctxKey string

type DateTime time.Time

type query struct{}

var appCtx = ctxKey("appCtx")

func Handler() http.Handler {
	dir := "comicboxd/app/schema/gql"
	s := ""
	files, err := data.AssetDir(dir)
	errors.Check(err)
	for _, file := range files {
		s += string(data.MustAsset(filepath.Join(dir, file))) + "\n"
	}
	schema, err := graphql.ParseSchema(s, &query{})
	if err != nil {
		fmt.Printf("%v\n", err)
		os.Exit(1)
	}

	h := addUser(&relay.Handler{Schema: schema})
	gql.GQLHandler = h
	return h
}

func addUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c := app.Ctx(r)
		ctx := context.WithValue(r.Context(), appCtx, c)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (*query) Ctx(ctx context.Context) *app.Context {
	cI := ctx.Value(appCtx)
	c, ok := cI.(*app.Context)
	if !ok {
		return &app.Context{}
	}
	return c
}
