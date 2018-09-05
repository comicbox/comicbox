package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"bitbucket.org/zwzn/comicbox/comicboxd/app/controller"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
)

type ErrorResponse struct {
	Error  string `json:"error"`
	Status int    `json:"status"`
}

func route(s *server.Server, callback func(controller.Context) interface{}) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		c := controller.Context{}
		c.ResponseWriter = w
		c.Request = r
		c.DB = s.DB

		c.User = &model.User{
			Name:     "Guest",
			Username: "guest",
		}

		resp := callback(c)

		switch v := resp.(type) {
		case errors.HTTPError:
			writeError(w, v, v.Status)
		case error:
			writeError(w, v, 500)
		case string:
			fmt.Fprintf(w, "%s", v)
		default:
			writeJSON(w, v)
		}
	}
}

func writeJSON(w http.ResponseWriter, v interface{}) {

	d, err := json.MarshalIndent(v, "", "    ")
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%s", d)
}

func writeError(w http.ResponseWriter, err error, code int) {
	w.WriteHeader(code)
	writeJSON(w, ErrorResponse{err.Error(), code})
}
