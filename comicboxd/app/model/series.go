package model

// Series is a series in the database
type Series struct {
	Name   string `json:"name"  db:"name"`
	Total  int64  `json:"total" db:"total"`
	Read   int64  `json:"read"  db:"read"`
	UserID int64  `json:"-"     db:"user_id"`
}
