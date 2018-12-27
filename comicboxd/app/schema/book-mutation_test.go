package schema

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewBook(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	type testBook struct {
		series    string
		title     string
		pageCount int
		chapter   float64
		volume    int32
	}

	tests := []struct {
		name         string
		filePath     string
		expectedBook *testBook
		err          error
	}{
		{"good", "../../../test_books/book1.cbz", &testBook{
			series:    "test_books",
			title:     "book1",
			pageCount: 5,
		}, nil},
		{
			"no file", "", nil,
			fmt.Errorf("NewBook loadNewBookData: you must have a file in new books"),
		},
		{
			"no file", "/not/a/file/path", nil,
			fmt.Errorf("NewBook loadNewBookData: error opening zip: open /not/a/file/path: no such file or directory"),
		},
		{
			"no file", "../../../test_books/bad_book.cbz", nil,
			fmt.Errorf("NewBook loadNewBookData: error opening zip: zip: not a valid zip file"),
		},
		{"good 2", "../../../test_books/test_books V1 #2 a title.cbz", &testBook{
			series:    "test_books",
			title:     "a title",
			pageCount: 5,
			volume:    1,
			chapter:   2,
		}, nil},
		{"book.json", "../../../test_books/bookjson.cbz", &testBook{
			series:    "test series",
			title:     "with json title",
			pageCount: 5,
			volume:    10,
			chapter:   11.5,
		}, nil},
		{"book.json", "../../../test_books/bookjson2.cbz", &testBook{
			series:    "test series",
			title:     "with json title",
			pageCount: 5,
			volume:    10,
			chapter:   11.5,
		}, nil},
		{
			"no file", "../../../test_books/badbookjson.cbz", nil,
			fmt.Errorf("NewBook loadNewBookData: parsing book.json: invalid character 'g' looking for beginning of value"),
		},
		{"ComicInfo.xml", "../../../test_books/comicInfoXML.cbz", &testBook{
			series:    "xml series",
			title:     "comicInfoXML",
			pageCount: 5,
			// volume:    10,
			chapter: 12.5,
		}, nil},
		{"bad ComicInfo.xml", "../../../test_books/badcomicInfoXML.cbz", nil,
			fmt.Errorf("NewBook loadNewBookData: EOF")},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			args := NewBookArgs{}
			if test.filePath != "" {
				args.Data.File = strptr(test.filePath)
			}

			fmt.Printf("%#v\n", "call")
			r, err := (&query{}).NewBook(userCtx(), args)
			if test.err != nil {
				assert.EqualError(t, err, test.err.Error())
				return
			}

			if !assert.NoError(t, err) {
				return
			}
			if !assert.NotNil(t, r, "the book resolver must not be nil") {
				return
			}

			assert.NoError(t, err)

			b := test.expectedBook
			assert.Equal(t, b.series, r.Series())
			assert.Equal(t, b.title, r.Title())
			assert.Equal(t, b.pageCount, len(r.Pages()))
			if b.volume == 0 {
				assert.Nil(t, r.Volume())
			} else {
				if assert.NotNil(t, r.Volume()) {
					assert.Equal(t, b.volume, *r.Volume())
				}
			}
			if b.chapter == 0 {
				assert.Nil(t, r.Chapter())
			} else {
				if assert.NotNil(t, r.Chapter()) {
					assert.Equal(t, b.chapter, *r.Chapter())
				}
			}
			// assert.NotEqual(t, "../../../test_books/book1.cbz", r.File())
		})
	}
}

func TestUpdateBook(t *testing.T) {
	setUpDB()
	defer tearDownDB()
}
