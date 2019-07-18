package main

import (
	"fmt"
	"log"
	"os"
	"reflect"
	"strconv"
	"strings"

	"github.com/comicbox/comicbox/comicboxd/app/schema"
	"github.com/spf13/pflag"
)

func check(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	out := pflag.StringP("out", "o", "", "the file to write the generated code to")
	pflag.Parse()

	fooType := reflect.TypeOf(&schema.RootQuery{})

	src := `package schema

import "context"

type PluginQuery struct {
	query *RootQuery
}

`
	for i := 0; i < fooType.NumMethod(); i++ {
		method := fooType.Method(i)

		f, err := NewFunc(method)
		check(err)

		src += f.Generate() + "\n\n"
	}

	f, err := os.Create(*out)
	check(err)
	defer f.Close()

	_, err = f.WriteString(src)
	check(err)
}

type Func struct {
	name string
	arg  string
	ret  string
}

func NewFunc(method reflect.Method) (*Func, error) {
	x := method.Type

	f := &Func{}
	f.name = method.Name
	hasContext := false
	hasError := false
	for i := 0; i < x.NumIn(); i++ {
		arg := x.In(i)

		if arg.PkgPath() == "context" && arg.Name() == "Context" {
			hasContext = true
		} else {
			f.arg = Type(arg)
		}
	}

	for i := 0; i < x.NumOut(); i++ {
		arg := x.Out(i)
		if arg.PkgPath() == "" && arg.Name() == "error" {
			hasError = true
		} else {
			f.ret = Type(arg)
		}
	}
	if !hasContext {
		return nil, fmt.Errorf("functions must have context")
	}
	if !hasError {
		return nil, fmt.Errorf("functions must return errors")
	}

	return f, nil
}

func Type(t reflect.Type) string {
	return strings.Replace(t.String(), "schema.", "", 1)
}

func name(r reflect.Type) (string, string) {
	pkgPath := r.PkgPath()
	name := r.Name()
	parts := strings.Split(pkgPath, "/")
	pkg := parts[len(parts)-1]
	return pkg, pkg + "." + name
}

func (f *Func) Generate() string {
	src := fmt.Sprintf(`func (q *PluginQuery) %s(ctx context.Context, args %s) (%s, error) {
	before(%s, ctx, args)
	result, err := q.query.%s(ctx, args)
	if err != nil {
		return result, err
	}
	after(%s, ctx, args, result)
	return result, err
}`,
		f.name,
		f.arg,
		f.ret,
		strconv.Quote(f.name),
		f.name,
		strconv.Quote(f.name),
	)
	return src
}
