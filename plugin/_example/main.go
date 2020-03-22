package main

import (
	"context"

	"github.com/comicbox/comicbox/comicboxd/app/schema"
	"github.com/comicbox/comicbox/plugin"
)

func main() {
	plugin.Start(&plugin.Plugin{
		UpdateBook: func(ctx context.Context, extras map[string]string, args schema.UpdateBookArgs) error {
			// books, err := resolver.Results()
			// spew.Dump(args)
			plugin.Query(ctx)
			// books[0].
			return nil
		},
	})
}
