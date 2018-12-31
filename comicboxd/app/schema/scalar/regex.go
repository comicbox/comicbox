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

	tmpRegex := regex

	// check if you need wildcards at the begining or end of the query
	fixStart := false
	fixEnd := false
	if strings.HasPrefix(tmpRegex, "^") {
		// remove the ^ from the begining of the regex
		tmpRegex = tmpRegex[1:]
		fixStart = true
	}
	if strings.HasSuffix(tmpRegex, "$") {
		// remove the $ from the end of the regex
		tmpRegex = tmpRegex[:len(tmpRegex)-1]
		fixEnd = true
	}

	text := ""
	escaped := false
	// loop through the regex to see if it has any fancy regex stuff in it
	for _, c := range tmpRegex {
		// if the character is a special character check if the last character was an escape
		if strings.IndexRune(`[\^$.|?*+()`, c) != -1 {
			// if the last character wasn't an escape and this one is a backslash move to the next character
			if !escaped && c == '\\' {
				escaped = true
				continue
			}
			// if the last character wasn't an escape and this one is a spacial character you need to run the regex
			// query
			if !escaped {
				return query.Where(fmt.Sprintf("%s regexp ?", name), regex)
			}
		}

		text += string(c)
		escaped = false
	}

	if !fixStart {
		text = "%" + text
	}
	if !fixEnd {
		text = text + "%"
	}
	return query.Where(fmt.Sprintf("%s like ?", name), text)
}
