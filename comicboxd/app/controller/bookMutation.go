package controller

import (
	"archive/zip"
	"database/sql"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"github.com/abibby/comicbox/comicboxd/app/database"
	"github.com/abibby/comicbox/comicboxd/app/gql"
	"github.com/abibby/comicbox/comicboxd/app/model"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
)

var BookInput = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "BookInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"series": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"summary": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"story_arc": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"authors": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
		"web": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"genres": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
		"alternate_series": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"reading_direction": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"type": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"file": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"title": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"volume": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"community_rating": &graphql.InputObjectFieldConfig{
			Type: graphql.Float,
		},
		"chapter": &graphql.InputObjectFieldConfig{
			Type: graphql.Float,
		},
		"date_released": &graphql.InputObjectFieldConfig{
			Type: graphql.DateTime,
		},
		"current_page": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"last_page_read": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"rating": &graphql.InputObjectFieldConfig{
			Type: graphql.Float,
		},
		"pages": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(PageInput),
		},
	},
})

var PageInput = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "PageInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"url": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"file_number": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"type": &graphql.InputObjectFieldConfig{
			Type: PageTypeEnum,
		},
	},
})

var BookMutations = graphql.Fields{
	"book": &graphql.Field{
		Type: BookType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.ID,
			},
			"book": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(BookInput),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			// TODO replace this with gql.Insert and
			var err error
			var query string
			c := gql.Ctx(p)

			if (c.User.ID == uuid.UUID{}) {
				return nil, fmt.Errorf("you must be logged in to mutate books")
			}
			book := &model.BookUserBook{}
			bookMap := p.Args["book"].(map[string]interface{})

			id, old := p.Args["id"]

			if !old {
				id, err = uuid.NewRandom()
				if err != nil {
					return nil, err
				}
				bookMap, err = loadNewBookData(bookMap)
				if err != nil {
					return nil, err
				}
			}

			bookCols := model.GetTags(model.Book{}, "db")
			userBookCols := model.GetTags(model.UserBook{}, "db")
			for table, modelCols := range map[string][]string{"book": bookCols, "user_book": userBookCols} {

				cols := []string{}
				values := []interface{}{}

				for _, col := range modelCols {
					value, ok := bookMap[col]
					if ok {
						cols = append(cols, col)

						switch value.(type) {
						case int, float64, string:
							values = append(values, value)
						default:
							jsonVal, err := json.Marshal(value)
							if err != nil {
								return nil, err
							}
							values = append(values, string(jsonVal))

							if col == "pages" {
								cols = append(cols, "page_count")
								values = append(values, len(value.([]interface{})))

							}
						}
					}
				}
				if len(cols) == 0 {
					continue
				}
				numRows := 1
				if table == "user_book" {
					err = database.DB.Get(&numRows, `select count(*) from "user_book" where user_id=? and book_id=?;`, c.User.ID, id)
					if err != nil {
						return nil, err
					}
				}

				if old && numRows > 0 {
					wheres := []string{}
					for _, col := range cols {
						wheres = append(wheres, fmt.Sprintf("%s=?", col))
					}
					where := ""
					if table == "book" {
						where = "id=?"
						values = append(values, id)
					} else {
						where = "book_id=? and user_id=?"
						values = append(values, id)
						values = append(values, c.User.ID)
					}
					query = fmt.Sprintf(`update "%s" set %s where %s;`, table, strings.Join(wheres, ", "), where)
				} else {
					questions := []string{}
					for range values {
						questions = append(questions, "?")
					}
					if table == "book" {
						cols = append(cols, "id")
						questions = append(questions, "?")
						values = append(values, id)
					} else {
						cols = append(cols, "book_id")
						questions = append(questions, "?")
						values = append(values, id)

						cols = append(cols, "user_id")
						questions = append(questions, "?")
						values = append(values, c.User.ID)
					}

					query = fmt.Sprintf(`insert into "%s" (%s) values (%s);`, table, strings.Join(cols, ", "), strings.Join(questions, ", "))

				}
				_, err = c.DB.Exec(query, values...)
				if err != nil {
					return nil, err
				}
			}

			err = database.DB.Get(book, `select * from "book_user_book" where  user_id=? and id=? limit 1;`, c.User.ID, id)
			if err == sql.ErrNoRows {
				return nil, nil
			} else if err != nil {
				return nil, err
			}

			return book, nil
		},
	},
}

func loadNewBookData(bookMap map[string]interface{}) (map[string]interface{}, error) {

	iFile, ok := bookMap["file"]
	file := iFile.(string)
	if !ok {
		return nil, fmt.Errorf("you must have a file in new books")
	}
	imgs, err := ZippedImages(file)
	if err != nil {
		return nil, err
	}

	if _, ok := bookMap["pages"]; !ok {
		numPages := len(imgs)
		tmpPages := make([]interface{}, numPages)
		for i := 0; i < numPages; i++ {
			typ := Story
			if i == 0 {
				typ = Cover
			}
			tmpPages[i] = &model.Page{
				FileNumber: i,
				Type:       typ,
			}
		}
		bookMap["pages"] = tmpPages
	}

	reader, err := zip.OpenReader(file)
	if err != nil {
		return nil, err
	}

	for _, f := range reader.File {
		name := f.FileInfo().Name()
		if name == "book.json" {
			b, err := fileBytes(f)
			if err != nil {
				return nil, err
			}
			fmt.Printf("%s\n", b)

			err = json.Unmarshal(b, &bookMap)
			if err != nil {
				return nil, err
			}

			if author, ok := bookMap["author"]; ok {
				bookMap["authors"] = []interface{}{author}
			}
			if number, ok := bookMap["number"]; ok {
				bookMap["chapter"] = number
			}
			bookMap["file"] = file
			break
		} else if name == "ComicInfo.xml" {
			b, err := fileBytes(f)
			if err != nil {
				return nil, err
			}

			fmt.Printf("%s\n", b)

			crBook := ComicRackBook{}
			err = xml.Unmarshal(b, &crBook)
			if err != nil {
				return nil, err
			}
			fmt.Printf("%#v\n", crBook)
			os.Exit(1)
		}
	}
	// fmt.Printf("%#v\n", bookMap)
	// os.Exit(1)
	return bookMap, nil
}

func fileBytes(f *zip.File) ([]byte, error) {
	reader, err := f.Open()
	if err != nil {
		return nil, err
	}
	defer reader.Close()

	b, err := ioutil.ReadAll(reader)
	if err != nil {
		return nil, err
	}
	return b, nil
}
