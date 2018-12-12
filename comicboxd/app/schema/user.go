package schema

import (
	"context"
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/zwzn/comicbox/comicboxd/app/model"
)

func (q *query) Me(ctx context.Context) (*UserResolver, error) {
	c := q.Ctx(ctx)
	user := c.User
	if user == nil {
		return nil, fmt.Errorf("user not set")
	}
	return &UserResolver{u: *user}, nil
}

type UserResolver struct {
	u model.User
}

func (r *UserResolver) ID() graphql.ID {
	return graphql.ID(r.u.ID.String())
}
func (r *UserResolver) CreatedAt() graphql.Time {
	return graphql.Time{Time: r.u.CreatedAt}
}
func (r *UserResolver) UpdatedAt() graphql.Time {
	return graphql.Time{Time: r.u.UpdatedAt}
}
func (r *UserResolver) Name() string {
	return r.u.Name
}
func (r *UserResolver) Username() string {
	return r.u.Username
}
