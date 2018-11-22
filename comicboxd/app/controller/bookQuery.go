package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"

	sq "github.com/Masterminds/squirrel"
	"github.com/abibby/comicbox/comicboxd/app/database"
	"github.com/abibby/comicbox/comicboxd/app/gql"
	"github.com/abibby/comicbox/comicboxd/app/model"
	"github.com/abibby/comicbox/comicboxd/errors"
	"github.com/graphql-go/graphql"
)

type obj = map[string]interface{}

type BookQuery struct {
	PageInfo gql.Page              `json:"page_info"`
	Results  []*model.BookUserBook `json:"results"`
}

const (
	Cover   = "FrontCover"
	Deleted = "Deleted"
	Story   = "Story"
)

func init() {
	BookType.AddFieldConfig("series_query", &graphql.Field{
		Type: serieField.Type,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			serie := p.Source.(*model.BookUserBook)
			p.Args["name"] = serie.Series
			return serieField.Resolve(p)
			return nil, nil
		},
	})
}

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
		// "series_query": &graphql.Field{
		// 	Type: serieField.Type,
		// 	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		// 		serie := p.Source.(*model.BookUserBook)
		// 		p.Args["name"] = serie.Series
		// 		return serieField.Resolve(p)
		// 		return nil, nil
		// 	},
		// },
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

				err := json.Unmarshal(book.AuthorsJSON, &authors)
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
				err := json.Unmarshal(book.GenresJSON, &genres)
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
				c := gql.Ctx(p)
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
					page.URL = c.URL("/api/v1/book/%s/page/%d.webp", book.ID, i)
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
				c := gql.Ctx(p)
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
						page.URL = c.URL("/api/v1/book/%s/page/%d.webp", book.ID, i)
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
var booksField = &graphql.Field{
	Args: gql.QueryArgs(model.BookUserBook{}, graphql.FieldConfigArgument{
		"take": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.Int),
		},
		"skip": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	}),
	Type: BookQueryType,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		c := gql.Ctx(p)

		skip, _ := p.Args["skip"].(int)
		take, _ := p.Args["take"].(int)
		if 0 > take || take > 100 {
			return nil, fmt.Errorf("you must take between 0 and 100 items")
		}

		query := sq.Select().
			From("book_user_book").
			Where(sq.Eq{"user_id": c.User.ID})

		query = gql.Args(query, model.BookUserBook{}, p.Args)
		query = query.
			OrderBy("series").
			OrderBy("chapter").
			OrderBy("volume")
		sqll, args, err := query.Columns("count(*)").ToSql()
		errors.Check(err)

		var count int
		err = database.Get(&count, sqll, args...)
		if err == sql.ErrNoRows {
			count = 0
		} else if err != nil {
			return nil, err
		}
		books := []*model.BookUserBook{}
		sqll, args, err = query.
			Columns("*").
			Offset(uint64(skip)).
			Limit(uint64(take)).
			ToSql()
		errors.Check(err)

		err = database.Select(&books, sqll, args...)
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
}

var bookField = &graphql.Field{
	Type: BookType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.ID),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		c := gql.Ctx(p)
		book := &model.BookUserBook{}
		err := database.Get(book, `SELECT * FROM "book_user_book" where  user_id=? and id=? limit 1;`, c.User.ID, p.Args["id"])
		if err == sql.ErrNoRows {
			return nil, nil
		} else if err != nil {
			return nil, err
		}
		return book, nil
	},
}

var BookQueries = graphql.Fields{
	"book":  bookField,
	"books": booksField,
}
