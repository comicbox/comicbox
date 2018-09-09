package model

import (
	"fmt"
	"reflect"
	"strings"
	"time"
)

type Model struct {
	ID        int64     `json:"id"                db:"id"`
	CreatedAt time.Time `json:"created_at"        db:"created_at"`
	UpdatedAt time.Time `json:"updated_at"        db:"updated_at"`
}

func InsertSQL(table string, model interface{}) string {
	t := reflect.TypeOf(model)
	valNames := []string{}
	names := []string{}

	for _, name := range getTags(t) {
		if name == "id" || name == "created_at" || name == "updated_at" {
			continue
		}
		names = append(names, name)
		valNames = append(valNames, ":"+name)
	}

	return fmt.Sprintf("insert into %s (%s) values (%s)", table, strings.Join(names, ", "), strings.Join(valNames, ", "))
}

func getTags(t reflect.Type) []string {
	tags := []string{}
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		if field.Type.Kind() == reflect.Struct && field.Anonymous {
			tags = append(tags, getTags(field.Type)...)
			continue
		}

		tag, ok := field.Tag.Lookup("db")
		if ok {
			tags = append(tags, tag)
		}
	}
	return tags
}
