package model

import (
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/google/uuid"
)

type Model struct {
	ID        uuid.UUID `json:"id"                db:"id"`
	CreatedAt time.Time `json:"created_at"        db:"created_at"`
	UpdatedAt time.Time `json:"updated_at"        db:"updated_at"`
}

func InsertSQL(table string, model interface{}) string {
	t := reflect.TypeOf(model)
	valNames := []string{}
	names := []string{}

	for _, name := range getTags(t, "db") {
		if name == "id" || name == "created_at" || name == "updated_at" {
			continue
		}
		names = append(names, name)
		valNames = append(valNames, ":"+name)
	}

	return fmt.Sprintf("insert into %s (%s) values (%s)", table, strings.Join(names, ", "), strings.Join(valNames, ", "))
}

func UpdateSQL(table string, model interface{}) string {
	t := reflect.TypeOf(model)
	names := []string{}
	for _, name := range getTags(t, "db") {
		if name == "id" || name == "created_at" || name == "updated_at" {
			continue
		}
		names = append(names, fmt.Sprintf("%s=:%s", name, name))
	}

	return fmt.Sprintf("update %s set %s where id=:id", table, strings.Join(names, ", "))
}

func GetTags(v interface{}, tag string) []string {
	t := reflect.TypeOf(v)

	return getTags(t, tag)
}

func getTags(t reflect.Type, tag string) []string {
	tags := []string{}

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		if field.Type.Kind() == reflect.Struct && field.Anonymous {
			tags = append(tags, getTags(field.Type, tag)...)
			continue
		}

		tag, ok := field.Tag.Lookup(tag)
		if ok && tag != "-" {
			tags = append(tags, tag)
		}
	}
	return tags
}
