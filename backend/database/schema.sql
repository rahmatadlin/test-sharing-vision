-- Create database if not exists
CREATE DATABASE IF NOT EXISTS article;

-- Use the article database
USE article;

-- Create posts table manually
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(100) NOT NULL CHECK (status IN ('publish', 'draft', 'thrash'))
);

-- Create index for better performance
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_date ON posts(created_date);

-- Insert sample data (optional)
INSERT INTO posts (title, content, category, status) VALUES 
(
    'Getting Started with Go Programming Language',
    'Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency. This article will guide you through the basics of Go programming language and help you get started with your first Go application. We will cover topics such as variables, functions, structs, interfaces, and goroutines. By the end of this article, you will have a solid foundation to start building Go applications.',
    'Programming',
    'publish'
),
(
    'Understanding RESTful API Design Principles',
    'REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs are designed to take advantage of existing protocols, typically HTTP. This comprehensive guide will walk you through the fundamental principles of RESTful API design, including resource identification, statelessness, cacheability, and uniform interface. We will also cover best practices for designing APIs that are scalable, maintainable, and user-friendly.',
    'Web Development',
    'publish'
),
(
    'Introduction to Database Design and Normalization',
    'Database design is a crucial aspect of software development that involves organizing data in a structured manner to ensure data integrity, eliminate redundancy, and optimize performance. This article covers the fundamentals of database design, including entity-relationship modeling, normalization forms, and best practices for creating efficient database schemas. We will explore various normalization techniques and their impact on database performance.',
    'Database',
    'draft'
);
