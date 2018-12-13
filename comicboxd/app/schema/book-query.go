package schema

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/Masterminds/squirrel"

	graphql "github.com/graph-gophers/graphql-go"

	"github.com/zwzn/comicbox/comicboxd/app/database"
	"github.com/zwzn/comicbox/comicboxd/app/model"
	"github.com/zwzn/comicbox/comicboxd/app/schema/scalar"
)

type bookArgs struct {
	ID graphql.ID
}

func (q *query) Book(ctx context.Context, args bookArgs) (*BookResolver, error) {
	c := q.Ctx(ctx)
	book := model.BookUserBook{}
	sqll, opts, err := squirrel.Select("*").
		From("book_user_book").
		Where(squirrel.Eq{"id": args.ID}).
		Where(squirrel.Eq{"user_id": c.User.ID}).
		ToSql()
	if err != nil {
		return nil, err
	}
	err = database.Get(&book, sqll, opts...)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return &BookResolver{b: book}, nil
}

type booksArgs struct {
	Skip *int32
	Take int32

	Search *string
	Sort   *string

	ID   *graphql.ID `db:"id"`
	Read *bool       `db:"read"`

	// CreatedAt       *scalar.TimeRange
	// UpdatedAt       *scalar.TimeRange
	// DateReleased    *scalar.TimeRange
	File            *scalar.Regex `db:"file"`
	Web             *scalar.Regex `db:"web"`
	Series          *scalar.Regex `db:"series"`
	Title           *scalar.Regex `db:"title"`
	StoryArc        *scalar.Regex `db:"story_arc"`
	Genres          *scalar.Regex `db:"genres"`
	CurrentPage     *scalar.Regex `db:"current_page"`
	Type            *scalar.Regex `db:"type"`
	AlternateSeries *scalar.Regex `db:"alternate_series"`
	Authors         *scalar.Regex `db:"authors"`
	Summary         *scalar.Regex `db:"summary"`

	LastPageRead    *scalar.NumberRange `db:"last_page_read"`
	PageCount       *scalar.NumberRange `db:"page_Count"`
	CommunityRating *scalar.NumberRange `db:"community_rating"`
	Chapter         *scalar.NumberRange `db:"chapter"`
	Rating          *scalar.NumberRange `db:"rating"`
	Volume          *scalar.NumberRange `db:"volume"`
}

func (q *query) Books(ctx context.Context, args booksArgs) (*BookQueryResolver, error) {
	c := q.Ctx(ctx)
	skip := int32(0)
	if args.Skip != nil {
		skip = *args.Skip
	}
	take := args.Take
	if 0 > take || take > 100 {
		return nil, fmt.Errorf("you must take between 0 and 100 items")
	}

	query := squirrel.Select().
		From("book_user_book").
		Where(squirrel.Eq{"user_id": c.User.ID})

	query = query.
		OrderBy("series").
		OrderBy("volume").
		OrderBy("chapter").
		OrderBy("title")

	query = scalar.Query(query, args)

	return &BookQueryResolver{
		query: query,
		skip:  skip,
		take:  take,
	}, nil
}

type BookResolver struct {
	b model.BookUserBook
}

func (r *BookResolver) AlternateSeries() string {
	return r.b.AlternateSeries
}
func (r *BookResolver) Authors() []string {
	data := r.b.AuthorsJSON
	authors := []string{}
	json.Unmarshal(data, &authors)
	return authors
}

func (r *BookResolver) Chapter() *float64 {
	return r.b.Chapter
}

func (r *BookResolver) CommunityRating() *float64 {
	return r.b.CommunityRating
}

func (r *BookResolver) Cover() *PageResolver {
	pages := r.Pages()
	if len(pages) == 0 {
		return nil
	}
	return &pages[0]
}

func (r *BookResolver) CreatedAt() graphql.Time {
	return graphql.Time{Time: r.b.CreatedAt}
}

func (r *BookResolver) CurrentPage() *int32 {
	return r.b.CurrentPage

}

func (r *BookResolver) DateReleased() *graphql.Time {
	date := r.b.DateReleased
	if date == nil {
		return nil
	}
	return &graphql.Time{Time: *date}
}
func (r *BookResolver) File() string {
	return r.b.File
}

func (r *BookResolver) Genres() []string {
	data := r.b.GenresJSON
	authors := []string{}
	json.Unmarshal(data, &authors)
	return authors
}

func (r *BookResolver) ID() graphql.ID {
	return graphql.ID(r.b.ID.String())
}
func (r *BookResolver) LastPageRead() *int32 {
	return r.b.LastPageRead

}
func (r *BookResolver) Pages() []PageResolver {
	r.b.UnmarshalPages(fmt.Sprintf)
	pages := []PageResolver{}
	for _, page := range r.b.Pages {
		pages = append(pages, PageResolver{p: page})
	}
	return pages
}

func (r *BookResolver) Rating() *float64 {
	return r.b.Rating
}
func (r *BookResolver) Read() bool {
	return r.b.Read
}
func (r *BookResolver) Series() string {
	return r.b.Series
}
func (r *BookResolver) StoryArc() string {
	return r.b.StoryArc
}
func (r *BookResolver) Summary() string {
	return r.b.Summary
}
func (r *BookResolver) Title() string {
	return r.b.Title
}
func (r *BookResolver) UpdatedAt() graphql.Time {
	return graphql.Time{Time: r.b.UpdatedAt}

}
func (r *BookResolver) Volume() *int32 {
	return r.b.Volume
}
func (r *BookResolver) Web() string {
	return r.b.Web
}

type PageResolver struct {
	p *model.Page
}

func (r PageResolver) FileNumber() int32 {
	return r.p.FileNumber
}
func (r PageResolver) Type() string {
	return r.p.Type
}
func (r PageResolver) URL() string {
	return r.p.URL
}

type BookQueryResolver struct {
	query squirrel.SelectBuilder
	skip  int32
	take  int32
}

func (r BookQueryResolver) Total() (int32, error) {
	sqll, args, err := r.query.Columns("count(*)").ToSql()
	if err != nil {
		return 0, err
	}

	var count int32
	err = database.Get(&count, sqll, args...)
	if err == sql.ErrNoRows {
		return 0, nil
	} else if err != nil {
		return 0, err
	}

	return count, nil
}
func (r BookQueryResolver) Results() ([]*BookResolver, error) {
	books := []*model.BookUserBook{}
	sqll, args, err := r.query.Columns("*").
		Offset(uint64(r.skip)).
		Limit(uint64(r.take)).
		ToSql()
	if err != nil {
		return nil, err
	}

	err = database.Select(&books, sqll, args...)
	if err == sql.ErrNoRows {
		return []*BookResolver{}, nil
	} else if err != nil {
		return nil, err
	}
	newBooks := []*BookResolver{}
	for _, book := range books {
		newBooks = append(newBooks, &BookResolver{b: *book})
	}
	return newBooks, nil
}