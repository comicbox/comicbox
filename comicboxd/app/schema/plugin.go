package schema

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"os/exec"

	"github.com/comicbox/comicbox/comicboxd/app"
	"github.com/comicbox/comicbox/comicboxd/app/middleware"
	"github.com/comicbox/comicbox/comicboxd/j"
	"github.com/spf13/viper"
)

type Request struct {
	Name   string
	Args   json.RawMessage
	Extras map[string]string
	Host   string
	Auth   string
}

type Plugin struct {
	Name    string            `mapstructure:"name"`
	Address string            `mapstructure:"address"`
	Command []string          `mapstructure:"command"`
	Extras  map[string]string `mapstructure:"extras"`
}
type Config struct {
	Plugins []*Plugin `mapstructure:"plugins"`
}

var plugins = []*Plugin{}

func after(name string, ctx context.Context, args interface{}, result interface{}) {
	bArgs, err := json.Marshal(args)
	if err != nil {
		return
	}
	c := ctx.Value(appCtx).(*app.Context)

	key := middleware.NewTempKey(c.User)
	defer middleware.ClearTempKey(key)

	for _, p := range plugins {
		r := &Request{
			Name:   name,
			Args:   bArgs,
			Extras: p.Extras,
			Host:   c.Host(),
			Auth:   key,
		}

		b, err := json.Marshal(r)
		if err != nil {
			j.Errorf("failed to marshal plugin request: %v", err)
			return
		}
		_, err = http.Post(p.Address, "text/json", bytes.NewReader(b))
		if err != nil {
			j.Errorf("could not run plugin %s: %v", p.Name, err)
			return
		}
	}
}

func StartPlugins() {
	c := &Config{}

	viper.Unmarshal(c)
	plugins = c.Plugins
	for _, p := range c.Plugins {
		if p.Command != nil {
			go func(p *Plugin) {
				j.Infof("start plugin %s", p.Name)
				c := exec.Command(p.Command[0], p.Command[1:]...)

				out, err := c.StdoutPipe()
				if err != nil {
					j.Error(err)
					return
				}
				e, err := c.StderrPipe()
				if err != nil {
					j.Error(err)
					return
				}
				go func() {
					berr := bufio.NewReader(e)
					for {
						line, err := berr.ReadString('\n')
						if err != nil {
							j.Error(err)
							return
						}
						j.Errorf("%s: %s", p.Name, line)
					}
				}()
				go func() {
					bout := bufio.NewReader(out)
					for {
						line, err := bout.ReadString('\n')
						if err != nil {
							j.Error(err)
							return
						}
						j.Infof("%s: %s", p.Name, line)
					}
				}()

				err = c.Start()
				if err != nil {
					j.Error(err)
					return
				}
			}(p)
		}
	}

}
