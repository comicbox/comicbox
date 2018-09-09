package controller

import (
	"database/sql"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
)

type book struct{}

var Book = book{}

func (b *book) Index(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(w, r)

	books := model.BookUserBooks{}
	err := c.DB.Select(&books, `SELECT * FROM "book" left join user_book on book_id=id and user_id=?;`, c.User.ID)
	if err != nil {
		c.Response = err
		return
	}

	err = books.Init()
	if err != nil {
		c.Response = err
		return
	}

	c.Response = books
}

func (b *book) Show(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(w, r)

	book := model.BookUserBook{}
	err := c.DB.Get(&book, `SELECT * FROM "book" left join user_book on book_id=id and user_id=? where id=? limit 1;`, c.User.ID, c.Var("id"))

	if err == sql.ErrNoRows {
		c.Response = errors.HTTP(404)
		return
	} else if err != nil {
		c.Response = err
		return
	}

	err = book.Init()
	if err != nil {
		c.Response = err
		return
	}

	c.Response = book
}
