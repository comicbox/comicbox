package schema

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/zwzn/comicbox/comicboxd/app"

	"github.com/zwzn/comicbox/comicboxd/app/database"

	"github.com/spf13/viper"

	"github.com/google/uuid"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/zwzn/comicbox/comicboxd/app/model"

	"github.com/stretchr/testify/assert"
)

type ioTest struct {
	name string
	in   interface{}
	out  interface{}
}

type ioeTest struct {
	name string
	in   interface{}
	out  interface{}
	err  error
}

func runBRTests(t *testing.T, tests []ioTest, testCB func(t *testing.T, test ioTest, r BookResolver) interface{}) {
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			result := testCB(t, test, BookResolver{})
			assert.Equal(t, test.out, result)
		})
	}
}

func TestBookResolver(t *testing.T) {

	t.Run("ID", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", "56946630-a70d-4d49-8913-d67efb9c3ef9", graphql.ID("56946630-a70d-4d49-8913-d67efb9c3ef9")},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.ID = uuid.MustParse(test.in.(string))
			return r.ID()
		})
	})
	t.Run("AlternateSeries", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", "as", "as"},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.AlternateSeries = test.in.(string)
			return r.AlternateSeries()
		})
	})
	t.Run("Authors", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", `["adam", "bibby"]`, []string{"adam", "bibby"}},
			ioTest{"bad", `this is good json`, []string{}},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.AuthorsJSON = []byte(test.in.(string))
			return r.Authors()
		})
	})
	t.Run("Chapter", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", 10.0, 10.0},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			ch := test.in.(float64)
			r.b.Chapter = &ch
			return *r.Chapter()
		})
	})
	t.Run("CommunityRating", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", 10.0, 10.0},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			ch := test.in.(float64)
			r.b.CommunityRating = &ch
			return *r.CommunityRating()
		})
	})
	t.Run("Cover", func(t *testing.T) {
		var nilPR *PageResolver
		tests := []ioTest{
			ioTest{"normal", `[{
				"file_number": 0,
				"type": "FrontCover"
			}]`, &PageResolver{p: &model.Page{
				FileNumber: 0,
				Type:       "FrontCover",
				URL:        "/api/v1/book/00000000-0000-0000-0000-000000000000/page/0.jpg"}}},
			ioTest{"empty", `[]`, nilPR},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.PagesJSON = []byte(test.in.(string))
			return r.Cover()
		})
	})
	t.Run("CreatedAt", func(t *testing.T) {
		t1, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05+07:00")
		tests := []ioTest{
			ioTest{"good", t1, graphql.Time{Time: t1}},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.CreatedAt = test.in.(time.Time)
			return r.CreatedAt()
		})
	})
	t.Run("CurrentPage", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", 10, int32(10)},
			ioTest{"nil", nil, int32(0)},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			if test.in != nil {
				pg := int32(test.in.(int))
				r.b.CurrentPage = &pg
			}
			return r.CurrentPage()
		})
	})
	t.Run("DateReleased", func(t *testing.T) {
		t1, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05+07:00")
		var nilTime *time.Time
		var nilGTime *graphql.Time
		tests := []ioTest{
			ioTest{"good", &t1, &graphql.Time{Time: t1}},
			ioTest{"nil", nilTime, nilGTime},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.DateReleased = test.in.(*time.Time)
			return r.DateReleased()
		})
	})
	t.Run("File", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", "/path/to/book.cbz", "/path/to/book.cbz"},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.File = test.in.(string)
			return r.File()
		})
	})
	t.Run("Genres", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", `["g1", "g2"]`, []string{"g1", "g2"}},
			ioTest{"bad", `this is good json`, []string{}},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.GenresJSON = []byte(test.in.(string))
			return r.Genres()
		})
	})
	t.Run("LastPageRead", func(t *testing.T) {
		tests := []ioTest{
			ioTest{"good", 10, int32(10)},
			ioTest{"nil", nil, int32(0)},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			if test.in != nil {
				pg := int32(test.in.(int))
				r.b.LastPageRead = &pg
			}
			return r.LastPageRead()
		})
	})
	t.Run("Pages", func(t *testing.T) {
		tests := []ioTest{
			ioTest{
				"normal",
				`[{
					"file_number": 0,
					"type": "FrontCover"
				}]`,
				[]PageResolver{
					PageResolver{
						p: &model.Page{
							FileNumber: 0,
							Type:       "FrontCover",
							URL:        "/api/v1/book/00000000-0000-0000-0000-000000000000/page/0.jpg",
						},
					},
				},
			},
			ioTest{"empty", `[]`, []PageResolver{}},
			ioTest{"bad json", `good json`, []PageResolver{}},
		}
		runBRTests(t, tests, func(t *testing.T, test ioTest, r BookResolver) interface{} {
			r.b.PagesJSON = []byte(test.in.(string))
			return r.Pages()
		})
	})
}

