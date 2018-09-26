package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/database"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/gql"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
)

type BookQuery struct {
	PageInfo gql.Page              `json:"page_info"`
	Results  []*model.BookUserBook `json:"results"`
}

const (
	Cover   = "FrontCover"
	Deleted = "Deleted"
	Story   = "Story"
)

var BookType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Book",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type:        graphql.ID,
			Description: "a unique id for the books",
			Resolve:     gql.ResolveVal("ID"),
		},
		"created_at": &graphql.Field{
			Type:        graphql.DateTime,
			Description: "the date a book was created",
			Resolve:     gql.ResolveVal("CreatedAt"),
		},
		"updated_at": &graphql.Field{
			Type:    graphql.DateTime,
			Resolve: gql.ResolveVal("UpdatedAt"),
		},
		"series": &graphql.Field{
			Type:    graphql.String,
			Resolve: gql.ResolveVal("Series"),
		},
		"summary": &graphql.Field{
			Type:    graphql.String,
			Resolve: gql.ResolveVal("Summary"),
		},
		"story_arc": &graphql.Field{
			Type:    graphql.String,
			Resolve: gql.ResolveVal("StoryArc"),
		},
		"authors": &graphql.Field{
			Type: graphql.NewList(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				book := p.Source.(*model.BookUserBook)
				authors := []string{}

				if len(book.AuthorsJSON) == 0 {
					return authors, nil
				}

				err := json.Unmarshal(book.AuthorsJSON, authors)
				if err != nil {
					return nil, err
				}
				return authors, nil
			},
		},
		"web": &graphql.Field{
			Type:    graphql.String,
			Resolve: gql.ResolveVal("Web"),
		},
		"genres": &graphql.Field{
			Type: graphql.NewList(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				book := p.Source.(*model.BookUserBook)
				genres := []string{}

				if len(book.GenresJSON) == 0 {
					return genres, nil
				}

				err := json.Unmarshal(book.GenresJSON, genres)
				if err != nil {
					return nil, err
				}
				return genres, nil
			},
		},
		"alternate_series": &graphql.Field{
			Type:    graphql.String,
			Resolve: gql.ResolveVal("AlternateSeries"),
		},
		"reading_direction": &graphql.Field{
			Type:    graphql.String,
			Resolve: gql.ResolveVal("ReadingDirection"),
		},
		"type": &graphql.Field{
			Type:    graphql.String,
			Resolve: gql.ResolveVal("MediaType"),
		},
		"file": &graphql.Field{
			Type:    graphql.NewNonNull(graphql.String),
			Resolve: gql.ResolveVal("File"),
		},
		"title": &graphql.Field{
			Type:    graphql.String,
			Resolve: gql.ResolveVal("Title"),
		},
		"volume": &graphql.Field{
			Type:    graphql.Int,
			Resolve: gql.ResolveVal("Volume"),
		},
		"community_rating": &graphql.Field{
			Type:    graphql.Float,
			Resolve: gql.ResolveVal("CommunityRating"),
		},
		"chapter": &graphql.Field{
			Type:    graphql.Float,
			Resolve: gql.ResolveVal("Chapter"),
		},
		"date_released": &graphql.Field{
			Type:    graphql.DateTime,
			Resolve: gql.ResolveVal("DateReleased"),
		},
		"current_page": &graphql.Field{
			Type:    graphql.Int,
			Resolve: gql.ResolveVal("CurrentPage"),
		},
		"last_page_read": &graphql.Field{
			Type:    graphql.Int,
			Resolve: gql.ResolveVal("LastPageRead"),
		},
		"rating": &graphql.Field{
			Type:    graphql.Float,
			Resolve: gql.ResolveVal("Rating"),
		},
		"read": &graphql.Field{
			Type:    graphql.Boolean,
			Resolve: gql.ResolveVal("Read"),
		},
		"cover": &graphql.Field{
			Type: PageType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				book := p.Source.(*model.BookUserBook)
				allPages := []*model.Page{}
				pages := []*model.Page{}

				if len(book.PagesJSON) == 0 {
					return pages, nil
				}

				err := json.Unmarshal(book.PagesJSON, &allPages)
				if err != nil {
					return nil, err
				}
				if len(allPages) == 0 {
					return nil, nil
				}
				for i, page := range allPages {
					page.URL = fmt.Sprintf("/api/v1/book/%s/page/%d.png", book.ID, i)
					if page.Type == Cover {
						return page, nil
					}
				}

				return allPages[0], nil
			},
		},
		"pages": &graphql.Field{
			Type: graphql.NewList(PageType),
			Args: graphql.FieldConfigArgument{
				"type": &graphql.ArgumentConfig{
					Type: PageTypeEnum,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				t, typeOk := p.Args["type"].(string)
				book := p.Source.(*model.BookUserBook)
				allPages := []*model.Page{}
				pages := []*model.Page{}

				if len(book.PagesJSON) == 0 {
					return pages, nil
				}

				err := json.Unmarshal(book.PagesJSON, &allPages)
				if err != nil {
					return nil, err
				}

				for i, page := range allPages {
					if page.Type == t || !typeOk {
						page.URL = fmt.Sprintf("/api/v1/book/%s/page/%d.png", book.ID, i)
						pages = append(pages, page)
					}
				}

				return pages, nil
			},
		},
	},
})

