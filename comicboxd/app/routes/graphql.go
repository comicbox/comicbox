package routes

import (
	"context"
	"net/http"
	"strconv"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func GraphQL(s *server.Server) {

	queries := mergeFields(
		controller.UserQueries,
		controller.BookQueries,
		controller.SeriesQueries,
	)

	mutations := mergeFields(
		controller.BookMutations,
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
		RootObjectFn: func(ctx context.Context, r *http.Request) map[string]interface{} {
			c := app.Ctx(r)
			strUserID := r.Header.Get("x-user")
			userID, err := strconv.ParseInt(strUserID, 10, 64)
			if err == nil {
				c.User.ID = userID
			}
			return map[string]interface{}{
				"context": c,
			}
		},
	})
	s.Router.Handle("/graphql", h)
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
