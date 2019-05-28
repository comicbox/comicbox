package main

import (
	"github.com/comicbox/comicbox/comicboxd/app/model"
	"github.com/comicbox/comicbox/plugin"
	"github.com/davecgh/go-spew/spew"
)

func main() {
	p := plugin.New(plugin.Config{
		Name: "Test Plugin",
	})

	p.OnBookChange(func(book *model.Book) error {
		spew.Dump(book)
		return nil
	})
	p.Start()
}
