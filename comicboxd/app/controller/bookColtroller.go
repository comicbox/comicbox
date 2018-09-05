package controller

import (
	"database/sql"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
)

type book struct{}

var Book = book{}

func (b *book) Index(c Context) interface{} {
	books := model.BookUserBooks{}
	err := c.DB.Select(&books, `SELECT * FROM "book" left join user_book on book_id=id and user_id=?;`, c.User.ID)
	if err != nil {
		return err
	}

	err = books.Init()
	if err != nil {
		return err
	}

	return books
}

func (b *book) Show(c Context) interface{} {

	book := model.BookUserBook{}
	err := c.DB.Get(&book, `SELECT * FROM "book" left join user_book on book_id=id and user_id=? where id=? limit 1;`, c.User.ID, c.Var("id"))

	if err == sql.ErrNoRows {
		return errors.HTTP(404)
	} else if err != nil {
		return err
	}

	err = book.Init()
	if err != nil {
		return err
	}

	return book
}
