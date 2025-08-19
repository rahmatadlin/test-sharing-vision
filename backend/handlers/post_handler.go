package handlers

import (
	"net/http"
	"strconv"

	"article-api/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// PostHandler handles post-related HTTP requests
type PostHandler struct {
	db *gorm.DB
}

// NewPostHandler creates a new post handler
func NewPostHandler(db *gorm.DB) *PostHandler {
	return &PostHandler{db: db}
}

// CreatePost handles POST /article/ - Create a new article
func (h *PostHandler) CreatePost(c *gin.Context) {
	var req models.CreatePostRequest

	// Bind and validate request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Create new post
	post := models.Post{
		Title:    req.Title,
		Content:  req.Content,
		Category: req.Category,
		Status:   req.Status,
	}

	// Save to database
	if err := h.db.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create post: " + err.Error(),
		})
		return
	}

	// Return empty response as specified
	c.JSON(http.StatusCreated, gin.H{})
}

// GetPosts handles GET /article/<limit>/<offset> - Get articles with pagination
func (h *PostHandler) GetPosts(c *gin.Context) {
	// Get limit and offset from URL parameters
	limitStr := c.Param("limit")
	offsetStr := c.Param("offset")

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10 // default limit
	}

	offset, err := strconv.Atoi(offsetStr)
	if err != nil || offset < 0 {
		offset = 0 // default offset
	}

	var posts []models.Post

	// Query posts with pagination
	if err := h.db.Offset(offset).Limit(limit).Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch posts: " + err.Error(),
		})
		return
	}

	// Convert to response format
	var response []models.PostResponse
	for _, post := range posts {
		response = append(response, models.PostResponse{
			ID:          post.ID,
			Title:       post.Title,
			Content:     post.Content,
			Category:    post.Category,
			Status:      post.Status,
			CreatedDate: post.CreatedDate,
			UpdatedDate: post.UpdatedDate,
		})
	}

	c.JSON(http.StatusOK, response)
}

// GetPostByID handles GET /article/<id> - Get article by ID
func (h *PostHandler) GetPostByID(c *gin.Context) {
	// Get ID from URL parameter
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID format",
		})
		return
	}

	var post models.Post

	// Query post by ID
	if err := h.db.First(&post, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Post not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch post: " + err.Error(),
		})
		return
	}

	// Return post in response format
	response := models.PostResponse{
		ID:          post.ID,
		Title:       post.Title,
		Content:     post.Content,
		Category:    post.Category,
		Status:      post.Status,
		CreatedDate: post.CreatedDate,
		UpdatedDate: post.UpdatedDate,
	}

	c.JSON(http.StatusOK, response)
}

// UpdatePost handles POST/PUT/PATCH /article/<id> - Update article by ID
func (h *PostHandler) UpdatePost(c *gin.Context) {
	// Get ID from URL parameter
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID format",
		})
		return
	}

	var req models.UpdatePostRequest

	// Bind and validate request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	// Check if post exists
	var existingPost models.Post
	if err := h.db.First(&existingPost, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Post not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch post: " + err.Error(),
		})
		return
	}

	// Update post
	updates := models.Post{
		Title:    req.Title,
		Content:  req.Content,
		Category: req.Category,
		Status:   req.Status,
	}

	if err := h.db.Model(&existingPost).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update post: " + err.Error(),
		})
		return
	}

	// Return empty response as specified
	c.JSON(http.StatusOK, gin.H{})
}

// DeletePost handles POST/DELETE /article/<id> - Delete article by ID
func (h *PostHandler) DeletePost(c *gin.Context) {
	// Get ID from URL parameter
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID format",
		})
		return
	}

	// Check if post exists
	var post models.Post
	if err := h.db.First(&post, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Post not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch post: " + err.Error(),
		})
		return
	}

	// Move to trash: update status to thrash
	updates := map[string]interface{}{
		"status": "thrash",
	}

	if err := h.db.Model(&post).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to move post to trash: " + err.Error(),
		})
		return
	}

	// Return empty response as specified
	c.JSON(http.StatusOK, gin.H{})
}
