package routes

import (
	"article-api/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SetupRoutes configures all the routes for the application
func SetupRoutes(r *gin.Engine, db *gorm.DB) {
	// Create handlers
	postHandler := handlers.NewPostHandler(db)

	// Article routes
	articleGroup := r.Group("/article")
	{
		// Create article
		articleGroup.POST("/", postHandler.CreatePost)

		// Get articles with pagination - use a more specific path
		articleGroup.GET("/list/:limit/:offset", postHandler.GetPosts)

		// Get article by ID
		articleGroup.GET("/:id", postHandler.GetPostByID)

		// Update article by ID (supports POST, PUT, PATCH)
		articleGroup.POST("/:id", postHandler.UpdatePost)
		articleGroup.PUT("/:id", postHandler.UpdatePost)
		articleGroup.PATCH("/:id", postHandler.UpdatePost)

		// Delete article by ID (supports POST, DELETE)
		articleGroup.POST("/:id/delete", postHandler.DeletePost)
		articleGroup.DELETE("/:id", postHandler.DeletePost)
	}

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "OK",
			"message": "Article API is running",
		})
	})

	// Root endpoint
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Article API",
			"version": "1.0.0",
			"endpoints": gin.H{
				"create_article": "POST /article/",
				"get_articles": "GET /article/list/:limit/:offset",
				"get_article": "GET /article/:id",
				"update_article": "POST/PUT/PATCH /article/:id",
				"delete_article": "POST/DELETE /article/:id",
			},
		})
	})
}
