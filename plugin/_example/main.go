package main

import (
	"context"

	"github.com/comicbox/comicbox/comicboxd/app/schema"
	"github.com/comicbox/comicbox/plugin"
	"github.com/davecgh/go-spew/spew"
)

type Book struct {
	Series    string `json:"series"`
	PageCount int32  `json:"page_count"`
}

type Series struct {
	Tags []string `json:"tags"`
}

func main() {
	plugin.Start(&plugin.Plugin{
		UpdateBook: func(ctx context.Context, extras map[string]string, args schema.UpdateBookArgs) error {
			b := &Book{}

			err := plugin.Query(ctx, b, `query($bookID: ID!) {
				book(id: $bookID){
					series
					page_count
				}
			}`, map[string]interface{}{
				"bookID": args.ID,
			})
			if err != nil {
				return err
			}

			spew.Dump(args.Data.CurrentPage, b.PageCount)
			if args.Data.CurrentPage != nil && *args.Data.CurrentPage >= b.PageCount-1 {
				s := &Series{}
				err = plugin.Query(ctx, s, `query($name: String!) {
					serie(name: $name){
						tags
					}
				}`, map[string]interface{}{
					"name": b.Series,
				})
				if err != nil {
					return err
				}

				spew.Dump(s)
			}
			return nil
		},
	})
}
