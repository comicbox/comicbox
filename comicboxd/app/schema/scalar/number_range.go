package scalar

import (
	"errors"
	"fmt"
	"regexp"
	"strconv"

	"github.com/Masterminds/squirrel"
)

type NumberRange struct {
	minEqual bool
	min      *float64
	max      *float64
	maxEqual bool
}

func (NumberRange) ImplementsGraphQLType(name string) bool {
	return name == "NumberRange"
}

func (n *NumberRange) UnmarshalGraphQL(input interface{}) error {
	var err error
	switch input := input.(type) {
	case string:

		parts := regexp.MustCompile(`^(\[|\()(\d*(\.\d+)?):(\d*(\.\d+)?)(\]|\))$`).FindStringSubmatch(input)
		if len(parts) < 5 {
			return fmt.Errorf("'%s' is not a valid NumberRange", input)
		}
		*n = NumberRange{}

		n.minEqual = parts[1] == "["
		if parts[2] == "" {
			n.min = nil
		} else {
			min, err := strconv.ParseFloat(parts[2], 64)
			if err != nil {
				return err
			}
			n.min = &min
		}
		if parts[4] == "" {
			n.max = nil
		} else {
			max, err := strconv.ParseFloat(parts[4], 64)
			if err != nil {
				return err
			}
			n.max = &max
		}

		n.maxEqual = parts[6] == "]"
	default:
		err = errors.New("wrong type")
	}
	return err
}

func (n NumberRange) MarshalJSON() ([]byte, error) {
	return strconv.AppendQuote(nil, n.String()), nil
}

func (n NumberRange) Query(query squirrel.SelectBuilder, name string) squirrel.SelectBuilder {
	if n.min != nil {
		if n.minEqual {
			query = query.Where(squirrel.GtOrEq{name: n.min})
		} else {
			query = query.Where(squirrel.Gt{name: n.min})
		}
	}
	if n.max != nil {
		if n.maxEqual {
			query = query.Where(squirrel.LtOrEq{name: n.max})
		} else {
			query = query.Where(squirrel.Lt{name: n.max})
		}
	}
	return query
}
func (n NumberRange) String() string {
	s := ""
	if n.minEqual {
		s += "["
	} else {
		s += "("
	}

	if n.min != nil {
		s += fmt.Sprint(*n.min)
	}
	s += ":"
	if n.max != nil {
		s += fmt.Sprint(*n.max)
	}

	if n.maxEqual {
		s += "]"
	} else {
		s += ")"
	}
	return s
}
