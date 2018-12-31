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

	fixStart := false
	fixEnd := false
	if strings.HasPrefix(tmpRegex, "^") {
		tmpRegex = tmpRegex[1:]
		fixStart = true
	}
	if strings.HasSuffix(tmpRegex, "$") {
		tmpRegex = tmpRegex[:len(tmpRegex)-1]
		fixEnd = true
	}

	text := ""
	lastChar := rune(0)
	// loop through the regex to see if it has any fancy regex stuff in it
	for _, c := range tmpRegex {
		if strings.IndexRune(`[^$.|?*+()`, c) != -1 {
			if lastChar != '\\' {
				return query.Where(fmt.Sprintf("%s regexp ?", name), regex)
			}
			text += string(c)
		} else if c != '\\' {
			text += string(c)
		}
		lastChar = c
	}

	if !fixStart {
		text = "%" + text
	}
	if !fixEnd {
		text = text + "%"
	}
	return query.Where(fmt.Sprintf("%s like ?", name), text)
}
