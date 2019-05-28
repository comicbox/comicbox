package plugin

import (
	"encoding/json"
	"os"

	"github.com/comicbox/comicbox/comicboxd/app/model"
)

type Config struct {
	Name string
}

type config struct {
	Config
	Available []string
}

type Plugin struct {
	cfg         *config
	onBookQuery func(book *model.BookUserBook) error
}

func New(cfg Config) *Plugin {
	return &Plugin{
		cfg: &config{
			Config:    cfg,
			Available: []string{},
		},
	}
}

func (p *Plugin) OnBookQuery(cb func(book *model.BookUserBook) error) {
	p.onBookQuery = cb
	p.cfg.Available = append(p.cfg.Available, "OnBookQuery")
}

func (p *Plugin) Start() {
	out := json.NewEncoder(os.Stdout)
	in := json.NewDecoder(os.Stdin)
	c := &PluginCall{}
	err := in.Decode(c)
	if err != nil {
		panic(err)
	}
	if c.Name == "Config" {
		err = out.Encode(p.cfg)
		if err != nil {
			panic(err)
		}
		return
	}
	if c.Name == "OnBookQuery" {
		b := &model.BookUserBook{}
		err = in.Decode(b)
		if err != nil {
			panic(err)
		}
		err = p.onBookQuery(b)
		if err != nil {
			panic(err)
		}
		out.Encode(p.cfg)
		return
	}
}
