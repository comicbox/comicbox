package schema

import (
	"context"
	"fmt"
	"testing"
	"time"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/stretchr/testify/assert"
	"golang.org/x/crypto/bcrypt"

	"github.com/bradleyjkemp/cupaloy"
)

func TestMe(t *testing.T) {
	t.Run("good", func(t *testing.T) {
		r, err := userQuery().Me()
		cupaloy.SnapshotT(t, r, err)
	})
	t.Run("no user", func(t *testing.T) {
		r, err := QueryCtx(context.Background()).Me()
		cupaloy.SnapshotT(t, r, err)
	})
}

func TestUser(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	insertTestBooks()

	tests := map[string]UserArgs{
		"good":    {ID: graphql.ID(testUserIDs["normal"])},
		"no user": {ID: graphql.ID("an id")},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			r, err := userQuery().User(test)
			cupaloy.SnapshotT(t, r, err)
		})
	}
}

func TestUpdateUser(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	insertTestBooks()

	tests := map[string]UpdateUserArgs{
		"change name": {
			ID: graphql.ID(testUserIDs["t1"]),
			Data: UserInput{
				Name: strptr("new name"),
			},
		},
		"change username": {
			ID: graphql.ID(testUserIDs["t2"]),
			Data: UserInput{
				Username: strptr("new username"),
			},
		},
		"empty update": {
			ID:   graphql.ID(testUserIDs["t4"]),
			Data: UserInput{},
		},
		"no user": {
			ID:   graphql.ID("an id"),
			Data: UserInput{},
		},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			r, err := userQuery().UpdateUser(test)
			if r != nil {
				r.u.UpdatedAt = time.Time{}
			}
			cupaloy.SnapshotT(t, r, err)
		})
	}

	t.Run("change password", func(t *testing.T) {
		password := "new password"
		r, err := userQuery().UpdateUser(UpdateUserArgs{
			ID: graphql.ID(testUserIDs["t5"]),
			Data: UserInput{
				Password: &password,
			},
		})
		assert.NoError(t, err)

		err = bcrypt.CompareHashAndPassword([]byte(r.u.Password), []byte(password))
		assert.NoError(t, err)

	})
}

func TestNewUser(t *testing.T) {
	setUpDB()
	defer tearDownDB()

	tests := map[string]struct {
		Data UserInput
		err  error
	}{
		"good": {
			Data: UserInput{
				Name:     strptr("name"),
				Username: strptr("username"),
				Password: strptr("password"),
			},
		},
		"no user": {
			Data: UserInput{},
			err:  fmt.Errorf("a new user must have data"),
		},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			assert := assert.New(t)
			args := NewUserArgs{Data: test.Data}
			r, err := userQuery().NewUser(args)
			if r != nil {
				r.u.UpdatedAt = time.Time{}
			}

			if test.err != nil {
				assert.EqualError(err, test.err.Error())
				return
			}

			assert.NoError(err)
			if test.Data.Username != nil {
				assert.Equal(r.Username(), *test.Data.Username)
			}
			if test.Data.Name != nil {
				assert.Equal(r.Name(), *test.Data.Name)
			}
			if test.Data.Password != nil {
				err = bcrypt.CompareHashAndPassword([]byte(r.u.Password), []byte(*test.Data.Password))
				assert.NoError(err)

			}
		})

	}

	// err = bcrypt.CompareHashAndPassword([]byte(r.u.Password), []byte(password))
	// assert.NoError(t, err)

}
