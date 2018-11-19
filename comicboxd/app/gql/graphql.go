package gql

import (
	"database/sql"
	"fmt"
	"reflect"
	"strings"
	"time"

	sq "github.com/Masterminds/squirrel"
	"github.com/abibby/comicbox/comicboxd/app"
	"github.com/abibby/comicbox/comicboxd/app/model"
	"github.com/fatih/structs"
	"github.com/google/uuid"
	"github.com/graphql-go/graphql"
	"github.com/jmoiron/sqlx"
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

func Args(query sq.SelectBuilder, m interface{}, args map[string]interface{}) sq.SelectBuilder {

	for name, val := range args {
		switch name {
		case "skip", "take":
		case "sort":
			allCols := model.GetTags(m, "db")
			for _, col := range strings.Split(val.(string), ",") {
				col = strings.TrimSpace(col)
				desc := ""
				if col[0] == '!' {
					desc = " desc"
					col = col[1:]
				}
				for _, modelCol := range allCols {
					if modelCol == col {
						query = query.OrderBy(fmt.Sprintf("%s%s", col, desc))
						break
					}
				}
			}
		case "search":
			exprs := []sq.Sqlizer{}
			// for _, tag := range model.GetTags(m, "db") {
			// 	exprs = append(exprs, sq.Expr(fmt.Sprintf("%s like ?", tag), fmt.Sprint("%", val, "%")))
			// }
			for name := range QueryArgs(m, nil) {
				if strings.HasSuffix(name, "_co") {
					exprs = append(exprs, sq.Expr(fmt.Sprintf("%s like ?", name[:len(name)-3]), fmt.Sprint("%", val, "%")))
				}
			}
			query = query.Where(sq.Or(exprs))
		default:
			parts := strings.Split(name, "_")
			subName := ""
			if len(parts) > 1 {
				subName = strings.Join(parts[:len(parts)-1], "_")
			}
			switch parts[len(parts)-1] {
			case "lt":
				query = query.Where(sq.Lt{subName: val})
			case "gt":
				query = query.Where(sq.Gt{subName: val})
			case "ne":
				query = query.Where(sq.NotEq{subName: val})
			case "sw":
				query = query.Where(sq.Expr(fmt.Sprintf("%s like ?", subName), fmt.Sprint(val, "%")))
			case "ew":
				query = query.Where(sq.Expr(fmt.Sprintf("%s like ?", subName), fmt.Sprint("%", val)))
			case "co":
				query = query.Where(sq.Expr(fmt.Sprintf("%s like ?", subName), fmt.Sprint("%", val, "%")))
			default:
				query = query.Where(sq.Eq{name: val})
			}
		}
	}
	return query
}

func QueryArgs(model interface{}, args graphql.FieldConfigArgument) graphql.FieldConfigArgument {
	var fieldType graphql.Type
	var val interface{}

	v := reflect.ValueOf(model)
	t := v.Type()

	fields := graphql.FieldConfigArgument{}

	for i := 0; i < t.NumField(); i++ {
		val = v.Field(i).Interface()
		field := t.Field(i)
		if field.Type.Kind() == reflect.Struct && field.Anonymous {
			subFields := QueryArgs(val, graphql.FieldConfigArgument{})
			for name, field := range subFields {
				fields[name] = field
			}
			continue
		}

		str := false
		numeric := false
		boolean := false

		tag, ok := field.Tag.Lookup("db")
		if ok && tag != "-" {
			switch val.(type) {
			case string, *string:
				fieldType = graphql.String
				str = true

			case int, int64, int32, int16, int8, *int, *int64, *int32, *int16, *int8:
				fieldType = graphql.Int
				numeric = true

			case float32, float64, *float32, *float64:
				fieldType = graphql.Float
				numeric = true

			case time.Time, *time.Time:
				fieldType = graphql.DateTime
				numeric = true

			case bool, *bool:
				fieldType = graphql.Boolean
				boolean = true

			case uuid.UUID, *uuid.UUID:
				fieldType = graphql.ID

			}

			if fieldType != nil {
				fields[tag] = &graphql.ArgumentConfig{
					Type: fieldType,
				}
				if !boolean {
					fields[tag+"_ne"] = &graphql.ArgumentConfig{
						Type: fieldType,
					}
				}
				if str {
					fields[tag+"_sw"] = &graphql.ArgumentConfig{
						Type: fieldType,
					}
					fields[tag+"_ew"] = &graphql.ArgumentConfig{
						Type: fieldType,
					}
					fields[tag+"_co"] = &graphql.ArgumentConfig{
						Type: fieldType,
					}
				}
				if numeric {
					fields[tag+"_lt"] = &graphql.ArgumentConfig{
						Type: fieldType,
					}
					fields[tag+"_gt"] = &graphql.ArgumentConfig{
						Type: fieldType,
					}
				}
			}
		}
	}

	fields["search"] = &graphql.ArgumentConfig{
		Type: graphql.String,
	}
	fields["sort"] = &graphql.ArgumentConfig{
		Type: graphql.String,
	}

	if args != nil {
		for name, field := range args {
			fields[name] = field
		}
	}

	return fields
}

func Update(db *sqlx.DB, table string, m, arg interface{}, primaryCols map[string]interface{}) (sql.Result, error) {
	modelMap, ok := arg.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("The arg parameter must be a map[string]interface{}")
	}
	cols := model.GetTags(m, "db")

	updates := []string{}
	data := []interface{}{}

	for _, col := range cols {
		value, ok := modelMap[col]
		if !ok {
			continue
		}

		updates = append(updates, fmt.Sprintf("%s=?", col))
		data = append(data, value)
	}

	wheres := []string{}
	for col, value := range primaryCols {
		wheres = append(wheres, fmt.Sprintf("%s=?", col))
		data = append(data, value)
	}

	query := fmt.Sprintf("update %s set %s where %s", table, strings.Join(updates, ", "), strings.Join(wheres, " and "))

	return db.Exec(query, data...)
}

func Insert(db *sqlx.DB, table string, m, arg interface{}, primaryCols map[string]interface{}) (sql.Result, error) {
	modelMap, ok := arg.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("The arg parameter must be a map[string]interface{}")
	}
	cols := model.GetTags(m, "db")

	changedCols := []string{}
	questions := []string{}
	data := []interface{}{}

	for _, col := range cols {
		value, ok := modelMap[col]
		if !ok {
			continue
		}

		changedCols = append(changedCols, col)
		questions = append(questions, "?")
		data = append(data, value)
	}

	for col, value := range primaryCols {
		changedCols = append(changedCols, col)
		questions = append(questions, "?")
		data = append(data, value)
	}

	query := fmt.Sprintf("insert into %s (%s) values (%s)", table, strings.Join(changedCols, ", "), strings.Join(questions, ", "))

	return db.Exec(query, data...)
}

func InsertOrUpdate(db *sqlx.DB, table string, m, arg interface{}, primaryCols map[string]interface{}) error {

	r, err := Update(db, table, m, arg, primaryCols)
	if err != nil {
		return err
	}

	rows, err := r.RowsAffected()
	if err != nil {
		return err
	}

	if rows == 0 {
		_, err := Insert(db, table, m, arg, primaryCols)
		if err != nil {
			return err
		}
	}

	return nil
}
