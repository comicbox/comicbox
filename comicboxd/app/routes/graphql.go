package routes

import (
	"encoding/json"
	"fmt"

	"github.com/fatih/structs"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/database"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func GraphQL(s *server.Server) {
	bookType := graphql.NewObject(graphql.ObjectConfig{
		Name: "book",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type:        graphql.Int,
				Description: "a unique id for the books",
				Resolve:     resolveVal("ID"),
			},
			"created_at": &graphql.Field{
				Type:        graphql.DateTime,
				Description: "the date a book was created",
				Resolve:     resolveVal("CreatedAt"),
			},
			"updated_at": &graphql.Field{
				Type:    graphql.DateTime,
				Resolve: resolveVal("UpdatedAt"),
			},
			"series": &graphql.Field{
				Type:    graphql.String,
				Resolve: resolveVal("Series"),
			},
			"summary": &graphql.Field{
				Type:    graphql.String,
				Resolve: resolveVal("Series"),
			},
			"story_arc": &graphql.Field{
				Type:    graphql.String,
				Resolve: resolveVal("StoryArc"),
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
				Resolve: resolveVal("Web"),
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
				Resolve: resolveVal("AlternateSeries"),
			},
			"reading_direction": &graphql.Field{
				Type:    graphql.String,
				Resolve: resolveVal("ReadingDirection"),
			},
			"type": &graphql.Field{
				Type:    graphql.String,
				Resolve: resolveVal("MediaType"),
			},
			"file": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.String),
				Resolve: resolveVal("File"),
			},
			"title": &graphql.Field{
				Type:    graphql.String,
				Resolve: resolveVal("Title"),
			},
			"volume": &graphql.Field{
				Type:    graphql.Int,
				Resolve: resolveVal("Volume"),
			},
			"community_rating": &graphql.Field{
				Type:    graphql.Float,
				Resolve: resolveVal("CommunityRating"),
			},
			"chapter": &graphql.Field{
				Type:    graphql.Float,
				Resolve: resolveVal("Chapter"),
			},
			"date_released": &graphql.Field{
				Type:    graphql.DateTime,
				Resolve: resolveVal("DateReleased"),
			},
			"current_page": &graphql.Field{
				Type:    graphql.Int,
				Resolve: resolveVal("CurrentPage"),
			},
			"last_page_read": &graphql.Field{
				Type:    graphql.Int,
				Resolve: resolveVal("LastPageRead"),
			},
			"rating": &graphql.Field{
				Type:    graphql.Float,
				Resolve: resolveVal("Rating"),
			},
		},
	})

	queries := graphql.Fields{
		"book": &graphql.Field{
			Type: bookType,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				book := &model.BookUserBook{}
				err := database.DB.Get(book, `SELECT * FROM "book" left join user_book on book_id=id and user_id=? where id=? limit 1;` /*userID*/, 1, p.Args["id"].(int))

				return book, err
			},
		},
	}

	schemaConfig := graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{Name: "RootQuery", Fields: queries}),
	}
	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		panic(err)
	}

	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	s.Router.Handle("/graphql", h)
}

func resolveVal(name string) graphql.FieldResolveFn {
	return func(p graphql.ResolveParams) (interface{}, error) {
		val, ok := getValue(p.Source, name)
		if !ok {
			return nil, fmt.Errorf("field not in struct")
		}
		return val, nil
	}
}

func getValue(v interface{}, name string) (interface{}, bool) {

	s := structs.New(v)

	for _, field := range s.Fields() {
		if field.IsEmbedded() {
			val, ok := getValue(field.Value(), name)
			if ok {
				return val, true
			}
		} else {
			if field.Name() == name {
				return field.Value(), true
			}
		}
	}
	return nil, false
}
