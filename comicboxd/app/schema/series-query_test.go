package schema

import (
	"fmt"
	"testing"

	"github.com/bradleyjkemp/cupaloy"

	"github.com/stretchr/testify/assert"
)

func TestSerie(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	insertTestBooks()

	tests := map[string]struct {
		name string
		err  error
	}{
		"s1": {
			"s1",
			nil,
		},
		"bad name": {
			"bad name",
			nil,
		},
	}
	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			r, err := userQuery().Serie(SerieArgs{Name: test.name})
			if test.err != nil {
				assert.EqualError(t, err, test.err.Error())
				return
			}
			assert.NoError(t, err)
			if r == nil {
				cupaloy.SnapshotT(t, r)
				return
			}

			books, err := r.Books(userCtx(), BooksArgs{})
			assert.NoError(t, err)
			results, err := books.Results()
			assert.NoError(t, err)
			total, err := books.Total()
			assert.NoError(t, err)

			cupaloy.SnapshotT(t, r, results, total)

		})
	}
}

func TestSeries(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	insertTestBooks()

	tests := map[string]struct {
		args SeriesArgs
		err  error
	}{
		"all": {
			SeriesArgs{
				Take: 100,
			},
			nil,
		},
		"take 101": {
			SeriesArgs{
				Take: 101,
			},
			fmt.Errorf("you must take between 0 and 100 items"),
		},
		"take -1": {
			SeriesArgs{
				Take: -1,
			},
			fmt.Errorf("you must take between 0 and 100 items"),
		},
		"skip 1": {
			SeriesArgs{
				Take: 100,
				Skip: intptr(1),
			},
			nil,
		},
		"no results": {
			SeriesArgs{
				Take: 100,
				Name: regexptr("^this series should not exist$"),
			},
			nil,
		},
	}
	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			r, err := userQuery().Series(test.args)

			if test.err != nil {
				assert.EqualError(t, err, test.err.Error())
				return
			}

			assert.NoError(t, err)

			total, err := r.Total()
			assert.NoError(t, err)

			results, err := r.Results()
			assert.NoError(t, err)

			cupaloy.SnapshotT(t, results, total)
		})
	}
}
