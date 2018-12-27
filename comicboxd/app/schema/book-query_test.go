package schema

import (
	"fmt"
	"testing"
	"time"

	"github.com/bradleyjkemp/cupaloy"

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

func TestBook(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	insertTestBooks()

	tests := map[string]struct {
		id  string
		err error
	}{
		"empty": {
			testBookIDs["empty"],
			nil,
		},
		"bad id": {
			"bad id",
			nil,
		},
	}
	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			r, err := (&query{}).Book(userCtx(), BookArgs{ID: graphql.ID(test.id)})
			if test.err == nil {
				assert.NoError(t, err)
			} else {
				assert.EqualError(t, err, test.err.Error())
			}
			cupaloy.SnapshotT(t, r)
		})
	}
}

func TestBooks(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	insertTestBooks()

	tests := map[string]struct {
		args BooksArgs
		err  error
	}{
		"all": {
			BooksArgs{
				Take: 100,
			},
			nil,
		},
		"take 101": {
			BooksArgs{
				Take: 101,
			},
			fmt.Errorf("you must take between 0 and 100 items"),
		},
		"take -1": {
			BooksArgs{
				Take: -1,
			},
			fmt.Errorf("you must take between 0 and 100 items"),
		},
		"skip 1": {
			BooksArgs{
				Take: 100,
				Skip: intptr(1),
			},
			nil,
		},
		"no results": {
			BooksArgs{
				Take:   100,
				Series: regexptr("^this series should not exist$"),
			},
			nil,
		},
	}
	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			r, err := (&query{}).Books(userCtx(), test.args)

			if test.err != nil {
				assert.EqualError(t, err, test.err.Error())
				return
			}

			assert.NoError(t, err)

			total, err := r.Total()
			assert.NoError(t, err)

			results, err := r.Results()
			assert.NoError(t, err)

			cupaloy.SnapshotT(t, results, total)
		})
	}
}
