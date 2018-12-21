package schema

import (
	"context"
	"net/http"

	"github.com/zwzn/comicbox/comicboxd/app"
)

type pubQuery struct {
	q   query
	ctx context.Context
}

func Query(r *http.Request) *pubQuery {
	return &pubQuery{
		ctx: context.WithValue(r.Context(), appCtx, app.Ctx(r)),
	}
}
func QueryCtx(r *http.Request, ctx context.Context) *pubQuery {
	return &pubQuery{
		ctx: context.WithValue(ctx, appCtx, app.Ctx(r)),
	}
}

func (q *pubQuery) Books(args BooksArgs) (*BookQueryResolver, error) {
	return q.q.Books(q.ctx, args)
}

func (q *pubQuery) Book(args BookArgs) (*BookResolver, error) {
	return q.q.Book(q.ctx, args)
}

func (q *pubQuery) NewBook(args NewBookArgs) (*BookResolver, error) {
	return q.q.NewBook(q.ctx, args)
}

func (q *pubQuery) DeleteBook(args DeleteBookArgs) (*BookResolver, error) {
	return q.q.DeleteBook(q.ctx, args)
}

func (q *pubQuery) Serie(args SerieArgs) (*SeriesResolver, error) {
	return q.q.Serie(q.ctx, args)
}

func (q *pubQuery) Series(args SeriesArgs) (*SeriesQueryResolver, error) {
	return q.q.Series(q.ctx, args)
}

func (q *pubQuery) User(args UserArgs) (*UserResolver, error) {
	return q.q.User(q.ctx, args)
}

func (q *pubQuery) UpdateUser(args UpdateUserArgs) (*UserResolver, error) {
	return q.q.UpdateUser(q.ctx, args)
}
