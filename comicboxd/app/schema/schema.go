package schema

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/comicbox/comicbox/comicboxd/app"

	"github.com/comicbox/comicbox/comicboxd/data"
	"github.com/comicbox/comicbox/comicboxd/errors"

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

	return addUser(&relay.Handler{Schema: schema})
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
