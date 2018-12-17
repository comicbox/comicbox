package gql

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"

	graphql "github.com/graph-gophers/graphql-go"

	"github.com/zwzn/comicbox/comicboxd/app"
)

var GQLHandler http.Handler

type CloserBuffer struct {
	*bytes.Buffer
}

func (cb *CloserBuffer) Close() error {
	return nil
}

func Query(r *http.Request, query string, vars map[string]interface{}, response interface{}) error {
	c := app.Ctx(r)
	if c.User == nil {
		return fmt.Errorf("you must be on a page with the auth middleware to use run queries")
	}
	request := map[string]interface{}{
		// "operationName": "getBook",
		"query":     query,
		"variables": vars,
	}

	b, err := json.Marshal(request)
	if err != nil {
		return err
	}

	resp := httptest.NewRecorder()
	newR := httptest.NewRequest("POST", "http://0.0.0.0/graphql", &CloserBuffer{bytes.NewBuffer(b)})

	app.CtxSet(newR, app.Ctx(r))

	GQLHandler.ServeHTTP(resp, newR)

	qr := graphql.Response{}

	err = json.NewDecoder(resp.Body).Decode(&qr)
	if err != nil {
		return err
	}

	for _, err := range qr.Errors {
		return fmt.Errorf("graphql error: %v", err)
	}

	// removed the outer object from the json. I can't think of a nicer way of
	// doing it that doesn't involve moving to and from json a bunch
	startIndex := strings.Index(string(qr.Data), ":{") + 1
	newJSON := qr.Data[startIndex : len(qr.Data)-1]
	err = json.Unmarshal(newJSON, response)
	if err != nil {
		return err
	}

	return nil
}
