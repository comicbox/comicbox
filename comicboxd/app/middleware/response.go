package middleware

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"runtime/debug"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"bitbucket.org/zwzn/comicbox/comicboxd/j"
)

func Response(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(r)

		next.ServeHTTP(w, r)

		if ctx.Response != nil {
			switch v := ctx.Response.(type) {
			case errors.HTTPError:
				writeError(w, v, v.Status)
			case error:
				writeError(w, v, 500)
			case string:
				fmt.Fprintf(w, "%s", v)
			case io.ReadCloser:
				_, err := io.Copy(w, v)
				if err != nil {
					writeError(w, err, 500)
					return
				}
				v.Close()
			default:
				writeJSON(w, v)
			}
		}
	})
}

func writeJSON(w http.ResponseWriter, v interface{}) {

	d, err := json.MarshalIndent(v, "", "    ")
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%s", d)
}

func writeError(w http.ResponseWriter, err interface{}, code int) {
	w.WriteHeader(code)
	stack := string(debug.Stack())
	writeJSON(w, ErrorResponse{fmt.Sprint(err), code, stack})
	j.Errorf("%v\n\n%s", err, stack)
}
