package schema

import (
	"context"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"

	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/j"
	"github.com/google/uuid"

	"github.com/Masterminds/squirrel"
	graphql "github.com/graph-gophers/graphql-go"
)

type BookInput struct {
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

type UserBookInput struct {
	LastPageRead *int32   `db:"last_page_read"`
	CurrentPage  *int32   `db:"current_page"`
	Rating       *float64 `db:"rating"`
}

type BookUserBookInput struct {
	BookInput
	UserBookInput
}

type pageInput struct {
	FileNumber int32  `json:"file_number"`
	Type       string `json:"type"`
}

type NewBookArgs struct {
	Data BookUserBookInput
}

func (q *RootQuery) NewBook(ctx context.Context, args NewBookArgs) (*BookResolver, error) {
	c := q.ctx(ctx)
	newID := graphql.ID(uuid.New().String())

	book, err := loadNewBookData(args.Data)
	if err != nil {
		return nil, fmt.Errorf("NewBook loadNewBookData: %v", err)
	}

	if book.Pages == nil || len(*book.Pages) == 0 {
		return nil, fmt.Errorf("the book must have pages")
	}

	if book.File == nil || *book.File == "" {
		return nil, fmt.Errorf("you must set a file")
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

		err = updateBook(tx, newID, book.BookInput)
		if err != nil {
			return err
		}

		err = updateUserBook(tx, newID, graphql.ID(c.User.ID.String()), book.UserBookInput)
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return q.Book(ctx, BookArgs{ID: graphql.ID(newID)})
}

type UpdateBookArgs struct {
	ID   graphql.ID
	Data BookUserBookInput
}

func (q *RootQuery) UpdateBook(ctx context.Context, args UpdateBookArgs) (*BookResolver, error) {
	c := q.ctx(ctx)
	if c.Guest() {
		return nil, ErrorUnauthenticated
	}

	lastCurrentPage := int32(0)

	err := database.Tx(ctx, func(tx *sqlx.Tx) error {
		dest := []int32{}
		err := tx.SelectContext(
			ctx,
			&dest,
			`select "current_page" from "book_user_book" where id=? and user_id=?`,
			args.ID,
			c.User.ID.String(),
		)
		if err == nil {
			lastCurrentPage = dest[0]
		}

		err = updateBook(tx, args.ID, args.Data.BookInput)
		if err != nil {
			return err
		}
		err = updateUserBook(tx, args.ID, graphql.ID(c.User.ID.String()), args.Data.UserBookInput)
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	book, err := q.Book(ctx, BookArgs{ID: args.ID})
	if err != nil {
		return nil, err
	}

	// Chapter finished
	if args.Data.CurrentPage != nil &&
		lastCurrentPage != *args.Data.CurrentPage &&
		*args.Data.CurrentPage >= (book.PageCount()-1) {

		err := q.updateAnilist(ctx, book)
		if err != nil {
			j.Error("failed to update anilist", err)
		}
	}
	return book, nil
}

type DeleteBookArgs struct {
	ID graphql.ID
}

func (q *RootQuery) DeleteBook(ctx context.Context, args DeleteBookArgs) (*BookResolver, error) {
	c := q.ctx(ctx)
	if c.Guest() {
		return nil, ErrorUnauthenticated
	}
	book, err := q.Book(ctx, BookArgs{ID: args.ID})
	if err != nil {
		return nil, err
	}
	if book == nil {
		return nil, fmt.Errorf("no book with id %s", args.ID)
	}

	err = database.Tx(ctx, func(tx *sqlx.Tx) error {
		_, err := squirrel.Update("book").
			Where("id = ?", book.ID()).
			Set("deleted_at", time.Now().Format(SQLTimeFormat)).
			RunWith(tx).
			ExecContext(ctx)
		if err != nil {
			return err
		}
		// _, err := squirrel.Delete("book").
		// 	Where("id = ?", book.ID()).
		// 	RunWith(tx).
		// 	ExecContext(ctx)
		// if err != nil {
		// 	return err
		// }
		// _, err = squirrel.Delete("user_book").
		// 	Where("book_id = ?", book.ID()).
		// 	Where("user_id = ?", c.User.ID).
		// 	RunWith(tx).
		// 	ExecContext(ctx)
		// if err != nil {
		// 	return err
		// }
		return nil
	})
	if err != nil {
		return nil, err
	}
	return book, nil
}
