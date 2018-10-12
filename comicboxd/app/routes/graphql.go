package routes

import (
	"context"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/gql"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/middleware"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"github.com/gorilla/mux"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func GraphQL(r *mux.Router) {
	queries := mergeFields(
		controller.UserQueries,
		controller.BookQueries,
		controller.SeriesQueries,
	)

	mutations := mergeFields(
		controller.BookMutations,
		controller.SeriesMutations,
		controller.UserMutations,
	)

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    graphql.NewObject(graphql.ObjectConfig{Name: "RootQuery", Fields: queries}),
		Mutation: graphql.NewObject(graphql.ObjectConfig{Name: "RootMutation", Fields: mutations}),
	})
	errors.Check(err)

	h := handler.New(&handler.Config{
		Schema:     &schema,
		Pretty:     true,
		Playground: true,
		// GraphiQL: true,
		RootObjectFn: func(ctx context.Context, r *http.Request) map[string]interface{} {
			c := app.Ctx(r)
			// if c.User == nil {
			// 	c.User = &model.User{}
			// }
			return map[string]interface{}{
				"context": c,
			}
		},
	})

	gql.GQLHandler = h

	r.Handle("/graphql", middleware.Auth(h))
}

func mergeFields(fieldss ...graphql.Fields) graphql.Fields {
	newFields := graphql.Fields{}
	for _, fields := range fieldss {

		for name, field := range fields {
			newFields[name] = field
		}
	}
	return newFields
}
