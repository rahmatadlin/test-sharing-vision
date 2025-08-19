# Article API Setup Guide

This guide will help you set up and run the Article API backend application.

## Prerequisites

1. **Go 1.21 or higher**

   ```bash
   go version
   ```

2. **MySQL 8.0 or higher**

   ```bash
   mysql --version
   ```

3. **Git** (for cloning the repository)

## Quick Start

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
go mod tidy
```

### 3. Set up environment variables

```bash
cp env.example .env
# Edit .env with your MySQL credentials
```

### 4. Create MySQL database

```bash
mysql -u root -p
```

Then in MySQL:

```sql
CREATE DATABASE article;
EXIT;
```

### 5. Run database migrations and seeding

```bash
mysql -u root -p article < database/schema.sql
```

### 6. Run the application

```bash
go run main.go
```

The server will start on `http://localhost:8080`

### 7. Verify installation

```bash
# Health check
curl http://localhost:8080/health

# Get articles
curl http://localhost:8080/article/list/10/0
```

## Testing the API

### Using curl

1. **Health check:**

```bash
curl http://localhost:8080/health
```

2. **Create an article:**

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

3. **Get articles with pagination:**

```bash
curl http://localhost:8080/article/list/10/0
```

4. **Get article by ID:**

```bash
curl http://localhost:8080/article/1
```

5. **Update article:**

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

6. **Delete article:**

```bash
curl -X DELETE http://localhost:8080/article/1
```

### Using Postman

1. Import the `Article_API.postman_collection.json` file into Postman
2. Set the `base_url` variable to `http://localhost:8080`
3. Run the requests in the collection

## API Endpoints Summary

| Method         | Endpoint                         | Description                  |
| -------------- | -------------------------------- | ---------------------------- |
| GET            | `/health`                        | Health check                 |
| GET            | `/`                              | API information              |
| POST           | `/article/`                      | Create article               |
| GET            | `/article/list/{limit}/{offset}` | Get articles with pagination |
| GET            | `/article/{id}`                  | Get article by ID            |
| POST/PUT/PATCH | `/article/{id}`                  | Update article               |
| POST/DELETE    | `/article/{id}`                  | Delete article               |

## Validation Rules

- **Title:** Required, minimum 20 characters
- **Content:** Required, minimum 200 characters
- **Category:** Required, minimum 3 characters
- **Status:** Required, must be one of: "publish", "draft", "thrash"

## Troubleshooting

### Database Connection Issues

1. Check if MySQL is running
2. Verify database credentials in `.env`
3. Ensure the `article` database exists

### Port Already in Use

Change the port in `.env`:

```
PORT=8081
```

### Permission Issues

Make sure you have write permissions in the project directory.

## Project Structure

```
backend/
├── main.go                          # Application entry point
├── go.mod                           # Go module file
├── go.sum                           # Go module checksums

├── env.example                      # Environment variables template
├── README.md                        # Detailed documentation
├── SETUP.md                         # This setup guide
├── Article_API.postman_collection.json  # Postman collection
├── config/
│   └── database.go                  # Database configuration
├── models/
│   └── post.go                      # Data models
├── handlers/
│   ├── post_handler.go              # HTTP handlers
│   └── post_handler_test.go         # Tests
├── routes/
│   └── routes.go                    # Route definitions
└── database/
    └── schema.sql                   # Database schema
```

## Next Steps

1. Add more validation rules if needed
2. Implement authentication and authorization
3. Add logging and monitoring
4. Set up CI/CD pipeline
5. Add more comprehensive tests
6. Implement caching for better performance
