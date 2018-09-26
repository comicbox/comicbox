package controller

import (
	"database/sql"
	"fmt"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/database"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/gql"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	sq "github.com/Masterminds/squirrel"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
)

type SeriesQuery struct {
	PageInfo gql.Page        `json:"page_info"`
	Results  []*model.Series `json:"results"`
}

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
			Type: graphql.NewList(BookType),
			Args: graphql.FieldConfigArgument{
				"take": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
				"skip": &graphql.ArgumentConfig{
					Type: graphql.Int,
				},
				"read": &graphql.ArgumentConfig{
					Type: graphql.Boolean,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				c := gql.Ctx(p)
				books := []*model.BookUserBook{}
				series := p.Source.(*model.Series)
				skip, _ := p.Args["skip"].(int)
				take, _ := p.Args["take"].(int)
				read, readOk := p.Args["read"].(bool)

				query := sq.Select("*").
					From("book_user_book").
					// OrderBy("chapter").
					Offset(uint64(skip)).
					Limit(uint64(take)).
					Where(sq.Eq{"series": series.Name}).
					Where(sq.Eq{"user_id": c.User.ID})

				if readOk {
					query = query.Where(sq.Eq{"read": read})
				}

				sqll, args, err := query.ToSql()
				errors.Check(err)

				err = database.DB.Select(&books, sqll, args...)
				// err := database.DB.Select(&books, `SELECT * FROM "book_user_book" where user_id=? and series=? order by chapter limit ? offset ?;`, c.User.ID, series.Name, take, skip)
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
			"list": &graphql.ArgumentConfig{
				Type: ListEnum,
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
			err := c.DB.Get(&numRows, "select count(*) from series where name=?", name)
			if err != nil {
				return nil, err
			}
			if numRows == 0 {
				return nil, fmt.Errorf("no series %s", name)
			}

			err = gql.InsertOrUpdate(c.DB, "user_series", model.Series{}, p.Args["series"], map[string]interface{}{
				"user_id": c.User.ID,
				"series":  name,
			})
			if err != nil {
				return nil, err
			}

			series := &model.Series{}
			err = c.DB.Get(series, "select * from series where name=?", name)
			if err != nil {
				return nil, err
			}

			return series, nil
		},
	},
}
