package schema

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"regexp"

	"github.com/comicbox/comicbox/comicboxd/app/schema/scalar"
	"github.com/comicbox/comicbox/comicboxd/j"

	"github.com/Masterminds/squirrel"
	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/app/model"
)

type SerieArgs struct {
	Name string
}

func (q *RootQuery) Serie(ctx context.Context, args SerieArgs) (*SeriesResolver, error) {
	c := q.ctx(ctx)
	serie := model.Series{}
	sqll, opts, err := squirrel.
		Select("*").
		From("series").
		Where(squirrel.Eq{"name": args.Name}).
		Where(squirrel.Eq{"user_id": c.User.ID}).
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

type SeriesArgs struct {
	Skip *int32
	Take int32

	Search *string

	Sort *string

	List *string `db:"list"`

	Name  *scalar.Regex       `db:"name"`
	Tags  *scalar.Regex       `db:"tags"`
	Total *scalar.NumberRange `db:"total"`
	Read  *scalar.NumberRange `db:"read"`

	ChangeAfter *int32 `db:"-"`
}

func (q *RootQuery) Series(ctx context.Context, args SeriesArgs) (*SeriesQueryResolver, error) {
	c := q.ctx(ctx)
	skip := int32(0)
	if args.Skip != nil {
		skip = *args.Skip
	}
	take := args.Take
	if 0 > take || take > 1000 {
		return nil, fmt.Errorf("you must take between 0 and 1000 items")
	}

	query := squirrel.Select().
		From("series").
		Where(squirrel.Eq{"user_id": c.User.ID})

	query = scalar.Query(query, args)

	return &SeriesQueryResolver{
		query: query,
		skip:  skip,
		take:  take,
	}, nil
}

type SeriesResolver struct {
	s model.Series
}

func (r SeriesResolver) Books(ctx context.Context, args BooksArgs) (*BookQueryResolver, error) {
	name := "^" + regexp.QuoteMeta(r.s.Name) + "$"
	args.Series = (*scalar.Regex)(&name)
	return (&RootQuery{}).Books(ctx, args)
}

func (r SeriesResolver) List() string {
	if r.s.List == nil {
		return "NONE"
	}
	return *r.s.List
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
	if len(data) == 0 {
		return []string{}
	}
	err := json.Unmarshal(data, &tags)
	if err != nil {
		j.Warningf("error loading series tags: %v", err)
		return []string{}
	}
	return tags
}
func (r SeriesResolver) Change() int32 {
	return int32(r.s.Change)
}

func (r SeriesResolver) Total() int32 {
	return r.s.Total
}

type SeriesQueryResolver struct {
	query squirrel.SelectBuilder
	skip  int32
	take  int32
}

func (r SeriesQueryResolver) Total() (int32, error) {
	qSQL, qArgs := r.query.Columns("count(*)").MustSql()

	var count int32
	err := database.Get(&count, qSQL, qArgs...)
	if err != nil {
		return 0, err
	}

	return count, nil
}
func (r SeriesQueryResolver) Results() ([]*SeriesResolver, error) {
	series := []*model.Series{}
	sqll, args, err := r.query.Columns("*").
		Offset(uint64(r.skip)).
		Limit(uint64(r.take)).
		ToSql()
	if err != nil {
		return nil, err
	}

	err = database.Select(&series, sqll, args...)
	if err == sql.ErrNoRows {
		return []*SeriesResolver{}, nil
	} else if err != nil {
		return nil, err
	}
	newBooks := []*SeriesResolver{}
	for _, serie := range series {
		newBooks = append(newBooks, &SeriesResolver{s: *serie})
	}
	return newBooks, nil
}
