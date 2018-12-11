package scalar

import (
	"errors"
	"strconv"
)

type NumberRange string

func (NumberRange) ImplementsGraphQLType(name string) bool {
	return name == "NumberRange"
}

func (id *NumberRange) UnmarshalGraphQL(input interface{}) error {
	var err error
	switch input := input.(type) {
	case string:
		*id = NumberRange(input)
	default:
		err = errors.New("wrong type")
	}
	return err
}

func (id NumberRange) MarshalJSON() ([]byte, error) {
	return strconv.AppendQuote(nil, string(id)), nil
}
