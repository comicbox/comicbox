package schema

import (
	"net/http"
	"path/filepath"
	"time"

	"github.com/zwzn/comicbox/comicboxd/app/model"

	"github.com/zwzn/comicbox/comicboxd/data"
	"github.com/zwzn/comicbox/comicboxd/errors"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

type DateTime time.Time

type query struct {
	user model.User
}

func Handler() http.Handler {
	dir := "comicboxd/app/schema/gql"
	s := ""
	files, err := data.AssetDir(dir)
	errors.Check(err)
	for _, file := range files {
		s += string(data.MustAsset(filepath.Join(dir, file))) + "\n"
	}
	schema := graphql.MustParseSchema(s, &query{})

	return &relay.Handler{Schema: schema}
}
