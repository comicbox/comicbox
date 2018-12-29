package scalar

import (
	"errors"
	"fmt"
	"strconv"
	"strings"

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
	regex := string(r)

	// checking for exact equals and != "" makes things much faster
	if regex == ".+" {
		return query.Where(fmt.Sprintf("%s != \"\"", name))
	}
	subre := regex[1 : len(regex)-1]
	if strings.HasPrefix(regex, "^") && strings.HasSuffix(regex, "$") && strings.IndexAny(subre, `[\^$.|?*+()`) == -1 {
		return query.Where(fmt.Sprintf("%s = ?", name), subre)
	}

	return query.Where(fmt.Sprintf("%s regexp ?", name), regex)
}
