package scalar

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/Masterminds/squirrel"
)

type Regex string

func (Regex) ImplementsGraphQLType(name string) bool {
	return name == "Regex"
}

func (r *Regex) UnmarshalGraphQL(input interface{}) error {
	var err error
	switch input := input.(type) {
	case string:
		*r = Regex(input)
	default:
		err = errors.New("wrong type")
	}
	return err
}

func (r Regex) MarshalJSON() ([]byte, error) {
	return strconv.AppendQuote(nil, string(r)), nil
}

func (r Regex) Query(query squirrel.SelectBuilder, name string) squirrel.SelectBuilder {
	return query.Where(fmt.Sprintf("%s regexp ?", name), string(r))
}
