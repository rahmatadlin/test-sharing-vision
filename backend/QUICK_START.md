# Quick Start Guide

Panduan cepat untuk menjalankan Article API dari awal.

## Prerequisites

- Go 1.21+
- MySQL 8.0+
- Git

## Langkah-langkah Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd test-sharing-vision/backend
```

### 2. Install Dependencies

```bash
go mod tidy
```

### 3. Setup Environment

```bash
cp env.example .env
# Edit file .env dengan kredensial MySQL Anda
```

### 4. Buat Database

```bash
mysql -u root -p
```

Di dalam MySQL:

```sql
CREATE DATABASE article;
EXIT;
```

### 5. Jalankan Migration & Seeding

```bash
mysql -u root -p article < database/schema.sql
```

### 6. Jalankan Aplikasi

```bash
go run main.go
```

Server akan berjalan di `http://localhost:8080`

## Verifikasi Instalasi

### Test API

```bash
# Health check
curl http://localhost:8080/health

# Info API
curl http://localhost:8080/

# Get articles
curl http://localhost:8080/article/list/10/0
```

### Verifikasi Database

```bash
# Cek tabel
mysql -u root -p -e "USE article; SHOW TABLES;"

# Cek struktur tabel
mysql -u root -p -e "USE article; DESCRIBE posts;"

# Cek data sample
mysql -u root -p -e "USE article; SELECT id, title, status FROM posts;"
```

## Expected Results

Setelah menjalankan semua langkah di atas, Anda akan melihat:

1. **API Response:**

   - Health check: `{"status":"OK","message":"Article API is running"}`
   - Articles: Array dengan 3 artikel sample

2. **Database:**
   - Tabel `posts` dengan struktur yang benar
   - 3 artikel sample dengan status "publish" dan "draft"

## Troubleshooting

### Database Connection Error

- Pastikan MySQL berjalan
- Cek kredensial di file `.env`
- Pastikan database `article` sudah dibuat

### Port Already in Use

- Ganti port di file `.env`: `PORT=8081`

### Migration Failed

- Pastikan MySQL user memiliki permission untuk CREATE TABLE
- Cek apakah database `article` sudah ada

## Next Steps

Setelah aplikasi berjalan, Anda bisa:

1. Test semua endpoint menggunakan Postman collection
2. Tambah artikel baru
3. Update dan delete artikel
4. Explore API documentation di `/` endpoint
