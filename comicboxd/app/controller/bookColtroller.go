package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/database"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/gql"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"github.com/graphql-go/graphql"
)

var BookType = graphql.NewObject(graphql.ObjectConfig{
	Name: "book",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type:        graphql.Int,
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
			Resolve: gql.ResolveVal("Series"),
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
				json.Unmarshal(book.AuthorsJSON, authors)
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
				authors := []string{}
				json.Unmarshal(book.GenresJSON, authors)
				return authors, nil
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
	},
})
var BookQueries = graphql.Fields{
	"book": &graphql.Field{
		Type: BookType,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)
			book := &model.BookUserBook{}
			user := c.User
			err := database.DB.Get(book, `SELECT * FROM "book" left join "user_book" on book_id=id and user_id=? where id=? limit 1;`, user.ID, p.Args["id"].(int))
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
		},
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "book_query",
			Fields: graphql.Fields{
				"page_info": &graphql.Field{
					Type: gql.PageInfoType,
					Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						c := gql.Ctx(p)
						user := c.User
						page := p.Source.(*gql.Page)
						var count int
						err := database.DB.Get(&count, `SELECT count(*) FROM "book" left join "user_book" on book_id=id and user_id=?;`, user.ID)
						if err == sql.ErrNoRows {
							count = 0
						} else if err != nil {
							return nil, err
						}

						page.Total = count

						return page, nil
					},
				},
				"results": &graphql.Field{
					Type: graphql.NewList(BookType),

					Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						c := gql.Ctx(p)
						books := []*model.BookUserBook{}
						user := c.User
						page := p.Source.(*gql.Page)
						err := database.DB.Select(&books, `SELECT * FROM "book" left join "user_book" on book_id=id and user_id=? limit ? offset ?;`, user.ID, page.Take, page.Skip)
						if err == sql.ErrNoRows {
							return nil, nil
						} else if err != nil {
							return nil, err
						}
						return books, nil
					},
				},
			},
		}),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			skip, _ := p.Args["skip"].(int)
			take, _ := p.Args["take"].(int)
			if 0 > take || take > 100 {
				return nil, fmt.Errorf("you must take between 0 and 100 items")
			}
			page := &gql.Page{
				Skip:  skip,
				Take:  take,
				Total: -1,
			}
			return page, nil
		},
	},
}
