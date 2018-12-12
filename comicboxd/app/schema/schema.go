package schema

import (
	"context"
	"net/http"
	"path/filepath"
	"time"

	"github.com/zwzn/comicbox/comicboxd/app"

	"github.com/zwzn/comicbox/comicboxd/data"
	"github.com/zwzn/comicbox/comicboxd/errors"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

type DateTime time.Time

type query struct{}

func Handler() http.Handler {
	dir := "comicboxd/app/schema/gql"
	s := ""
	files, err := data.AssetDir(dir)
	errors.Check(err)
	for _, file := range files {
		s += string(data.MustAsset(filepath.Join(dir, file))) + "\n"
	}
	schema := graphql.MustParseSchema(s, &query{})

	return addUser(&relay.Handler{Schema: schema})
}

func addUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c := app.Ctx(r)
		ctx := context.WithValue(r.Context(), "appctx", c)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (*query) Ctx(ctx context.Context) *app.Context {
	cI := ctx.Value("appctx")
	c, ok := cI.(*app.Context)
	if !ok {
		return &app.Context{}
	}
	return c
}
