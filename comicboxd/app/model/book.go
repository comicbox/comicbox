package model

import (
	"database/sql"
	"encoding/json"
	"strings"
	"time"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/database"
)

// Book is a comic chapter or volume in the database
type Book struct {
	Model
	Series           string     `json:"series"            db:"series"`
	Summary          string     `json:"summary"           db:"summary"`
	StoryArc         string     `json:"story_arc"         db:"story_arc"`
	AuthorsJSON      []byte     `json:"-"                 db:"authors"`
	Authors          []string   `json:"authors"           db:"-"`
	Web              string     `json:"web"               db:"web"`
	GenresJSON       []byte     `json:"-"                 db:"genres"`
	Genres           []string   `json:"genres"            db:"-"`
	AlternateSeries  string     `json:"alternate_series"  db:"alternate_series"`
	ReadingDirection string     `json:"reading_direction" db:"reading_direction"`
	MediaType        string     `json:"type"              db:"type"`
	File             string     `json:"file"              db:"file"`
	Title            string     `json:"title"             db:"title"`
	Volume           *int       `json:"volume"            db:"volume"`
	CommunityRating  *float64   `json:"community_rating"  db:"community_rating"`
	Chapter          *float64   `json:"chapter"           db:"chapter"`
	DateReleased     *time.Time `json:"date_released"     db:"date_released"`
	PagesJSON        []byte     `json:"-"                 db:"pages"`
}

type UserBook struct {
	UserID       *int64   `json:"-"              db:"user_id"`
	BookID       *int64   `json:"-"              db:"book_id"`
	CurrentPage  *int64   `json:"current_page"   db:"current_page"`
	LastPageRead *int64   `json:"last_page_read" db:"last_page_read"`
	Rating       *float64 `json:"rating"         db:"rating"`
}

type BookUserBook struct {
	Book
	UserBook
}

func FindBook(bookID, userID int64) *BookUserBook {
	book := &BookUserBook{}
	err := database.DB.Get(book, `SELECT * FROM "book" left join user_book on book_id=id and user_id=? where id=? limit 1;`, userID, bookID)

	if err == sql.ErrNoRows {
		return nil
	} else if err != nil {
		panic(err)
	}

	err = book.Init()
	if err != nil {
		panic(err)
	}

	return book
}

func (b *Book) Init() error {
	if len(b.AuthorsJSON) > 0 {
		err := json.Unmarshal(b.AuthorsJSON, &b.Authors)
		if err != nil {
			return err
		}
	}

	if len(b.GenresJSON) > 0 {
		err := json.Unmarshal(b.GenresJSON, &b.Genres)
		if err != nil {
			return err
		}
	}

	return nil
}

func (b *BookUserBook) Save() error {
	var err error

	b.AuthorsJSON, err = json.Marshal(b.Authors)
	if err != nil {
		return err
	}
	b.GenresJSON, err = json.Marshal(b.Genres)
	if err != nil {
		return err
	}

	if b.ID == 0 {
		_, err = database.DB.NamedExec(InsertSQL("book", Book{}), b.Book)
	} else {
		_, err = database.DB.NamedExec(UpdateSQL("book", Book{}), b.Book)
	}
	if err != nil {
		return err
	}

	b.BookID = &b.ID
	query := InsertSQL("user_book", UserBook{})
	query = strings.Replace(query, "insert", "replace", 1)

	_, err = database.DB.NamedExec(query, b.UserBook)
	return err
}

type Books []*Book

func (books Books) Init() error {
	for _, b := range books {
		err := b.Init()
		if err != nil {
			return err
		}
	}
	return nil
}

type BookUserBooks []*BookUserBook

func (bubs BookUserBooks) Init() error {
	for _, b := range bubs {
		err := b.Init()
		if err != nil {
			return err
		}
	}
	return nil
}
