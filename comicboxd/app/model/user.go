package model

type User struct {
	Model
	Name         string  `json:"name"          db:"name"`
	Username     string  `json:"username"      db:"username"`
	Password     string  `json:"-"             db:"password"`
	Change       int     `json:"change"        db:"change"`
	AnilistToken *string `json:"anilist_token" db:"anilist_token"`
}
