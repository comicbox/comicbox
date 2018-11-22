package controller

import (
	"database/sql"
	"fmt"

	sq "github.com/Masterminds/squirrel"
	"github.com/abibby/comicbox/comicboxd/app/database"
	"github.com/abibby/comicbox/comicboxd/app/gql"
	"github.com/abibby/comicbox/comicboxd/app/model"
	"github.com/abibby/comicbox/comicboxd/errors"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
)

type SeriesQuery struct {
	PageInfo gql.Page        `json:"page_info"`
	Results  []*model.Series `json:"results"`
}

var i = 0
var SeriesType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Series",
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
		"list": &graphql.Field{
			Type: ListEnum,
		},
		"books": &graphql.Field{
			Type: BookQueries["books"].Type,
			Args: BookQueries["books"].Args,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				series := p.Source.(*model.Series)
				p.Args["series"] = series.Name
				return BookQueries["books"].Resolve(p)

				// c := gql.Ctx(p)
				// books := []*model.BookUserBook{}
				// series := p.Source.(*model.Series)
				// skip, _ := p.Args["skip"].(int)
				// take, _ := p.Args["take"].(int)
				// read, readOk := p.Args["read"].(bool)

				// query := sq.Select("*").
				// 	From("book_user_book").
				// 	OrderBy("chapter").
				// 	OrderBy("volume").
				// 	Offset(uint64(skip)).
				// 	Limit(uint64(take)).
				// 	Where(sq.Eq{"series": series.Name}).
				// 	Where(sq.Eq{"user_id": c.User.ID})

				// if readOk {
				// 	query = query.Where(sq.Eq{"read": read})
				// }

				// sqll, args, err := query.ToSql()
				// errors.Check(err)

				// err = database.Select(&books, sqll, args...)
				// // err := database.Select(&books, `SELECT * FROM "book_user_book" where user_id=? and series=? order by chapter limit ? offset ?;`, c.User.ID, series.Name, take, skip)
				// if err == sql.ErrNoRows {
				// 	return nil, nil
				// } else if err != nil {
				// 	return nil, err
				// }
				// return books, nil

			},
		},
	},
})

var ListEnum = graphql.NewEnum(graphql.EnumConfig{
	Name: "List",
	Values: graphql.EnumValueConfigMap{
		"READING": &graphql.EnumValueConfig{
			Value: "reading",
		},
		"COMPLETED": &graphql.EnumValueConfig{
			Value: "completed",
		},
		"PAUSED": &graphql.EnumValueConfig{
			Value: "paused",
		},
		"DROPPED": &graphql.EnumValueConfig{
			Value: "dropped",
		},
		"PLANNING": &graphql.EnumValueConfig{
			Value: "planning",
		},
	},
})

var SeriesQueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SeriesQuery",
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
			err := database.Get(series, `SELECT * FROM "series" where user_id=? and name=? limit 1;`, user.ID, p.Args["name"])
			if err == sql.ErrNoRows {
				return nil, nil
			} else if err != nil {
				return nil, err
			}
			return series, nil
		},
	},
	"series": &graphql.Field{
		Args: gql.QueryArgs(model.Series{}, graphql.FieldConfigArgument{
			"take": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
			"skip": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"list": &graphql.ArgumentConfig{
				Type: ListEnum,
			},
		}),
		Type: SeriesQueryType,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)

			skip, _ := p.Args["skip"].(int)
			take, _ := p.Args["take"].(int)
			if 0 > take || take > 100 {
				return nil, fmt.Errorf("you must take between 0 and 100 items")
			}

			query := sq.Select().
				From("series").
				Where(sq.Eq{"user_id": c.User.ID})

			query = gql.Args(query, model.Series{}, p.Args)
			query = query.OrderBy("name")
			sqll, args, err := query.Columns("count(*)").ToSql()
			errors.Check(err)

			var count int
			err = database.Get(&count, sqll, args...)
			if err == sql.ErrNoRows {
				count = 0
			} else if err != nil {
				return nil, err
			}

			series := []*model.Series{}
			sqll, args, err = query.
				Columns("*").
				Offset(uint64(skip)).
				Limit(uint64(take)).
				ToSql()
			errors.Check(err)

			err = database.Select(&series, sqll, args...)
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

var SeriesInput = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "SeriesInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"list": &graphql.InputObjectFieldConfig{
			Type: ListEnum,
		},
	},
})

var SeriesMutations = graphql.Fields{
	"series": &graphql.Field{
		Type: SeriesType,
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"series": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(SeriesInput),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			c := gql.Ctx(p)

			if (c.User.ID == uuid.UUID{}) {
				return nil, fmt.Errorf("you must be logged in to mutate series")
			}

			name := p.Args["name"]

			numRows := 0
			err := database.Get(&numRows, "select count(*) from series where name=?", name)
			if err != nil {
				return nil, err
			}
			if numRows == 0 {
				return nil, fmt.Errorf("no series %s", name)
			}

			err = gql.InsertOrUpdate("user_series", model.Series{}, p.Args["series"], map[string]interface{}{
				"user_id": c.User.ID,
				"series":  name,
			})
			if err != nil {
				return nil, err
			}

			series := &model.Series{}
			err = database.Get(series, "select * from series where name=?", name)
			if err != nil {
				return nil, err
			}

			return series, nil
		},
	},
}
