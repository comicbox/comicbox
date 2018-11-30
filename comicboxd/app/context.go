package app

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/zwzn/comicbox/comicboxd/app/model"
	"github.com/gorilla/context"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

type Context struct {
	vars    map[string]string
	request *http.Request
	// DB       *sqlx.DB
	User     *model.User
	Session  *sessions.Session
	Response interface{}
}

func Ctx(r *http.Request) *Context {
	ctx, ok := context.GetOk(r, "context")
	if ok {
		return ctx.(*Context)
	}

	c := &Context{}
	c.request = r
	context.Set(r, "context", c)
	return c
}

func CtxSet(r *http.Request, c *Context) {
	context.Set(r, "context", c)
}

func (c Context) Var(key string) string {
	if c.vars == nil {
		c.vars = mux.Vars(c.request)
	}
	return c.vars[key]
}

func (c Context) VarInt64(key string) int64 {
	if c.vars == nil {
		c.vars = mux.Vars(c.request)
	}
	i, _ := strconv.ParseInt(c.vars[key], 10, 64)
	return i
}

func (c Context) DecodeBody(v interface{}) error {
	return json.NewDecoder(c.request.Body).Decode(v)
}

func (c Context) SSet(key, value interface{}) {
	c.Session.Values[key] = value
}

func (c Context) SClear(key interface{}) {
	delete(c.Session.Values, key)
}

func (c Context) SGet(key interface{}) (interface{}, bool) {
	value, ok := c.Session.Values[key]
	return value, ok
}

func (c Context) SGetString(key interface{}) (string, bool) {
	value, ok := c.SGet(key)
	strVal, ok := value.(string)
	return strVal, ok
}

func (c Context) SGetInt64(key interface{}) (int64, bool) {
	value, ok := c.SGet(key)
	strVal, ok := value.(int64)
	return strVal, ok
}

func (c Context) QGet(key string) (string, bool) {
	values, ok := c.request.URL.Query()[key]
	if !ok {
		return "", false
	}
	if len(values) == 0 {
		return "", false
	}
	return values[0], true
}

func (c Context) QGetInt64(key string) (int64, bool) {
	value, ok := c.QGet(key)
	if !ok {
		return 0, false
	}
	i, err := strconv.ParseInt(value, 10, 64)
	if err != nil {
		return 0, false
	}
	return i, true
}

func (c Context) URL(format string, a ...interface{}) string {
	url := fmt.Sprintf(format, a...)
	if strings.HasPrefix(url, "/") {
		url = fmt.Sprintf("%s://%s", "http", c.request.Host) + url
	}
	return url
}
