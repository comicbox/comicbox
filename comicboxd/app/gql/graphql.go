package gql

import (
	"fmt"

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
