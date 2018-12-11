package schema

import (
	"database/sql"
	"encoding/json"

	"github.com/zwzn/comicbox/comicboxd/app/schema/scalar"

	"github.com/Masterminds/squirrel"
	"github.com/zwzn/comicbox/comicboxd/app/database"
	"github.com/zwzn/comicbox/comicboxd/app/model"
)

type serieArgs struct {
	Name string
}

func (q *query) Serie(args serieArgs) (*SeriesResolver, error) {
	serie := model.Series{}
	sqll, opts, err := squirrel.
		Select("*").
		From("series").
		Where(squirrel.Eq{"name": args.Name}).
		Where(squirrel.Eq{"user_id": q.user.ID}).
		ToSql()
	if err != nil {
		return nil, err
	}
	err = database.Get(&serie, sqll, opts...)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return &SeriesResolver{s: serie}, nil
}

type SeriesResolver struct {
	s model.Series
}

func (r SeriesResolver) Books(args booksArgs) (*BookQueryResolver, error) {
	name := scalar.Regex("^" + r.s.Name + "$")
	args.Series = &name
	return (&query{}).Books(args)
}

func (r SeriesResolver) List() *string {
	return r.s.List
}
func (r SeriesResolver) Name() string {
	return r.s.Name
}
func (r SeriesResolver) Read() int32 {
	return r.s.Read
}
func (r SeriesResolver) Tags() []string {
	data := r.s.TagsJSON
	tags := []string{}
	json.Unmarshal(data, &tags)
	return tags
}
func (r SeriesResolver) Total() int32 {
	return r.s.Total
}
