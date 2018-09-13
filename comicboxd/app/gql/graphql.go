package gql

import (
	"fmt"
	"reflect"
	"time"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"github.com/fatih/structs"
	"github.com/graphql-go/graphql"
)

type Page struct {
	Total int `json:"total"`
	Skip  int `json:"skip"`
	Take  int `json:"take"`
}

var PageInfoType = graphql.NewObject(graphql.ObjectConfig{
	Name: "page_info",
	Fields: graphql.Fields{
		"total": &graphql.Field{
			Type: graphql.Int,
		},
		"skip": &graphql.Field{
			Type: graphql.Int,
		},
		"take": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

func ResolveVal(name string) graphql.FieldResolveFn {
	return func(p graphql.ResolveParams) (interface{}, error) {
		val, ok := getValue(p.Source, name)
		if !ok {
			return nil, fmt.Errorf("field not in struct")
		}
		return val, nil
	}
}

func getValue(v interface{}, name string) (interface{}, bool) {

	s := structs.New(v)

	for _, field := range s.Fields() {
		if field.IsEmbedded() {
			val, ok := getValue(field.Value(), name)
			if ok {
				return val, true
			}
		} else {
			if field.Name() == name {
				return field.Value(), true
			}
		}
	}
	return nil, false
}

func Ctx(p graphql.ResolveParams) *app.Context {
	return p.Info.RootValue.(map[string]interface{})["context"].(*app.Context)
}

func ToSQL(model interface{}, args map[string]interface{}) (string, []interface{}) {
	var where string
	query := ""
	data := []interface{}{}

	// wheres := []string{}

	for name, val := range args {
		switch name {
		case "skip", "take":
		default:
			where = fmt.Sprintf("%s=?", name)
			// wheres = append(wheres, where)
			query += " and " + where
			data = append(data, val)
		}
	}

	// query += strings.Join(wheres, " and ")
	query += " COLLATE NOCASE"
	return query, data
}

func MutationArgs(model interface{}, args graphql.FieldConfigArgument) graphql.FieldConfigArgument {
	var fieldType graphql.Type
	var val interface{}

	v := reflect.ValueOf(model)
	t := v.Type()

	fields := graphql.FieldConfigArgument{}

	for i := 0; i < t.NumField(); i++ {
		val = v.Field(i).Interface()
		field := t.Field(i)
		if field.Type.Kind() == reflect.Struct && field.Anonymous {
			subFields := MutationArgs(val, graphql.FieldConfigArgument{})
			for name, field := range subFields {
				fields[name] = field
			}
			continue
		}

		tag, ok := field.Tag.Lookup("db")
		if ok && tag != "-" {
			switch val.(type) {
			case string, *string:
				fieldType = graphql.String
			case int, int64, int32, int16, int8,
				*int, *int64, *int32, *int16, *int8:
				fieldType = graphql.Int
			case float32, float64, *float32, *float64:
				fieldType = graphql.Float
			case time.Time, *time.Time:
				fieldType = graphql.DateTime
			}

			if fieldType != nil {
				fields[tag] = &graphql.ArgumentConfig{
					Type: fieldType,
				}
			}
		}
	}

	for name, field := range args {
		fields[name] = field
	}

	return fields
}
