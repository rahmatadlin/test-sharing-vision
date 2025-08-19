# Article API Backend

A RESTful API for managing articles built with Go, Gin, GORM, and MySQL.

## Features

- CRUD operations for articles
- Input validation
- Pagination support
- Soft delete functionality
- Database migrations

## Prerequisites

- Go 1.21 or higher
- MySQL 8.0 or higher
- Git

## 🚀 Quick Installation

### Prerequisites

- Go 1.21+
- MySQL 8.0+
- Git

### Quick Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd test-sharing-vision/backend

# 2. Install dependencies
go mod tidy

# 3. Setup environment
cp env.example .env
# Edit .env with your MySQL credentials

# 4. Create database
mysql -u root -p -e "CREATE DATABASE article;"

# 5. Run migrations & seeding
mysql -u root -p article < database/schema.sql

# 6. Start application
go run main.go
```

### Verify Installation

```bash
curl http://localhost:8080/health
curl http://localhost:8080/article/list/10/0
```

📖 **For detailed installation guide, see:**

- [QUICK_START.md](QUICK_START.md) - Panduan cepat dalam bahasa Indonesia
- [INSTALL.md](INSTALL.md) - Panduan lengkap dengan troubleshooting

## Database Schema

The application uses a `posts` table with the following structure:

```sql
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(100) NOT NULL CHECK (status IN ('publish', 'draft', 'thrash'))
);
```

## API Endpoints

### 1. Create Article

- **URL:** `POST /article/`
- **Request Body:**

```json
{
  "title": "Your Article Title",
  "content": "Your article content with at least 200 characters...",
  "category": "Technology",
  "status": "publish"
}
```

- **Response:** `{}` (empty JSON object)

### 2. Get Articles (with Pagination)

- **URL:** `GET /article/list/{limit}/{offset}`
- **Example:** `GET /article/list/10/0`
- **Response:**

```json
[
  {
    "title": "Article Title",
    "content": "Article content...",
    "category": "Technology",
    "status": "publish",
    "created_date": "2024-01-01T00:00:00Z",
    "updated_date": "2024-01-01T00:00:00Z"
  }
]
```

### 3. Get Article by ID

- **URL:** `GET /article/{id}`
- **Example:** `GET /article/1`
- **Response:**

```json
{
  "title": "Article Title",
  "content": "Article content...",
  "category": "Technology",
  "status": "publish",
  "created_date": "2024-01-01T00:00:00Z",
  "updated_date": "2024-01-01T00:00:00Z"
}
```

### 4. Update Article by ID

- **URL:** `POST/PUT/PATCH /article/{id}`
- **Request Body:**

```json
{
  "title": "Updated Article Title",
  "content": "Updated article content with at least 200 characters...",
  "category": "Technology",
  "status": "draft"
}
```

- **Response:** `{}` (empty JSON object)

### 5. Delete Article by ID

- **URL:** `POST/DELETE /article/{id}`
- **Response:** `204 No Content`

## Validation Rules

- **Title:** Required, minimum 20 characters
- **Content:** Required, minimum 200 characters
- **Category:** Required, minimum 3 characters
- **Status:** Required, must be one of: "publish", "draft", "thrash"

## Environment Variables

| Variable      | Description    | Default   |
| ------------- | -------------- | --------- |
| `DB_HOST`     | MySQL host     | localhost |
| `DB_PORT`     | MySQL port     | 3306      |
| `DB_USER`     | MySQL username | root      |
| `DB_PASSWORD` | MySQL password | ""        |
| `DB_NAME`     | Database name  | article   |
| `PORT`        | Server port    | 8080      |

## Project Structure

```
backend/
├── main.go              # Application entry point
├── go.mod               # Go module file
├── go.sum               # Go module checksums
├── env.example          # Environment variables example
├── README.md            # This file
├── config/
│   └── database.go      # Database configuration
├── models/
│   └── post.go          # Post model and request/response structs
├── handlers/
│   └── post_handler.go  # HTTP request handlers
└── routes/
    └── routes.go        # Route definitions
```

## Testing

You can test the API using curl or Postman. Here are some example curl commands:

### Create an article:

```bash
curl -X POST http://localhost:8080/article/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Go Programming",
    "content": "Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency. This article will guide you through the basics of Go programming language and help you get started with your first Go application.",
    "category": "Programming",
    "status": "publish"
  }'
```

### Get articles with pagination:

```bash
curl -X GET http://localhost:8080/article/list/10/0
```

### Get article by ID:

```bash
curl -X GET http://localhost:8080/article/1
```

### Update article:

```bash
curl -X PUT http://localhost:8080/article/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated: Getting Started with Go Programming",
    "content": "Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency. This updated article will guide you through the basics of Go programming language and help you get started with your first Go application.",
    "category": "Programming",
    "status": "draft"
  }'
```

### Delete article:

```bash
curl -X DELETE http://localhost:8080/article/1
```

## License

This project is licensed under the MIT License.
