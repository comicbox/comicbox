package schema

import (
	"encoding/json"
	"fmt"
	"reflect"
	"sync"

	"github.com/Masterminds/squirrel"
	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/j"
)

const SQLTimeFormat = "2006-01-02 15:04:05"

var (
	// ErrorUnauthenticated will be returned on endpoints that you cant view unless you are authenticated
	ErrorUnauthenticated = fmt.Errorf("unauthenticated users may not complete this action")
	change               = 0
	changeMtx            = &sync.Mutex{}
)

func nextChange() int {
	changeMtx.Lock()
	defer changeMtx.Unlock()
	if change == 0 {
		c := 0
		err := database.Get(&c, `select "change" from "change"`)
		if err != nil {
			j.Errorf("failed to get max change: %v", err)
		}
		change = c
	}
	change++
	return change
}

func update(m map[string]interface{}, query squirrel.UpdateBuilder) squirrel.UpdateBuilder {
	for col, val := range m {
		query = query.Set(col, val)
	}

	query = query.Set("change", nextChange())
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
