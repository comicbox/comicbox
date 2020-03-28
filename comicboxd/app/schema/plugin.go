package schema

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"

	"github.com/comicbox/comicbox/comicboxd/app"
	"github.com/comicbox/comicbox/comicboxd/app/middleware"
)

type Request struct {
	Name   string
	Args   json.RawMessage
	Extras map[string]string
	Host   string
	Auth   string
}

func after(name string, ctx context.Context, args interface{}, result interface{}) {
	bArgs, err := json.Marshal(args)
	if err != nil {
		return
	}
	c := ctx.Value(appCtx).(*app.Context)

	key := middleware.NewTempKey(c.User)
	defer middleware.ClearTempKey(key)
	r := &Request{
		Name:   name,
		Args:   bArgs,
		Extras: map[string]string{},
		Host:   c.Host(),
		Auth:   key,
	}

	b, err := json.Marshal(r)
	if err != nil {
		return
	}

	http.Post("http://localhost:8087", "text/json", bytes.NewReader(b))
}
