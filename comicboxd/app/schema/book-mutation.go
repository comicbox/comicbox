package schema

import (
	"context"

	graphql "github.com/graph-gophers/graphql-go"

	"github.com/zwzn/comicbox/comicboxd/app/model"
)

type editBookArgs struct {
	ID   graphql.ID
	data bookInput
}

type bookInput struct {
}

func (q *query) NewBook(ctx context.Context, args editBookArgs) (*BookResolver, error) {
	// c := q.Ctx(ctx)

	return &BookResolver{b: model.BookUserBook{}}, nil
}
