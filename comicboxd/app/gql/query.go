package gql

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/graphql-go/graphql"
)

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
