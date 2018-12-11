package schema

import (
	"encoding/json"

	graphql "github.com/graph-gophers/graphql-go"

	"github.com/zwzn/comicbox/comicboxd/app/model"
)

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

func (r *BookResolver) Cover() {

}

func (r *BookResolver) CreatedAt() graphql.Time {
	return graphql.Time{Time: r.b.CreatedAt}
}

func (r *BookResolver) CurrentPage() *int32 {
	if r.b.CurrentPage == nil {
		return nil
	}
	cp := int32(*r.b.CurrentPage)
	return &cp

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
func (r *BookResolver) LastPageRead() {

}
func (r *BookResolver) Pages() {

}
func (r *BookResolver) Rating() {

}
func (r *BookResolver) Read() {

}
func (r *BookResolver) ReadingDirection() {

}
func (r *BookResolver) Series() {

}
func (r *BookResolver) SeriesQuery() {

}
func (r *BookResolver) StoryArc() {

}
func (r *BookResolver) Summary() {

}
func (r *BookResolver) Title() {

}
func (r *BookResolver) Type() {

}
func (r *BookResolver) UpdatedAt() {

}
func (r *BookResolver) Volume() {

}
func (r *BookResolver) Web() {

}
