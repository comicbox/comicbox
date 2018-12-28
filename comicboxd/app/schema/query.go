package schema

import (
	"context"
	"net/http"

	"github.com/zwzn/comicbox/comicboxd/app"
)

type PublicQuery struct {
	q   query
	ctx context.Context
}

func Query(r *http.Request) *PublicQuery {
	return &PublicQuery{
		ctx: context.WithValue(r.Context(), appCtx, app.Ctx(r)),
	}
}
func QueryCtx(r *http.Request, ctx context.Context) *PublicQuery {
	return &PublicQuery{
		ctx: context.WithValue(ctx, appCtx, app.Ctx(r)),
	}
}

func (q *PublicQuery) Books(args BooksArgs) (*BookQueryResolver, error) {
	return q.q.Books(q.ctx, args)
}

func (q *PublicQuery) Book(args BookArgs) (*BookResolver, error) {
	return q.q.Book(q.ctx, args)
}

func (q *PublicQuery) NewBook(args NewBookArgs) (*BookResolver, error) {
	return q.q.NewBook(q.ctx, args)
}

func (q *PublicQuery) DeleteBook(args DeleteBookArgs) (*BookResolver, error) {
	return q.q.DeleteBook(q.ctx, args)
}

func (q *PublicQuery) UpdateBook(args UpdateBookArgs) (*BookResolver, error) {
	return q.q.UpdateBook(q.ctx, args)
}

func (q *PublicQuery) Serie(args SerieArgs) (*SeriesResolver, error) {
	return q.q.Serie(q.ctx, args)
}

func (q *PublicQuery) Series(args SeriesArgs) (*SeriesQueryResolver, error) {
	return q.q.Series(q.ctx, args)
}

func (q *PublicQuery) Me() (*UserResolver, error) {
	return q.q.Me(q.ctx)
}

func (q *PublicQuery) User(args UserArgs) (*UserResolver, error) {
	return q.q.User(q.ctx, args)
}

func (q *PublicQuery) UpdateUser(args UpdateUserArgs) (*UserResolver, error) {
	return q.q.UpdateUser(q.ctx, args)
}

func (q *PublicQuery) NewUser(args NewUserArgs) (*UserResolver, error) {
	return q.q.NewUser(q.ctx, args)
}
