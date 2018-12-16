package schema

import (
	"context"

	"github.com/Masterminds/squirrel"
	graphql "github.com/graph-gophers/graphql-go"

	"github.com/jmoiron/sqlx"
	"github.com/zwzn/comicbox/comicboxd/app/database"
)

type seriesInput struct {
	List *string   `db:"list"`
	Tags *[]string `db:"tags"`
}

type updateSeriesArgs struct {
	Name   string
	Series seriesInput
}

func (q *query) UpdateSeries(ctx context.Context, args updateSeriesArgs) (*SeriesResolver, error) {
	c := q.Ctx(ctx)
	userID := graphql.ID(c.User.ID.String())
	m := toStruct(args.Series)
	if len(m) == 0 {
		return q.Serie(ctx, serieArgs{Name: args.Name})
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
	return q.Serie(ctx, serieArgs{Name: args.Name})
}
