package model

import "time"

// Book is a comic chapter or volume in the database
type Book struct {
	ID               string     `json:"id"                db:"id"`
	CreatedAt        time.Time  `json:"created_at"        db:"created_at"`
	UpdatedAt        time.Time  `json:"updated_at"        db:"updated_at"`
	Series           string     `json:"series"            db:"series"`
	Summary          string     `json:"summary"           db:"summary"`
	StoryArc         string     `json:"story_arc"         db:"story_arc"`
	AuthorsJSON      string     `json:"-"                 db:"authors"`
	Authors          []string   `json:"authors"           db:"-"`
	Web              string     `json:"web"               db:"web"`
	GenresJSON       string     `json:"-"                 db:"genres"`
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
	PagesJSON        string     `json:"-"                 db:"pages"`
	NumberInSeries   int        `json:"number_in_series"  db:"number_in_series"`
}
