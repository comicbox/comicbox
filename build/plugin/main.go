package main

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/comicbox/comicbox/comicboxd/app/schema"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	fooType := reflect.TypeOf(&schema.RootQuery{})
	for i := 0; i < fooType.NumMethod(); i++ {
		method := fooType.Method(i)

		fmt.Println(NewFunc(method).Before())
		// fmt.Println(method.Name)
		// spew.Dump(method.Func.Type().NumIn())
	}
}

type Func struct {
	name    string
	args    []reflect.Type
	returns []reflect.Type
}

func NewFunc(method reflect.Method) *Func {
	x := method.Type

	f := &Func{}
	f.name = method.Name
	for i := 1; i < x.NumIn(); i++ {
		arg := x.In(i)

		if arg.PkgPath() == "context" && arg.Name() == "Context" {
		} else {
			f.args = append(f.args, arg)
		}

	}
	for i := 1; i < x.NumOut(); i++ {
		arg := x.Out(i)

		if arg.PkgPath() == "" && arg.Name() == "error" {
		} else {
			f.args = append(f.args, arg)
		}

	}

	return f
}

func name(r reflect.Type) (string, string) {
	pkgPath := r.PkgPath()
	name := r.Name()
	parts := strings.Split(pkgPath, "/")
	pkg := parts[len(parts)-1]
	return pkg, pkg + "." + name
}

func (f *Func) Before() string {
	src := fmt.Sprintf("func Before%s(%s)", f.name, "")
	return src
}
