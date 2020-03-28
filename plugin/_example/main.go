package main

import (
	"context"

	"github.com/comicbox/comicbox/comicboxd/app/schema"
	"github.com/comicbox/comicbox/plugin"
	"github.com/davecgh/go-spew/spew"
)

func main() {
	plugin.Start(&plugin.Plugin{
		UpdateBook: func(ctx context.Context, extras map[string]string, args schema.UpdateBookArgs) error {
			// books, err := resolver.Results()
			spew.Dump(args.Data.CurrentPage)
			plugin.Query(ctx, `query($bookID: ID!) {
				book(id: $bookID){
					series
					page_count
				}
			}`, map[string]interface{}{
				"bookID": args.ID,
			})
			// books[0].
			return nil
		},
	})
}
