package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"

	sq "github.com/Masterminds/squirrel"
	"github.com/zwzn/comicbox/comicboxd/app/database"
	"github.com/zwzn/comicbox/comicboxd/app/gql"
	"github.com/zwzn/comicbox/comicboxd/app/model"
	"github.com/zwzn/comicbox/comicboxd/errors"
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
		"tags": &graphql.Field{
			Type: graphql.NewList(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				series := p.Source.(*model.Series)
				tags := []string{}

				if len(series.TagsJSON) == 0 {
					return tags, nil
				}
				err := json.Unmarshal(series.TagsJSON, &tags)
				if err != nil {
					return nil, err
				}
				return tags, nil
			},
		},
		"books": &graphql.Field{
			Type: booksField.Type,
			Args: booksField.Args,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				series := p.Source.(*model.Series)
				p.Args["series"] = series.Name
				return booksField.Resolve(p)
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
var serieField = &graphql.Field{
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
}

var SeriesQueries = graphql.Fields{
	"serie": serieField,
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
		"tags": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
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
			err = database.Get(series, "select * from series where name=? and user_id=?", name, c.User.ID)
			if err != nil {
				return nil, err
			}

			return series, nil
		},
	},
}
