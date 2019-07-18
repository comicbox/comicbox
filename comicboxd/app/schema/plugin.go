package schema

import (
	"context"

	"github.com/davecgh/go-spew/spew"
)

func before(name string, ctx context.Context, args interface{}) {
}

func after(name string, ctx context.Context, args interface{}, result interface{}) {
	spew.Dump(name, args, result)
}
