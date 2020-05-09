package middleware

import (
	"database/sql"
	"math/rand"
	"net/http"
	"sync"
	"time"

	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"

	"github.com/comicbox/comicbox/comicboxd/app"
	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/app/model"
)

var tempKeys = &sync.Map{}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
func NewTempKey(user *model.User) string {
	key := randStringRunes(40)
	tempKeys.Store(key, user)
	go func() {
		time.Sleep(time.Minute)
		ClearTempKey(key)
	}()
	return key
}

func ClearTempKey(key string) {
	tempKeys.Delete(key)
}

func userFromTempKey(key string) (*model.User, bool) {
	iUser, ok := tempKeys.Load(key)

	user, userOK := iUser.(*model.User)

	return user, ok && userOK
}

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := app.Ctx(r)

		if uid, ok := ctx.SGet("user_id"); ok {

			ctx.User = &model.User{}
			err := database.Get(ctx.User, `select * from user where id=? limit 1`, uid)
			if err == sql.ErrNoRows {
				ctx.SClear("user_id")
				ctx.User = nil
			} else if err != nil {
				panic(err)
			}
		}

		if ctx.User == nil {
			if user, ok := userFromTempKey(r.Header.Get("Authorization")); ok {
				ctx.User = user
			}
		}

		if ctx.User == nil {
			if user, pass, ok := r.BasicAuth(); ok {
				ctx.User = &model.User{}
				err := database.Get(ctx.User, `select * from user where username=? COLLATE NOCASE`, user)
				if err == sql.ErrNoRows {
					ctx.User = nil
				} else if err != nil {
					panic(err)
				}
				if !checkPasswordHash(pass, ctx.User.Password) {
					ctx.User = nil
				}
			}

		}

		if viper.GetBool("guests") {
			if ctx.User == nil {
				ctx.User = &model.User{
					Name:     "Guest",
					Username: "guest",
				}
			}
		}
		if ctx.User == nil {
			http.Error(w, "authorization failed", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// from https://gowebexamples.com/password-hashing/
func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
