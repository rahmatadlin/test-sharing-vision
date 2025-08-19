# Installation Guide - Article API

Panduan lengkap untuk menginstall dan menjalankan Article API.

## 📋 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- **Go 1.21 atau lebih tinggi**

  ```bash
  go version
  ```

- **MySQL 8.0 atau lebih tinggi**

  ```bash
  mysql --version
  ```

- **Git**
  ```bash
  git --version
  ```

## 🚀 Installation Steps

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd test-sharing-vision/backend
```

### Step 2: Install Dependencies

```bash
go mod tidy
```

### Step 3: Environment Setup

```bash
cp env.example .env
```

Edit file `.env` dengan kredensial MySQL Anda:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=article
PORT=8080
```

### Step 4: Database Setup

```bash
mysql -u root -p
```

Di dalam MySQL client:

```sql
CREATE DATABASE article;
EXIT;
```

### Step 5: Run Migrations & Seeding

```bash
mysql -u root -p article < database/schema.sql
```

### Step 6: Start Application

```bash
go run main.go
```

Server akan berjalan di `http://localhost:8080`

## ✅ Verification

### Test API Endpoints

```bash
# Health check
curl http://localhost:8080/health

# API info
curl http://localhost:8080/

# Get articles with pagination
curl http://localhost:8080/article/list/10/0

# Get specific article
curl http://localhost:8080/article/1
```

### Verify Database

```bash
# Check tables
mysql -u root -p -e "USE article; SHOW TABLES;"

# Check table structure
mysql -u root -p -e "USE article; DESCRIBE posts;"

# Check sample data
mysql -u root -p -e "USE article; SELECT id, title, status FROM posts;"
```

## 📊 Expected Results

### Database Structure

```
+--------------+--------------+------+-----+-------------------+-------------------+
| Field        | Type         | Null | Key | Default           | Extra             |
+--------------+--------------+------+-----+-------------------+-------------------+
| id           | int          | NO   | PRI | NULL              | auto_increment     |
| title        | varchar(200) | NO   |     | NULL              |                   |
| content      | text         | NO   |     | NULL              |                   |
| category     | varchar(100) | NO   |     | NULL              |                   |
| created_date | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_date | timestamp    | YES  |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| status       | varchar(100) | NO   |     | NULL              |                   |
+--------------+--------------+------+-----+-------------------+-------------------+
```

### Sample Data

```
+----+---------------------------------------------------+---------+
| id | title                                             | status  |
+----+---------------------------------------------------+---------+
|  1 | Getting Started with Go Programming Language      | publish |
|  2 | Understanding RESTful API Design Principles       | publish |
|  3 | Introduction to Database Design and Normalization | draft   |
+----+---------------------------------------------------+---------+
```

## 🔧 Troubleshooting

### Database Connection Issues

**Error:** `Failed to connect to database`

**Solutions:**

1. Pastikan MySQL service berjalan
2. Cek kredensial di file `.env`
3. Pastikan database `article` sudah dibuat
4. Cek firewall settings

### Port Already in Use

**Error:** `Failed to start server: listen tcp :8080: bind: address already in use`

**Solution:**

```bash
# Ganti port di file .env
PORT=8081
```

### Migration Failed

**Error:** `Access denied for user`

**Solutions:**

1. Pastikan MySQL user memiliki permission CREATE TABLE
2. Cek apakah database `article` sudah ada
3. Coba dengan user root atau buat user baru dengan permission yang cukup

### Go Dependencies Issues

**Error:** `go: module not found`

**Solution:**

```bash
go mod tidy
go mod download
```

## 📁 Project Structure

```
backend/
├── main.go                          # Application entry point
├── go.mod                           # Go module file
├── go.sum                           # Go module checksums
├── env.example                      # Environment variables template
├── README.md                        # Detailed documentation
├── QUICK_START.md                   # Quick start guide
├── INSTALL.md                       # This installation guide
├── Article_API.postman_collection.json  # Postman collection
├── config/
│   └── database.go                  # Database configuration
├── models/
│   └── post.go                      # Data models
├── handlers/
│   └── post_handler.go              # HTTP handlers
├── routes/
│   └── routes.go                    # Route definitions
└── database/
    └── schema.sql                   # Database schema & seeding
```

## 🎯 Next Steps

Setelah instalasi berhasil:

1. **Test API dengan Postman:**

   - Import `Article_API.postman_collection.json`
   - Set variable `base_url` ke `http://localhost:8080`

2. **Explore API Endpoints:**

   - `GET /health` - Health check
   - `GET /` - API information
   - `POST /article/` - Create article
   - `GET /article/list/{limit}/{offset}` - Get articles
   - `GET /article/{id}` - Get article by ID
   - `PUT /article/{id}` - Update article
   - `DELETE /article/{id}` - Delete article

3. **Validation Rules:**
   - Title: Required, minimum 20 characters
   - Content: Required, minimum 200 characters
   - Category: Required, minimum 3 characters
   - Status: Required, must be "publish", "draft", or "thrash"

## 📞 Support

Jika mengalami masalah:

1. Cek troubleshooting section di atas
2. Pastikan semua prerequisites terpenuhi
3. Cek log aplikasi untuk error details
4. Verifikasi database connection dan permissions
