package scalar

import (
	"errors"
	"strconv"
)

type Regex string

func (Regex) ImplementsGraphQLType(name string) bool {
	return name == "Regex"
}

func (id *Regex) UnmarshalGraphQL(input interface{}) error {
	var err error
	switch input := input.(type) {
	case string:
		*id = Regex(input)
	default:
		err = errors.New("wrong type")
	}
	return err
}

func (id Regex) MarshalJSON() ([]byte, error) {
	return strconv.AppendQuote(nil, string(id)), nil
}
