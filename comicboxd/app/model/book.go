package model

import (
	"time"

	"github.com/google/uuid"
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
	PageCount        int        `json:"page_count"        db:"page_count"`
}

type UserBook struct {
	UserID       *uuid.UUID `json:"-"              db:"user_id"`
	BookID       *uuid.UUID `json:"-"              db:"book_id"`
	CurrentPage  *int64     `json:"current_page"   db:"current_page"`
	LastPageRead *int64     `json:"last_page_read" db:"last_page_read"`
	Rating       *float64   `json:"rating"         db:"rating"`
}

type BookUserBook struct {
	Book
	UserBook
	Read bool `json:"read" db:"read"`
}

type Page struct {
	FileNumber int    `json:"file_number"`
	Type       string `json:"type"`
	URL        string `json:"url"`
}