var PageTypeEnum = graphql.NewEnum(graphql.EnumConfig{
	Name: "PageType",
	Values: graphql.EnumValueConfigMap{
		Cover: &graphql.EnumValueConfig{
			Value: Cover,
		},
		Story: &graphql.EnumValueConfig{
			Value: Story,
		},
		Deleted: &graphql.EnumValueConfig{
			Value: Deleted,
		},
	},
})

var PageType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Page",
	Fields: graphql.Fields{
		"file_number": &graphql.Field{
			Type: graphql.Int,
		},
		"type": &graphql.Field{
			Type: PageTypeEnum,
		},
		"url": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var BookQueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BookQuery",
	Fields: graphql.Fields{
		"page_info": &graphql.Field{
			Type: gql.PageInfoType,
		},
		"results": &graphql.Field{
			Type: graphql.NewList(BookType),
		},
	},
})
var BookQueries = graphql.Fields{
	"book": &graphql.Field{
		Type: BookType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.ID),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)
			book := &model.BookUserBook{}
			err := database.DB.Get(book, `SELECT * FROM "book_user_book" where  user_id=? and id=? limit 1;`, c.User.ID, p.Args["id"])
			if err == sql.ErrNoRows {
				return nil, nil
			} else if err != nil {
				return nil, err
			}
			return book, nil
		},
	},
	"books": &graphql.Field{
		Args: graphql.FieldConfigArgument{
			"take": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
			"skip": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"series": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Type: BookQueryType,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)

			skip, _ := p.Args["skip"].(int)
			take, _ := p.Args["take"].(int)
			if 0 > take || take > 100 {
				return nil, fmt.Errorf("you must take between 0 and 100 items")
			}
			data := []interface{}{c.User.ID}
			wheres, whereData := gql.ToSQL(model.BookUserBook{}, p.Args)
			data = append(data, whereData...)

			var count int
			err := database.DB.Get(&count, fmt.Sprintf(`SELECT count(*) FROM "book_user_book" where user_id=? %s;`, wheres), data...)
			if err == sql.ErrNoRows {
				count = 0
			} else if err != nil {
				return nil, err
			}

			books := []*model.BookUserBook{}

			err = database.DB.Select(&books, fmt.Sprintf(`SELECT * FROM "book_user_book" where user_id=? %s limit ? offset ?;`, wheres), append(data, take, skip)...)
			if err == sql.ErrNoRows {
				return nil, nil
			} else if err != nil {
				return nil, err
			}

			bq := BookQuery{
				PageInfo: gql.Page{
					Skip:  skip,
					Take:  take,
					Total: count,
				},
				Results: books,
			}
			return bq, nil
		},
	},
}

var BookInput = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "book_input",
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

			id, old := p.Args["id"]

			if !old {
				id, err = uuid.NewRandom()
				if err != nil {
					return nil, err
				}
			}

			bookCols := model.GetTags(model.Book{}, "db")
			userBookCols := model.GetTags(model.UserBook{}, "db")
			for table, modelCols := range map[string][]string{"book": bookCols, "user_book": userBookCols} {

				cols := []string{}
				values := []interface{}{}
				bookMap := p.Args["book"].(map[string]interface{})

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
