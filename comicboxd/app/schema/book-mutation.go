package schema

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

	"github.com/google/uuid"
	"github.com/zwzn/comicbox/comicboxd/app/database"

	"github.com/Masterminds/squirrel"
	graphql "github.com/graph-gophers/graphql-go"
)

type bookInput struct {
	Chapter          *float64      `db:"chapter"`
	Summary          *string       `db:"summary"`
	Series           *string       `db:"series"`
	DateReleased     *graphql.Time `db:"date_released"`
	AlternateSeries  *string       `db:"alternate_series"`
	ReadingDirection *string       `db:"reading_direction"`
	File             *string       `db:"file"`
	Authors          *[]string     `db:"authors"`
	StoryArc         *string       `db:"story_arc"`
	Volume           *int32        `db:"volume"`
	CommunityRating  *float64      `db:"community_rating"`
	Type             *string       `db:"type"`
	Web              *string       `db:"web"`
	Genres           *[]string     `db:"genres"`
	Title            *string       `db:"title"`
	Pages            *[]pageInput  `db:"pages"`
}

type userBookInput struct {
	LastPageRead *int32   `db:"last_page_read"`
	CurrentPage  *int32   `db:"current_page"`
	Rating       *float64 `db:"rating"`
}

type bookUserBookInput struct {
	bookInput
	userBookInput
}

type pageInput struct {
	FileNumber int32  `json:"file_number"`
	Type       string `json:"type"`
}

type newBookArgs struct {
	Data bookUserBookInput
}

func (q *query) NewBook(ctx context.Context, args newBookArgs) (*BookResolver, error) {
	c := q.Ctx(ctx)
	newID := graphql.ID(uuid.New().String())

	book, err := loadNewBookData(args.Data)
	if err != nil {
		return nil, fmt.Errorf("NewBook loadNewBookData: %v", err)
	}

	if book.Pages == nil || len(*book.Pages) == 0 {
		return nil, fmt.Errorf("the book must have pages")
	}

	err = database.Tx(ctx, func(tx *sqlx.Tx) error {
		_, err := squirrel.
			Insert("book").
			Columns("id", "file", "pages", "page_count").
			Values(newID, book.File, "{}", 0).
			RunWith(tx).Exec()
		if err != nil {
			return err
		}

		err = updateBook(tx, newID, book.bookInput)
		if err != nil {
			return err
		}

		err = updateUserBook(tx, newID, graphql.ID(c.User.ID.String()), book.userBookInput)
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	r, err := q.Book(ctx, bookArgs{ID: graphql.ID(newID)})
	fmt.Printf("%#v\n", r == nil)
	if err != nil {
		return nil, err
	}
	if r == nil {
		return nil, fmt.Errorf("error creating book")
	}
	return r, nil
}

type updateBookArgs struct {
	ID   graphql.ID
	Data bookUserBookInput
}

func (q *query) UpdateBook(ctx context.Context, args updateBookArgs) (*BookResolver, error) {
	c := q.Ctx(ctx)
	err := database.Tx(ctx, func(tx *sqlx.Tx) error {
		err := updateBook(tx, args.ID, args.Data.bookInput)
		if err != nil {
			return err
		}
		err = updateUserBook(tx, args.ID, graphql.ID(c.User.ID.String()), args.Data.userBookInput)
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return q.Book(ctx, bookArgs{ID: args.ID})
}

type deleteBookArgs struct {
	ID graphql.ID
}

func (q *query) DeleteBook(ctx context.Context, args deleteBookArgs) (*BookResolver, error) {
	c := q.Ctx(ctx)
	book, err := q.Book(ctx, bookArgs{ID: args.ID})
	if err != nil {
		return nil, err
	}

	err = database.Tx(ctx, func(tx *sqlx.Tx) error {
		_, err := squirrel.Delete("book").
			Where("id = ?", book.ID()).
			RunWith(tx).Exec()
		if err != nil {
			return err
		}
		_, err = squirrel.Delete("user_book").
			Where("book_id = ?", book.ID()).
			Where("user_id = ?", c.User.ID).
			RunWith(tx).Exec()
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return book, nil
}
