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
	name string

	context bool
	arg     string

	err bool
	ret string
}

func NewFunc(method reflect.Method) *Func {
	x := method.Type

	f := &Func{}
	f.name = method.Name
	for i := 0; i < x.NumIn(); i++ {
		arg := x.In(i)

		if arg.PkgPath() == "context" && arg.Name() == "Context" {
			f.context = true
		} else {
			f.arg = Type(arg)
		}
	}

	for i := 0; i < x.NumOut(); i++ {
		arg := x.Out(i)
		if arg.PkgPath() == "" && arg.Name() == "error" {
			f.err = true
		} else {
			f.ret = Type(arg)
		}
	}

	return f
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

func (f *Func) Before() string {
	args := []string{}
	if f.context {
		args = append(args, "ctx context.Context")
	}
	args = append(args, "data "+f.arg)

	rets := []string{}
	rets = append(rets, f.ret)
	if f.err {
		rets = append(rets, "error")
	}
	src := fmt.Sprintf(`func Before%s(cb func(%s) (%s)) {
	
	return 
}`, f.name, strings.Join(args, ", "), strings.Join(rets, ", "))
	return src
}
