package scalar

import (
	"reflect"

	graphql "github.com/graph-gophers/graphql-go"

	"github.com/Masterminds/squirrel"
)

type Querier interface {
	Query(query squirrel.SelectBuilder, name string) squirrel.SelectBuilder
}

func Query(query squirrel.SelectBuilder, args interface{}) squirrel.SelectBuilder {
	v := reflect.ValueOf(args)
	t := v.Type()
	for i := 0; i < v.NumField(); i++ {
		vField := v.Field(i)
		tField := t.Field(i)

		tag, ok := tField.Tag.Lookup("db")
		if !ok || tag == "-" || vField.IsNil() {
			continue
		}

		switch value := vField.Interface().(type) {
		case Querier:
			query = value.Query(query, tag)
		case bool, graphql.ID:
			query = query.Where(squirrel.Eq{tag: value})
		case *bool, *graphql.ID:
			if value != nil {
				query = query.Where(squirrel.Eq{tag: value})
			}
		}
	}
	return query
}
