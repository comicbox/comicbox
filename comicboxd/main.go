package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/comicbox/comicbox/comicboxd/app/routes"
	"github.com/comicbox/comicbox/comicboxd/j"
	"github.com/comicbox/comicbox/comicboxd/server"
	figure "github.com/common-nighthawk/go-figure"
	"github.com/kardianos/service"
	homedir "github.com/mitchellh/go-homedir"
	"github.com/spf13/viper"
)

var logger service.Logger

type program struct {
	server *server.Server
}

func (p *program) Start(s service.Service) error {
	// Start should not block. Do the actual work async.
	go p.run()
	return nil
}
func (p *program) run() {
	var err error
	p.server, err = server.New()
	if err != nil {
		j.Errorf("error starting server: %v", err)
		os.Exit(1)
	}

	routes.Web(p.server)

	err = p.server.Start()
	if err != nil {
		j.Errorf("error starting server: %v", err)
		os.Exit(1)
	}
}
func (p *program) Stop(s service.Service) error {
	return p.server.Stop()
}

// initConfig reads in config file and ENV variables if set.
func init() {
	var cfgFile string

	flag.StringVar(&cfgFile, "config", "", "config file (default is $HOME/.comicbox.yml)")

	flag.Parse()
	if cfgFile != "" {
		viper.SetConfigFile(cfgFile)
	} else {
		viper.AddConfigPath(filepath.Join(home(), ".comicbox"))
		viper.AddConfigPath("/etc/comicbox/")
		viper.AddConfigPath(".")
		viper.SetConfigName("config")
	}

	viper.SetDefault("http-port", 8080)
	viper.SetDefault("https-port", 8081)

	viper.SetDefault("dir", filepath.Join(home(), "comics"))
	viper.SetDefault("db", filepath.Join(home(), ".comicbox", "database.sqlite"))

	viper.SetDefault("https", false)
	viper.SetDefault("tls-cert", filepath.Join(home(), ".comicbox", "certs", "cert.pem"))
	viper.SetDefault("tls-key", filepath.Join(home(), ".comicbox", "certs", "key.pem"))

	viper.SetDefault("guests", false)

	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}
}

func home() string {

	// Find home directory.
	home, err := homedir.Dir()
	if err != nil {
		j.Error(err)
		os.Exit(1)
	}
	return home
}

func main() {

	svcConfig := &service.Config{
		Name:        "comicboxd",
		DisplayName: "ComicBox",
		Description: "A simple comic book server for local files",
	}

	prg := &program{}
	s, err := service.New(prg, svcConfig)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println()
	figure.NewFigure("ComicBox", "colossal", true).Print()
	fmt.Println()

	logger, err = s.Logger(nil)
	if err != nil {
		log.Fatal(err)
	}
	j.SetLogger(logger)

	err = s.Run()
	if err != nil {
		logger.Error(err)
	}
}
