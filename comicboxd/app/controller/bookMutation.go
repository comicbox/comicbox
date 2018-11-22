package controller

import (
	"archive/zip"
	"database/sql"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"reflect"
	"regexp"
	"strconv"
	"strings"

	sq "github.com/Masterminds/squirrel"
	"github.com/abibby/comicbox/comicboxd/app/database"
	"github.com/abibby/comicbox/comicboxd/app/gql"
	"github.com/abibby/comicbox/comicboxd/app/model"
	"github.com/abibby/comicbox/comicboxd/errors"
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

			if (c.User == nil || c.User.ID == uuid.UUID{}) {
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
					err = database.Get(&numRows, `select count(*) from "user_book" where user_id=? and book_id=?;`, c.User.ID, id)
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

				_, err = database.Exec(query, values...)
				if err != nil {
					return nil, err
				}
			}

			err = database.Get(book, `select * from "book_user_book" where  user_id=? and id=? limit 1;`, c.User.ID, id)
			if err == sql.ErrNoRows {
				return nil, nil
			} else if err != nil {
				return nil, err
			}

			return book, nil
		},
	},
	"deleteBook": &graphql.Field{
		Type: BookType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.ID),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)

			if (c.User == nil || c.User.ID == uuid.UUID{}) {
				return nil, fmt.Errorf("you must be logged in to mutate books")
			}

			id := p.Args["id"]

			sql, args, err := sq.Delete("book").Where(sq.Eq{"id": id}).ToSql()
			errors.Check(err)
			_, err = database.Exec(sql, args...)
			errors.Check(err)

			sql, args, err = sq.Delete("user_book").Where(sq.Eq{"book_id": id}).ToSql()
			errors.Check(err)
			_, err = database.Exec(sql, args...)
			errors.Check(err)

			return nil, nil
		},
	},
}

func loadNewBookData(bookMap map[string]interface{}) (map[string]interface{}, error) {
	iFile, ok := bookMap["file"]
	if !ok {
		return nil, fmt.Errorf("you must have a file in new books")
	}
	file := iFile.(string)

	newBookMap := map[string]interface{}{}

	imgs, err := ZippedImages(file)
	if err != nil {
		return nil, err
	}

	if _, ok := newBookMap["pages"]; !ok {
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
		newBookMap["pages"] = tmpPages
	}

	reader, err := zip.OpenReader(file)
	if err != nil {
		return nil, err
	}

	fNameBookMap, err := parseFileName(file)
	if err != nil {
		return nil, err
	}
	for key, val := range fNameBookMap {
		newBookMap[key] = val
	}
	for _, f := range reader.File {
		name := f.FileInfo().Name()
		if name == "book.json" {
			ciBookMap, err := parseBookJSON(f)
			if err != nil {
				return nil, err
			}
			for key, val := range ciBookMap {
				newBookMap[key] = val
			}
		} else if name == "ComicInfo.xml" {
			ciBookMap, err := parseComicInfoXML(f)
			if err != nil {
				return nil, err
			}
			for key, val := range ciBookMap {
				newBookMap[key] = val
			}
		}
	}
	for key, val := range bookMap {
		newBookMap[key] = val
	}
	return newBookMap, nil
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

func parseFileName(path string) (map[string]interface{}, error) {
	bookMap := map[string]interface{}{}
	extension := filepath.Ext(path)
	name := filepath.Base(path[:len(path)-len(extension)])
	dir := filepath.Base(filepath.Dir(path))

	bookMap["series"] = dir

	if strings.HasPrefix(name, dir) {
		name = name[len(dir):]
	}
	hasInfo := false

	matches := regexp.
		MustCompile(`^(?P<volume>[vV][\d]+(\.[\d]+)?)? *(#?(?P<chapter>[\d]+(\.[\d]+)?))? *(-)? *(?P<title>.*)$`).
		FindStringSubmatch(strings.Replace(name, "_", " ", -1))

	chapter, err := strconv.ParseFloat(matches[4], 64)
	if err == nil {
		hasInfo = true
		bookMap["chapter"] = chapter
	}
	volume, err := strconv.ParseFloat(matches[1], 64)
	if err == nil {
		hasInfo = true
		bookMap["volume"] = volume
	}
	if matches[7] != "" {
		hasInfo = true
		bookMap["title"] = matches[7]
	}

	if !hasInfo {
		bookMap["title"] = name
	}

	return bookMap, nil
}

func parseBookJSON(f *zip.File) (map[string]interface{}, error) {
	bookMap := map[string]interface{}{}
	b, err := fileBytes(f)
	if err != nil {
		return nil, err
	}

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
	for key, value := range bookMap {
		if IsZero(value) {
			delete(bookMap, key)
		}
	}
	return bookMap, nil
}

// from https://stackoverflow.com/a/33116479
func IsZero(v interface{}) bool {
	t := reflect.TypeOf(v)
	if !t.Comparable() {
		return false
	}
	return v == reflect.Zero(t).Interface()
}

func parseComicInfoXML(f *zip.File) (map[string]interface{}, error) {
	bookMap := map[string]interface{}{}
	b, err := fileBytes(f)
	if err != nil {
		return nil, err
	}

	crBook := ComicRackBook{}
	err = xml.Unmarshal(b, &crBook)
	if err != nil {
		return nil, err
	}
	if crBook.Number != 0 {
		bookMap["chapter"] = crBook.Number
	}
	if crBook.Volume != 0 {
		bookMap["volume"] = crBook.Volume
	}
	if crBook.Series != "" {
		bookMap["series"] = crBook.Series
	}
	if crBook.Writer != "" {
		bookMap["authors"] = strings.Split(crBook.Writer, ", ")
	}
	if crBook.Genres != "" {
		bookMap["genres"] = strings.Split(crBook.Genres, ", ")
	}
	if crBook.Summary != "" {
		bookMap["summary"] = crBook.Summary
	}
	if crBook.Title != "" {
		bookMap["title"] = crBook.Title
	}

	numPages := len(crBook.Pages)
	tmpPages := make([]interface{}, numPages)
	for i := 0; i < numPages; i++ {
		var typ string
		switch crBook.Pages[i].Type {
		case "FrontCover":
			typ = Cover
		case "Story":
			typ = Story
		case "Deleted":
			typ = Deleted
		default:
			typ = Story
		}
		tmpPages[i] = &model.Page{
			FileNumber: crBook.Pages[i].Image,
			Type:       typ,
		}
	}
	bookMap["pages"] = tmpPages

	return bookMap, nil
}
