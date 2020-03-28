package plugin

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"reflect"

	"github.com/comicbox/comicbox/comicboxd/app/schema"
	"github.com/davecgh/go-spew/spew"
	gqlErrors "github.com/graph-gophers/graphql-go/errors"
	"github.com/pkg/errors"
)

type Plugin struct {
	Book              func(ctx context.Context, extras map[string]string, args schema.BookArgs) error
	Books             func(ctx context.Context, extras map[string]string, args schema.BooksArgs) error
	DeleteBook        func(ctx context.Context, extras map[string]string, args schema.DeleteBookArgs) error
	Me                func(ctx context.Context, extras map[string]string) error
	NewBook           func(ctx context.Context, extras map[string]string, args schema.NewBookArgs) error
	NewUser           func(ctx context.Context, extras map[string]string, args schema.NewUserArgs) error
	Serie             func(ctx context.Context, extras map[string]string, args schema.SerieArgs) error
	Series            func(ctx context.Context, extras map[string]string, args schema.SeriesArgs) error
	UpdateBook        func(ctx context.Context, extras map[string]string, args schema.UpdateBookArgs) error
	UpdateSeries      func(ctx context.Context, extras map[string]string, args schema.UpdateSeriesArgs) error
	UpdateSeriesBooks func(ctx context.Context, extras map[string]string, args schema.UpdateSeriesBooksArgs) error
	UpdateUser        func(ctx context.Context, extras map[string]string, args schema.UpdateUserArgs) error
	User              func(ctx context.Context, extras map[string]string, args schema.UserArgs) error
}

func Start(p *Plugin) {
	log.Fatal(http.ListenAndServe(":8087", p))
}

func (p *Plugin) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	req := &schema.Request{}
	err := json.NewDecoder(r.Body).Decode(req)
	if err != nil {
		log.Printf("%+v", err)
		return
	}

	pval := reflect.ValueOf(p).Elem()
	v := pval.FieldByName(req.Name)
	x := v.Type()

	if v.IsNil() {
		return
	}
	numIn := x.NumIn() //Count inbound parameters

	args := []reflect.Value{
		reflect.ValueOf(context.WithValue(context.WithValue(r.Context(), "host", req.Host), "auth", req.Auth)),
		reflect.ValueOf(map[string]string{}),
	}
	if numIn > 2 {
		a, err := newArg(x, 2, req.Args)
		if err != nil {
			log.Printf("%+v", err)
			return
		}
		args = append(args, a)
	}

	out := v.Call(args)
	err, ok := out[0].Interface().(error)
	if ok && err != nil {
		log.Printf("%+v", err)
		return
	}

	if err != nil {
		log.Printf("%+v", err)
		return
	}

	err = json.NewEncoder(w).Encode(req)
	if err != nil {
		log.Printf("%+v", err)
		return
	}
}

func newArg(fun reflect.Type, argNum int, data []byte) (reflect.Value, error) {

	v := reflect.New(fun.In(argNum)).Interface()
	err := json.Unmarshal(data, v)
	if err != nil {
		return reflect.Value{}, errors.Wrap(err, "failed to load json")
	}

	return reflect.ValueOf(v).Elem(), nil
}

type Response struct {
	Errors []*gqlErrors.QueryError    `json:"errors,omitempty"`
	Data   map[string]json.RawMessage `json:"data,omitempty"`
}

func Query(ctx context.Context, target interface{}, query string, variables map[string]interface{}) error {
	spew.Dump(variables)
	host := ctx.Value("host").(string)
	auth := ctx.Value("auth").(string)

	b, err := json.Marshal(map[string]interface{}{
		"query":     query,
		"variables": variables,
	})
	if err != nil {
		return err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", host+"/graphql", bytes.NewReader(b))
	if err != nil {
		return err
	}

	req.Header.Add("Authorization", auth)

	r, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer r.Body.Close()
	resp := &Response{}
	err = json.NewDecoder(r.Body).Decode(resp)
	if err != nil {
		return err
	}

	if len(resp.Data) > 1 {
		return errors.Errorf("you may only run one query at a time")
	}

	if resp.Errors != nil && len(resp.Errors) > 0 {
		return errors.Wrap(resp.Errors[0], "error running query")
	}
	for _, d := range resp.Data {
		spew.Dump(d)
		err = json.Unmarshal(d, target)
		if err != nil {
			return err
		}
		return nil
	}

	return errors.Errorf("there was no data in the graphql request")
}
