package routes

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
	"github.com/google/uuid"
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
		controller.SeriesMutations,
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
			strUserID := r.Header.Get("x-user")

			userID, err := uuid.Parse(strUserID)
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

func Query(query string, vars, response interface{}) error {
	request := map[string]interface{}{
		// "operationName": "getBook",
		"query":     query,
		"variables": vars,
	}

	b, err := json.Marshal(request)
	if err != nil {
		return err
	}
	buf := bytes.NewBuffer(b)
	resp, err := http.Post("http://localhost:8080/graphql", "application/json", buf)
	if err != nil {
		return err
	}

	qr := graphql.Result{}

	json.NewDecoder(resp.Body).Decode(&qr)
	resp.Body.Close()

	for _, err := range qr.Errors {
		return err
	}

	data, ok := qr.Data.(map[string]interface{})
	if !ok {
		return fmt.Errorf("data not a map")
	}

	if len(data) > 1 {
		return fmt.Errorf("more than one return value")
	}
	for _, fieldData := range data {
		jData, err := json.Marshal(fieldData)
		if err != nil {
			return err
		}
		err = json.Unmarshal(jData, response)
		if err != nil {
			return err
		}
	}
	// err = mapstructure.Decode(qr.Data, response)
	// if err != nil {
	// 	return err
	// }

	return nil
}
