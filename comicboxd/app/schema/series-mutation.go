package schema

import (
	"context"

	"github.com/Masterminds/squirrel"
	graphql "github.com/graph-gophers/graphql-go"

	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/jmoiron/sqlx"
)

type SeriesInput struct {
	List *string   `db:"list"`
	Tags *[]string `db:"tags"`
}

type UpdateSeriesArgs struct {
	Name string
	Data SeriesInput
}

func (q *query) UpdateSeries(ctx context.Context, args UpdateSeriesArgs) (*SeriesResolver, error) {
	c := q.Ctx(ctx)
	userID := graphql.ID(c.User.ID.String())
	m := toStruct(args.Data)
	if len(m) == 0 {
		return q.Serie(ctx, SerieArgs{Name: args.Name})
	}

	err := database.Tx(ctx, func(tx *sqlx.Tx) error {
		_, err := tx.Exec("INSERT OR IGNORE INTO user_series (series, user_id) VALUES (?, ?)", args.Name, userID)
		if err != nil {
			return err
		}
		query := squirrel.Update("user_series").
			Where("series = ?", args.Name).
			Where("user_id = ?", userID)

		query = update(m, query)

		_, err = query.RunWith(tx).Exec()
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return q.Serie(ctx, SerieArgs{Name: args.Name})
}

type UpdateSeriesBooksArgs struct {
	Name string
	Data BookUserBookInput
}

func (q *query) UpdateSeriesBooks(ctx context.Context, args UpdateSeriesBooksArgs) (*SeriesResolver, error) {
	c := q.Ctx(ctx)
	// userID := graphql.ID(c.User.ID.String())
	m := toStruct(args.Data.UserBookInput)
	bookM := toStruct(args.Data.BookInput)
	for k, v := range bookM {
		m[k] = v
	}

	if len(m) == 0 {
		return q.Serie(ctx, SerieArgs{Name: args.Name})
	}

	ids := []graphql.ID{}

	qSQL, qArgs := squirrel.Select("id").
		From("book_user_book").
		Where(squirrel.Eq{"user_id": c.User.ID}).
		Where(squirrel.Eq{"series": args.Name}).
		MustSql()

	err := database.SelectContext(ctx, &ids, qSQL, qArgs...)
	if err != nil {
		return nil, err
	}
	err = database.Tx(ctx, func(tx *sqlx.Tx) error {
		for _, id := range ids {
			err := updateBook(tx, id, args.Data.BookInput)
			if err != nil {
				return err
			}
			err = updateUserBook(tx, id, graphql.ID(c.User.ID.String()), args.Data.UserBookInput)
			if err != nil {
				return err
			}
		}
		return nil

	})
	if err != nil {
		return nil, err
	}
	return q.Serie(ctx, SerieArgs{Name: args.Name})
}
