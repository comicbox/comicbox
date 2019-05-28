package plugin

import (
	"encoding/json"

	"github.com/comicbox/comicbox/comicboxd/app/model"
)

var plugins map[string]*Plugin

type PluginCall struct {
	Name string
	Data json.RawMessage
}

func Register(file string) error {
	plugins[file] = nil
	return nil
}

func BookQuery(book *model.BookUserBook) error {

	return nil
}
