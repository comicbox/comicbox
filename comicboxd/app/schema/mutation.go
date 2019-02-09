package schema

import (
	"encoding/json"
	"fmt"
	"reflect"

	"github.com/Masterminds/squirrel"
)

var (
	// ErrorUnauthenticated will be returned on endpoints that you cant view unless you are authenticated
	ErrorUnauthenticated = fmt.Errorf("unauthenticated users may not complete this action")
)

func update(m map[string]interface{}, query squirrel.UpdateBuilder) squirrel.UpdateBuilder {
	for col, val := range m {
		query = query.Set(col, val)
	}

	return query
}

func toStruct(arg interface{}) map[string]interface{} {
	m := map[string]interface{}{}

	v := reflect.ValueOf(arg)
	t := v.Type()
	for i := 0; i < v.NumField(); i++ {
		vField := v.Field(i)
		tField := t.Field(i)

		tag, ok := tField.Tag.Lookup("db")
		if !ok || tag == "-" {
			continue
		}

		if vField.Kind() == reflect.Ptr {
			if vField.IsNil() {
				continue
			}
			vField = vField.Elem()
		}

		m[tag] = vField.Interface()
	}

	return m
}

func makeJSON(m map[string]interface{}) (map[string]interface{}, error) {
	for col, val := range m {
		field := reflect.ValueOf(val)
		if field.Kind() == reflect.Slice || field.Kind() == reflect.Struct {
			b, err := json.Marshal(val)
			if err != nil {
				return nil, fmt.Errorf("ToStruct: %v", err)
			}
			m[col] = string(b)
		}
	}
	return m, nil
}
