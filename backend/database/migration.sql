-- Migration script to remove deleted_at column from posts table
-- Run this script to clean up the database

USE article;

-- Drop index (will fail gracefully if doesn't exist)
DROP INDEX idx_posts_deleted_at ON posts;

-- Remove deleted_at column (will fail gracefully if doesn't exist)
ALTER TABLE posts DROP COLUMN deleted_at;
