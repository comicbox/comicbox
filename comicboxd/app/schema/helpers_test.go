package schema

import (
	"context"
	"log"

	"github.com/zwzn/comicbox/comicboxd/app/schema/scalar"

	"github.com/Masterminds/squirrel"
	"github.com/jmoiron/sqlx"
	"github.com/spf13/viper"
	"github.com/zwzn/comicbox/comicboxd/app"
	"github.com/zwzn/comicbox/comicboxd/app/database"
	"github.com/zwzn/comicbox/comicboxd/app/model"
)

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
func intptr(x int32) *int32 {
	return &x
}
func floatptr(x float64) *float64 {
	return &x
}

func regexptr(str string) *scalar.Regex {
	return (*scalar.Regex)(&str)
}

var testBookIDs = map[string]string{
	"empty": "3874f414-02a8-4c99-b4ce-2bb8cee65ff4",

	"s1b1": "30e43719-a5f4-4961-a75a-74f4082c3a14",
	"s1b2": "c4cf8a72-83d3-44c1-a796-fb3c3ffb4bd2",

	"s2b1": "0663e2e1-b06d-4597-aa7e-ddc91ea23ae0",
	"s2b2": "992c75b6-0d8e-428c-8841-5f4ae0e1cb4c",
	"s2b3": "29e204d4-a514-4113-9ca2-2e12b9271e27",
	"s2b4": "388d3d31-4687-4efd-b5a8-bc75abd93ff5",
	"s2b5": "225018e2-f225-462d-bc85-8b4a4aedc554",

	"s3b1": "271cecab-2d3b-4742-83a3-85bb9a61ccb1",

	"s4b1": "9b8b01dd-2e49-4df0-bc47-9fd51e81ed4b",
}

func insertTestBooks() {

	database.Tx(context.Background(), func(tx *sqlx.Tx) error {
		db := squirrel.StatementBuilder.RunWith(tx)

		count := 0

		tx.Get(&count, "select count(*) from book where id = ?", testBookIDs["empty"])
		if count != 0 {
			return nil
		}
		books := []map[string]interface{}{
			{
				"id":         testBookIDs["empty"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
			},
			{
				"id":         testBookIDs["s1b1"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series":  "s1",
				"chapter": 1,
				"title":   "a book title",
			},
			{
				"id":         testBookIDs["s1b2"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series":  "s1",
				"chapter": 2,
			},
			{
				"id":         testBookIDs["s2b1"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series":  "s2",
				"chapter": 1,
				"volume":  1,
				"title":   "a different title",
			},
			{
				"id":         testBookIDs["s2b2"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series":  "s2",
				"chapter": 2,
				"volume":  1,
				"title":   "another different title",
			},
			{
				"id":         testBookIDs["s2b3"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series":  "s2",
				"chapter": 3,
				"volume":  2,
			},
			{
				"id":         testBookIDs["s2b4"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series":  "s2",
				"chapter": 4,
				"volume":  2,
			},
			{
				"id":         testBookIDs["s2b5"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series":  "s2",
				"chapter": 5,
				"volume":  3,
			},
			{
				"id":         testBookIDs["s3b1"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series": "s3",
				"volume": 1,
			},
			{
				"id":         testBookIDs["s4b1"],
				"file":       "/path/to/file",
				"pages":      "[]",
				"page_count": 0,
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",

				"series": "s4",
				"title":  "Series 4 title",
			},
		}
		for _, book := range books {
			_, err := db.Insert("book").SetMap(book).Exec()
			if err != nil {
				log.Fatal(err)
			}
		}
		return nil
	})
}
