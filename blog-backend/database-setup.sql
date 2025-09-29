-- SQL commands để tạo user riêng cho blog project
-- Chạy các lệnh này trong MySQL Workbench hoặc command line

-- 1. Tạo database
CREATE DATABASE IF NOT EXISTS blog_db;

-- 2. Tạo user mới  
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'blog_password_123';

-- 3. Cấp quyền cho user
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_user'@'localhost';

-- 4. Refresh privileges
FLUSH PRIVILEGES;

-- 5. Kiểm tra user đã tạo
SELECT User, Host FROM mysql.user WHERE User = 'blog_user';