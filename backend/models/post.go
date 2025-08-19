package models

import (
	"time"
)

// Post represents the posts table in the database
type Post struct {
	ID          uint      `json:"id" gorm:"primaryKey;column:id;autoIncrement"`
	Title       string    `json:"title" gorm:"type:varchar(200);not null" validate:"required,min=20"`
	Content     string    `json:"content" gorm:"type:text;not null" validate:"required,min=200"`
	Category    string    `json:"category" gorm:"type:varchar(100);not null" validate:"required,min=3"`
	Status      string    `json:"status" gorm:"type:varchar(100);not null" validate:"required,oneof=publish draft thrash"`
	CreatedDate time.Time `json:"created_date" gorm:"autoCreateTime"`
	UpdatedDate time.Time `json:"updated_date" gorm:"autoUpdateTime"`
}

// TableName specifies the table name for the Post model
func (Post) TableName() string {
	return "posts"
}

// CreatePostRequest represents the request body for creating a post
type CreatePostRequest struct {
	Title    string `json:"title" binding:"required,min=20"`
	Content  string `json:"content" binding:"required,min=200"`
	Category string `json:"category" binding:"required,min=3"`
	Status   string `json:"status" binding:"required,oneof=publish draft thrash"`
}

// UpdatePostRequest represents the request body for updating a post
type UpdatePostRequest struct {
	Title    string `json:"title" binding:"required,min=20"`
	Content  string `json:"content" binding:"required,min=200"`
	Category string `json:"category" binding:"required,min=3"`
	Status   string `json:"status" binding:"required,oneof=publish draft thrash"`
}

// PostResponse represents the response body for a post
type PostResponse struct {
	ID          uint      `json:"id"`
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	Category    string    `json:"category"`
	Status      string    `json:"status"`
	CreatedDate time.Time `json:"created_date"`
	UpdatedDate time.Time `json:"updated_date"`
}
