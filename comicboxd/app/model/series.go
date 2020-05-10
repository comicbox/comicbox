package model

import "github.com/google/uuid"

// Series is a series in the database
type Series struct {
	Name     string    `json:"name"   db:"name"`
	Total    int32     `json:"total"  db:"total"`
	Read     int32     `json:"read"   db:"read"`
	UserID   uuid.UUID `json:"-"      db:"user_id"`
	List     *string   `json:"list"   db:"list"`
	TagsJSON []byte    `json:"-"      db:"tags"`
	Tags     []string  `json:"tags"   db:"-"`
	Change   int       `json:"change" db:"change"`
}
