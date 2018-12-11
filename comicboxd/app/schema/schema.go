package schema

import (
	"database/sql"
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/zwzn/comicbox/comicboxd/app/schema/scalar"

	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"

	"github.com/zwzn/comicbox/comicboxd/app/database"
	"github.com/zwzn/comicbox/comicboxd/app/model"

	"github.com/zwzn/comicbox/comicboxd/data"
	"github.com/zwzn/comicbox/comicboxd/errors"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

type DateTime time.Time

type query struct{}

type bookArgs struct {
	ID string
}

func (*query) Book(args bookArgs) (*BookResolver, error) {
	book := model.BookUserBook{}
	sqll, opts, err := squirrel.Select("*").
		From("book_user_book").
		Where(squirrel.Eq{"id": args.ID}).
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

	ID     *graphql.ID
	BookID *graphql.ID
	UserID *graphql.ID

	Read *bool

	File            *scalar.Regex
	Web             *scalar.Regex
	Pages           *scalar.Regex
	CreatedAt       *scalar.Regex
	Series          *scalar.Regex
	Title           *scalar.Regex
	LastPageRead    *scalar.Regex
	UpdatedAt       *scalar.Regex
	StoryArc        *scalar.Regex
	Genres          *scalar.Regex
	DateReleased    *scalar.Regex
	CurrentPage     *scalar.Regex
	Type            *scalar.Regex
	AlternateSeries *scalar.Regex
	Authors         *scalar.Regex
	Summary         *scalar.Regex

	PageCount       *scalar.NumberRange
	CommunityRating *scalar.NumberRange
	Chapter         *scalar.NumberRange
	Rating          *scalar.NumberRange
	Volume          *scalar.NumberRange
}

func (*query) Books(args booksArgs) (*BookQueryResolver, error) {
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
		Where(squirrel.Eq{"user_id": (uuid.UUID{}).String()})

	query = query.
		OrderBy("series").
		OrderBy("volume").
		OrderBy("chapter").
		OrderBy("title")

	if args.Series != nil {
		query = query.Where("series regexp ?", *args.Series)
	}

	return &BookQueryResolver{
		query: query,
		skip:  skip,
		take:  take,
	}, nil
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
