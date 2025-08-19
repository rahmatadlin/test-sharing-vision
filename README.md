# Test Sharing Vision

A full-stack web application for managing articles with a modern React frontend and a robust Go backend API.

## 🚀 Overview

This project consists of two main components:

- **Frontend**: React + Vite application with Tailwind CSS for styling
- **Backend**: Go REST API using Gin framework and MySQL database

## 📋 Features

### Backend Features

- CRUD operations for articles
- Input validation with comprehensive rules
- Pagination support
- Soft delete functionality
- Database migrations
- CORS configuration for frontend integration

### Frontend Features

- Modern React 19 with Vite for fast development
- Responsive design with Tailwind CSS
- Tab-based navigation
- Article management interface
- Real-time preview functionality
- Form validation

## 🛠️ Tech Stack

### Backend

- **Language**: Go 1.23+
- **Framework**: Gin (HTTP web framework)
- **ORM**: GORM
- **Database**: MySQL 8.0+
- **Validation**: Gin validator

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📁 Project Structure

```
test-sharing-vision/
├── backend/                 # Go API server
│   ├── config/             # Database configuration
│   ├── handlers/           # HTTP request handlers
│   ├── models/             # Data models
│   ├── routes/             # Route definitions
│   ├── database/           # SQL migrations and schema
│   ├── main.go             # Application entry point
│   └── README.md           # Backend documentation
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── README.md           # Frontend documentation
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Go 1.23+** for backend
- **Node.js 18+** for frontend
- **MySQL 8.0+** for database
- **Git**

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Go dependencies
go mod tidy

# Setup environment (create .env file)
cp env.example .env
# Edit .env with your MySQL credentials

# Create database
mysql -u root -p -e "CREATE DATABASE article;"

# Run migrations
mysql -u root -p article < database/schema.sql

# Start the server
go run main.go
```

The backend will be available at `http://localhost:8080`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📖 API Documentation

### Endpoints

| Method      | Endpoint                         | Description                  |
| ----------- | -------------------------------- | ---------------------------- |
| `POST`      | `/article/`                      | Create a new article         |
| `GET`       | `/article/list/{limit}/{offset}` | Get articles with pagination |
| `GET`       | `/article/{id}`                  | Get article by ID            |
| `PUT/PATCH` | `/article/{id}`                  | Update article by ID         |
| `DELETE`    | `/article/{id}`                  | Delete article by ID         |

### Article Model

```json
{
  "title": "Article Title (min 20 chars)",
  "content": "Article content (min 200 chars)",
  "category": "Category (min 3 chars)",
  "status": "publish|draft|thrash"
}
```

### Validation Rules

- **Title**: Required, minimum 20 characters
- **Content**: Required, minimum 200 characters
- **Category**: Required, minimum 3 characters
- **Status**: Required, must be one of: "publish", "draft", "thrash"

## 🌐 Frontend Pages

- **Home** (`/`): View all articles with pagination
- **Add New** (`/add`): Create new articles
- **Edit** (`/edit`): Edit existing articles
- **Preview** (`/preview`): Preview article content

## 🔧 Environment Variables

### Backend (.env)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=article
PORT=8080
```

## 🧪 Testing

### Backend API Testing

```bash
# Test health endpoint
curl http://localhost:8080/health

# Create an article
curl -X POST http://localhost:8080/article/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Go Programming",
    "content": "Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.",
    "category": "Programming",
    "status": "publish"
  }'

# Get articles
curl http://localhost:8080/article/list/10/0
```

## 📚 Additional Documentation

- [Backend README](backend/README.md) - Detailed backend documentation
- [Backend Quick Start](backend/QUICK_START.md) - Quick setup guide
- [Backend Installation](backend/INSTALL.md) - Complete installation guide
- [Frontend README](frontend/README.md) - Frontend documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For detailed troubleshooting and installation guides, refer to:

- [Backend Installation Guide](backend/INSTALL.md)
- [Backend Quick Start Guide](backend/QUICK_START.md)
