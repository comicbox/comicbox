package schema

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zwzn/comicbox/comicboxd/app/database"

	graphql "github.com/graph-gophers/graphql-go"

	"github.com/google/uuid"

	"github.com/bradleyjkemp/cupaloy"
)

func TestNewBook(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	tests := map[string]struct {
		filePath string
		err      error
	}{
		"good":   {"../../../test_books/book1.cbz", nil},
		"good 2": {"../../../test_books/test_books V1 #2 a title.cbz", nil},
		"no file 1": {
			"",
			fmt.Errorf("NewBook loadNewBookData: you must have a file in new books"),
		},
		"no file 2": {
			"/not/a/file/path",
			fmt.Errorf("NewBook loadNewBookData: error opening zip: open /not/a/file/path: no such file or directory"),
		},
		"no file 3": {
			"../../../test_books/bad_book.cbz",
			fmt.Errorf("NewBook loadNewBookData: error opening zip: zip: not a valid zip file"),
		},
		"no file 4": {
			"../../../test_books/badbookjson.cbz",
			fmt.Errorf("NewBook loadNewBookData: parsing book.json: invalid character 'g' looking for beginning of value"),
		},
		"book.json 1":   {"../../../test_books/bookjson.cbz", nil},
		"book.json 2":   {"../../../test_books/bookjson2.cbz", nil},
		"ComicInfo.xml": {"../../../test_books/comicInfoXML.cbz", nil},
		"bad ComicInfo.xml": {
			"../../../test_books/badcomicInfoXML.cbz",
			fmt.Errorf("NewBook loadNewBookData: EOF"),
		},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			args := NewBookArgs{}
			if test.filePath != "" {
				args.Data.File = strptr(test.filePath)
			}

			r, err := userQuery().NewBook(args)

			if r != nil {
				// reset values that change per run
				r.b.ID = uuid.UUID{}
				r.b.BookID = &uuid.UUID{}
				r.b.UserID = &uuid.UUID{}
				r.b.CreatedAt = time.Time{}
				r.b.UpdatedAt = time.Time{}
			}

			cupaloy.SnapshotT(t, r, err)
		})
	}
}

func TestUpdateBook(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	insertTestBooks()

	tests := map[string]struct {
		id            string
		bookInput     *BookInput
		userBookInput *UserBookInput
		err           error
	}{
		"change page": {testBookIDs["empty"], nil, &UserBookInput{
			CurrentPage: intptr(4),
		}, nil},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			args := UpdateBookArgs{}

			if test.bookInput != nil {
				args.Data.BookInput = *test.bookInput
			}
			if test.userBookInput != nil {
				args.Data.UserBookInput = *test.userBookInput
			}
			args.ID = graphql.ID(test.id)

			r, err := userQuery().UpdateBook(args)

			if r != nil {
				// reset values that change per run
				r.b.ID = uuid.UUID{}
				r.b.BookID = &uuid.UUID{}
				r.b.UserID = &uuid.UUID{}
				r.b.CreatedAt = time.Time{}
				r.b.UpdatedAt = time.Time{}
			}

			cupaloy.SnapshotT(t, r, err)
		})
	}
}
func TestDeleteBook(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	insertTestBooks()

	tests := map[string]struct {
		id  string
		err error
	}{
		"good":    {testBookIDs["empty"], nil},
		"no book": {"not an id", fmt.Errorf("no book with id not an id")},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			args := DeleteBookArgs{}

			args.ID = graphql.ID(test.id)

			r, err := userQuery().DeleteBook(args)

			if test.err != nil {
				assert.EqualError(t, err, test.err.Error())
				return
			}
			assert.NoError(t, err)

			if r != nil {
				// reset values that change per run
				r.b.ID = uuid.UUID{}
				r.b.BookID = &uuid.UUID{}
				r.b.UserID = &uuid.UUID{}
				r.b.CreatedAt = time.Time{}
				r.b.UpdatedAt = time.Time{}
			}

			cupaloy.SnapshotT(t, r)

			count := 0
			err = database.Get(&count, "select count(*) from book where id=?", test.id)
			assert.NoError(t, err)
			assert.Equal(t, 0, count, "book with id %s was not deleted", test.id)
		})
	}
}
