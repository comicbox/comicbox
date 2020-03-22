package schema

import (
	"context"
	"log"
	"net/http"

	"github.com/comicbox/comicbox/comicboxd/app/schema/scalar"

	"github.com/Masterminds/squirrel"
	"github.com/comicbox/comicbox/comicboxd/app"
	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/app/model"
	"github.com/jmoiron/sqlx"
	"github.com/spf13/viper"
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

func userQuery() *PublicQuery {
	r := &http.Request{}
	app.CtxSet(r, &app.Context{
		User: &model.User{
			Name:     "Test User",
			Username: "test",
		},
	})
	return Query(r)
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

var testUserIDs = map[string]string{
	"normal": "00401511-db31-4722-bc39-832ac34783f7",
	"t1":     "ac5e5d22-4dbf-4914-8f75-0d135db29eb0",
	"t2":     "93797790-4f39-4c80-aec9-4f312d4897d1",
	"t3":     "cd301e7e-c23f-46ca-82b9-045d1cc23797",
	"t4":     "506e2afe-2628-4851-82d9-2fa7a206483f",
	"t5":     "23d95f71-7681-43b1-9f00-0ae13711d706",
	"t6":     "6dce3c74-d198-431f-929b-90ead0ecd897",
	"t7":     "f0cd3ea1-e873-40f2-a3e6-f437451e1ec7",
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

		users := []map[string]interface{}{
			{
				"id":         testUserIDs["normal"],
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
				"name":       "Normal User",
				"username":   "normy",
				"password":   "pass",
			},
			{
				"id":         testUserIDs["t1"],
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
				"name":       "Normal User",
				"username":   "t1",
				"password":   "pass",
			},
			{
				"id":         testUserIDs["t2"],
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
				"name":       "Normal User",
				"username":   "t2",
				"password":   "pass",
			},
			{
				"id":         testUserIDs["t3"],
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
				"name":       "Normal User",
				"username":   "t3",
				"password":   "pass",
			},
			{
				"id":         testUserIDs["t4"],
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
				"name":       "Normal User",
				"username":   "t4",
				"password":   "pass",
			},
			{
				"id":         testUserIDs["t5"],
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
				"name":       "Normal User",
				"username":   "t5",
				"password":   "pass",
			},
			{
				"id":         testUserIDs["t6"],
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
				"name":       "Normal User",
				"username":   "t6",
				"password":   "pass",
			},
			{
				"id":         testUserIDs["t7"],
				"created_at": "2018-11-26 00:51:23",
				"updated_at": "2018-11-26 00:51:23",
				"name":       "Normal User",
				"username":   "t7",
				"password":   "pass",
			},
		}
		for _, user := range users {
			_, err := db.Insert("user").SetMap(user).Exec()
			if err != nil {
				log.Fatal(err)
			}
		}
		return nil
	})
}
