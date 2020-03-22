package plugin

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"reflect"

	"github.com/comicbox/comicbox/comicboxd/app/schema"
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
		reflect.ValueOf(context.WithValue(r.Context(), "host", req.Host)),
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

func Query(ctx context.Context) (interface{}, error) {
	host := ctx.Value("host").(string)
	r, err := http.Post(host+"/graphql", "text/json", bytes.NewReader([]byte{}))
	if err != nil {
		return nil, err
	}
	defer r.Body.Close()
	io.Copy(os.Stdout, r.Body)

	return nil, nil
}
