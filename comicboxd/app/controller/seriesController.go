package controller

import (
	"database/sql"
	"fmt"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/database"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/gql"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"github.com/graphql-go/graphql"
)

type SeriesQuery struct {
	PageInfo gql.Page        `json:"page_info"`
	Results  []*model.Series `json:"results"`
}

var SeriesType = graphql.NewObject(graphql.ObjectConfig{
	Name: "series",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"total": &graphql.Field{
			Type: graphql.Int,
		},
		"read": &graphql.Field{
			Type: graphql.Int,
		},
		"books": &graphql.Field{
			Type: graphql.NewList(BookType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				c := gql.Ctx(p)
				books := []*model.BookUserBook{}
				series := p.Source.(*model.Series)

				err := database.DB.Select(&books, `SELECT * FROM "book_user_book" where user_id=? and series=?;`, c.User.ID, series.Name)
				if err == sql.ErrNoRows {
					return nil, nil
				} else if err != nil {
					return nil, err
				}
				return books, nil

			},
		},
	},
})
var SeriesQueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "series_query",
	Fields: graphql.Fields{
		"page_info": &graphql.Field{
			Type: gql.PageInfoType,
		},
		"results": &graphql.Field{
			Type: graphql.NewList(SeriesType),
		},
	},
})
var SeriesQueries = graphql.Fields{
	"serie": &graphql.Field{
		Type: SeriesType,
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)
			series := &model.Series{}
			user := c.User
			err := database.DB.Get(series, `SELECT * FROM "series" where user_id=? and name=? limit 1;`, user.ID, p.Args["name"])
			if err == sql.ErrNoRows {
				return nil, nil
			} else if err != nil {
				return nil, err
			}
			return series, nil
		},
	},
	"series": &graphql.Field{
		Args: graphql.FieldConfigArgument{
			"take": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
			"skip": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Type: SeriesQueryType,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)

			skip, _ := p.Args["skip"].(int)
			take, _ := p.Args["take"].(int)
			if 0 > take || take > 100 {
				return nil, fmt.Errorf("you must take between 0 and 100 items")
			}

			var count int
			err := database.DB.Get(&count, `SELECT count(*) FROM "series" where user_id=?;`, c.User.ID)
			if err == sql.ErrNoRows {
				count = 0
			} else if err != nil {
				return nil, err
			}

			series := []*model.Series{}

			err = database.DB.Select(&series, `SELECT * FROM "series" where user_id=? limit ? offset ?;`, c.User.ID, take, skip)
			if err == sql.ErrNoRows {
				return nil, nil
			} else if err != nil {
				return nil, err
			}

			bq := SeriesQuery{
				PageInfo: gql.Page{
					Skip:  skip,
					Take:  take,
					Total: count,
				},
				Results: series,
			}
			return bq, nil
		},
	},
}
