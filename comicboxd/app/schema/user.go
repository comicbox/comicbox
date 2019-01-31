package schema

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/google/uuid"

	"github.com/Masterminds/squirrel"
	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/app/model"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

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

func (q *query) Me(ctx context.Context) (*UserResolver, error) {
	c := q.Ctx(ctx)
	user := c.User
	if user == nil {
		return nil, fmt.Errorf("user not set")
	}
	return &UserResolver{u: *user}, nil
}

type UserArgs struct {
	ID graphql.ID
}

func (q *query) User(ctx context.Context, args UserArgs) (*UserResolver, error) {
	c := q.Ctx(ctx)
	if args.ID != graphql.ID(c.User.ID.String()) {
		return nil, fmt.Errorf("you may not view users other than your own")
	}
	user := model.User{}
	qSQL, qArgs := squirrel.
		Select("*").
		From("user").
		Where(squirrel.Eq{"id": args.ID}).
		MustSql()

	err := database.Get(&user, qSQL, qArgs...)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return &UserResolver{u: user}, nil
}

type UserInput struct {
	Name     *string `db:"name"`
	Username *string `db:"username"`
	Password *string `db:"password"`
}

type UpdateUserArgs struct {
	ID   graphql.ID
	Data UserInput
}

func (q *query) UpdateUser(ctx context.Context, args UpdateUserArgs) (*UserResolver, error) {
	var err error
	// c := q.Ctx(ctx)
	args.Data, err = userData(args.Data)
	if err != nil {
		return nil, err
	}

	m := toStruct(args.Data)
	if len(m) == 0 {
		r, err := q.User(ctx, UserArgs{ID: args.ID})
		if err != nil {
			return nil, err
		}
		if r == nil {
			return nil, fmt.Errorf("no user with id %s", args.ID)
		}
		return r, nil
	}

	err = database.Tx(ctx, func(tx *sqlx.Tx) error {
		_, err := squirrel.
			Update("user").
			Where("id = ?", args.ID).
			SetMap(m).
			RunWith(tx).
			Exec()
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return q.User(ctx, UserArgs{ID: args.ID})
}

type NewUserArgs struct {
	Data UserInput
}

func (q *query) NewUser(ctx context.Context, args NewUserArgs) (*UserResolver, error) {
	var err error
	// c := q.Ctx(ctx)
	args.Data, err = userData(args.Data)
	if err != nil {
		return nil, err
	}

	m := toStruct(args.Data)
	if len(m) == 0 {
		return nil, fmt.Errorf("a new user must have data")
	}

	id := uuid.New().String()
	m["id"] = id

	err = database.Tx(ctx, func(tx *sqlx.Tx) error {
		_, err := squirrel.
			Insert("user").
			SetMap(m).
			RunWith(tx).
			Exec()
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return q.User(ctx, UserArgs{ID: graphql.ID(id)})
}

func userData(data UserInput) (UserInput, error) {
	if data.Password != nil {

		b, err := bcrypt.GenerateFromPassword([]byte(*data.Password), 14)
		if err != nil {
			return UserInput{}, err
		}
		pass := string(b)
		data.Password = &pass
	}
	return data, nil
}
