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

func regexptr(str string) *scalar.Regex {
	return (*scalar.Regex)(&str)
}

var testBookIDs = map[string]string{
	"empty": "3874f414-02a8-4c99-b4ce-2bb8cee65ff4",
	"s1b1":  "30e43719-a5f4-4961-a75a-74f4082c3a14",
	"s1b2":  "c4cf8a72-83d3-44c1-a796-fb3c3ffb4bd2",
	"s2b1":  "0663e2e1-b06d-4597-aa7e-ddc91ea23ae0",
	"s3b1":  "29e204d4-a514-4113-9ca2-2e12b9271e27",
	"s3b2":  "992c75b6-0d8e-428c-8841-5f4ae0e1cb4c",
	"s3b4":  "388d3d31-4687-4efd-b5a8-bc75abd93ff5",
	"s3b5":  "225018e2-f225-462d-bc85-8b4a4aedc554",
	"s4b1":  "271cecab-2d3b-4742-83a3-85bb9a61ccb1",
	"s4b2":  "9b8b01dd-2e49-4df0-bc47-9fd51e81ed4b",
}

func insertTestBooks() {

	database.Tx(context.Background(), func(tx *sqlx.Tx) error {
		db := squirrel.StatementBuilder.RunWith(tx)
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
