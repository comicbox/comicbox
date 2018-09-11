package controller

import (
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

	book := model.FindBook(c.VarInt64("id"), c.User.ID)
	if book == nil {
		panic(errors.HTTP(404))
	}

	c.Response = book
}

func (b *book) Update(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(w, r)

	book := model.FindBook(c.VarInt64("id"), c.User.ID)
	if book == nil {
		panic(errors.HTTP(404))
	}

	err := c.DecodeBody(&book)
	if err != nil {
		panic(err)
	}

	book.UserID = &c.User.ID

	err = book.Save()
	if err != nil {
		panic(err)
	}

	c.Response = model.FindBook(c.VarInt64("id"), c.User.ID)
}