func setUpDB() {
	viper.Set("db", "file::memory:?mode=memory&cache=shared")
	err := database.SetUp()
	if err != nil {
		panic(err)
	}
}

func userCtx() context.Context {
	c := &app.Context{
		User: &model.User{
			Name:     "Test User",
			Username: "test",
		},
	}
	return context.WithValue(context.Background(), appCtx, c)
}

func tearDownDB() {
	database.TearDown()
}

func strptr(str string) *string {
	return &str
}

func TestBookQuery(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	type testBook struct {
		series    string
		title     string
		pageCount int
		chapter   float64
		volume    int32
	}

	tests := []ioeTest{
		ioeTest{"good", "../../../test_books/book1.cbz", testBook{
			series:    "test_books",
			title:     "book1",
			pageCount: 5,
		}, nil},
		ioeTest{
			"no file", nil, nil,
			fmt.Errorf("NewBook loadNewBookData: you must have a file in new books"),
		},
		ioeTest{
			"no file", "/not/a/file/path", nil,
			fmt.Errorf("NewBook loadNewBookData: error opening zip: open /not/a/file/path: no such file or directory"),
		},
		ioeTest{
			"no file", "../../../test_books/bad_book.cbz", nil,
			fmt.Errorf("NewBook loadNewBookData: error opening zip: zip: not a valid zip file"),
		},
		ioeTest{"good 2", "../../../test_books/test_books V1 #2 a title.cbz", testBook{
			series:    "test_books",
			title:     "a title",
			pageCount: 5,
			volume:    1,
			chapter:   2,
		}, nil},
		ioeTest{"book.json", "../../../test_books/bookjson.cbz", testBook{
			series:    "test series",
			title:     "with json title",
			pageCount: 5,
			volume:    10,
			chapter:   11.5,
		}, nil},
		ioeTest{"book.json", "../../../test_books/bookjson2.cbz", testBook{
			series:    "test series",
			title:     "with json title",
			pageCount: 5,
			volume:    10,
			chapter:   11.5,
		}, nil},
		ioeTest{
			"no file", "../../../test_books/badbookjson.cbz", nil,
			fmt.Errorf("NewBook loadNewBookData: parsing book.json: invalid character 'g' looking for beginning of value"),
		},
		ioeTest{"ComicInfo.xml", "../../../test_books/comicInfoXML.cbz", testBook{
			series:    "xml series",
			title:     "comicInfoXML",
			pageCount: 5,
			// volume:    10,
			chapter: 12.5,
		}, nil},
		ioeTest{"bad ComicInfo.xml", "../../../test_books/badcomicInfoXML.cbz", nil,
			fmt.Errorf("NewBook loadNewBookData: EOF")},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			args := newBookArgs{}
			if test.in != nil {
				args.Data.File = strptr(test.in.(string))
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

			b := test.out.(testBook)
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
