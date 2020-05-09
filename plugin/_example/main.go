package main

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"os/exec"
	"text/template"

	"github.com/comicbox/comicbox/comicboxd/app/schema"
	"github.com/comicbox/comicbox/plugin"
	"github.com/pkg/errors"
)

func main() {

	plugin.Start(2345, &plugin.Plugin{
		UpdateBook: func(ctx context.Context, extras map[string]string, args schema.UpdateBookArgs) error {
			cmd, ok := extras["command"]
			if !ok {
				return fmt.Errorf("command is not set")
			}

			t, err := template.New("command").Parse(cmd)
			if err != nil {
				return errors.Wrap(err, "command failed to parse")
			}

			prepedCmd := bytes.NewBuffer([]byte{})
			err = t.Execute(prepedCmd, args)
			if err != nil {
				return errors.Wrap(err, "failed prepare command")
			}

			b, err := exec.Command("bash", "-c", prepedCmd.String()).CombinedOutput()
			if err != nil {
				os.Stderr.Write(b)
				return errors.Wrap(err, "command failed")
			}
			os.Stdout.Write(b)
			return nil
		},
	})
}
