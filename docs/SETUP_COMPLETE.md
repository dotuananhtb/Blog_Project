# 🚀 Blog Authentication System - Complete Setup Guide

<div align="center">

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300000f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**Hướng dẫn setup và chạy dự án từ A-Z**

</div>

---

## 📋 Mục lục

- [Tổng quan dự án](#-tổng-quan-dự-án)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt từng bước](#-cài-đặt-từng-bước)
- [Environment Configuration](#-environment-configuration)
- [Database Setup](#-database-setup)
- [Chạy Backend](#-chạy-backend)
- [Chạy Frontend](#-chạy-frontend)
- [Testing & Verification](#-testing--verification)
- [Troubleshooting](#-troubleshooting)
- [Production Deployment](#-production-deployment)

---

## 🎯 Tổng quan dự án

### **What You'll Build:**

- 🖥️ **Backend API** (NestJS) - JWT Authentication với MySQL
- 🎨 **Frontend Web** (Next.js) - Responsive UI với TypeScript
- 🔐 **Security** - JWT tokens, password hashing, input validation
- 🗄️ **Database** - MySQL với TypeORM integration

### **Key Features:**

- ✅ User Registration/Login với validation mạnh mẽ
- ✅ JWT-based authentication system
- ✅ User profile management
- ✅ Responsive frontend với Tailwind CSS
- ✅ Centralized environment management
- ✅ Security best practices

---

## 💻 Yêu cầu hệ thống

### **Software Requirements:**

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **MySQL** 8.0+ ([Download](https://dev.mysql.com/downloads/mysql/))
- **Git** ([Download](https://git-scm.com/downloads))
- **VS Code** (Recommended IDE)

### **System Requirements:**

- **OS**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Network**: Internet connection for dependencies

### **Optional Tools:**

- **MySQL Workbench** - GUI for database management
- **Postman** - API testing (collection included)
- **Git Client** - SourceTree, GitHub Desktop, etc.

---

## 🔧 Cài đặt từng bước

### **Step 1: Clone Repository**

```bash
# Clone project
git clone <repository-url>
cd Blog_Project

# Verify structure
ls -la
# Bạn sẽ thấy:
# ├── blog-backend/     (NestJS API)
# ├── blog-frontend/    (Next.js Web)
# ├── docs/            (Documentation)
# ├── .env.example     (Environment template)
# └── setup scripts    (Automation tools)
```

### **Step 2: Database Setup**

#### **Option A: Quick Setup (MySQL Root User)**

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE blog_db;

-- Verify creation
SHOW DATABASES;
-- Blog_db should appear in the list

-- Exit MySQL
EXIT;
```

#### **Option B: Secure Setup (Dedicated User) - RECOMMENDED**

```sql
-- Connect as root
mysql -u root -p

-- Create database
CREATE DATABASE blog_db;

-- Create dedicated user
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;

-- Test new user
EXIT;
mysql -u blog_user -p blog_db
-- If successful, you're ready!
```

### **Step 3: Environment Configuration**

#### **3.1 Create Main Environment File**

```bash
# Copy template to actual env file
cp .env.example .env

# Open .env in your editor
code .env  # VS Code
# or
notepad .env  # Windows Notepad
```

#### **3.2 Update Database Configuration**

```properties
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=blog_user          # or 'root' if using Option A
DB_PASSWORD=your_secure_password  # Your actual MySQL password
DB_NAME=blog_db

# Application URLs
PORT=3000
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3000
```

#### **3.3 Generate Secure JWT Secret**

```bash
# Auto-generate cryptographically secure JWT_SECRET
node New-JwtSecret.js

# Or manual generation:
# Use: https://generate-secret.vercel.app/32
# Copy the 64-character result to .env:
# JWT_SECRET=a1b2c3d4e5f6...your_generated_secret
```

#### **3.4 Auto-Generate Sub-Environment Files**

```bash
# This creates blog-backend/.env and blog-frontend/.env.local
node setup-env.js

# Expected output:
# ✅ Created: blog-backend/.env
# ✅ Created: blog-frontend/.env.local
```

---

## 🗄️ Database Setup

### **Verify Database Connection**

```bash
# Test connection using environment variables
mysql -h localhost -P 3306 -u blog_user -p blog_db

# Should connect without errors
# Type EXIT; to disconnect
```

### **Database Schema**

The application will auto-create tables when you first run the backend. Expected tables:

```sql
-- Users table (auto-created by TypeORM)
users (
  id VARCHAR(36) PRIMARY KEY,           -- UUID
  email VARCHAR(255) UNIQUE NOT NULL,   -- User email
  password VARCHAR(255) NOT NULL,       -- Bcrypt hashed
  name VARCHAR(255) NOT NULL,           -- Display name
  avatar VARCHAR(255),                  -- Profile picture URL
  role ENUM('admin','user','moderator') DEFAULT 'user',
  bio VARCHAR(500),                     -- User biography
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🖥️ Chạy Backend

### **Step 1: Install Dependencies**

```bash
# Navigate to backend
cd blog-backend

# Install packages
npm install

# Verify installation
npm list --depth=0
# Should show @nestjs/core, typeorm, mysql2, etc.
```

### **Step 2: Verify Environment**

```bash
# Check if .env file exists
ls -la | grep .env
# Should show: .env

# Verify key environment variables
cat .env | grep -E "(DB_|JWT_|PORT)"
# Should show your database and JWT configuration
```

### **Step 3: Start Backend Server**

```bash
# Development mode with auto-reload
npm run start:dev

# Expected output:
# [Nest] Starting Nest application...
# [Nest] TypeOrmModule dependencies initialized +1ms
# [Nest] Application is running on: http://localhost:3000
```

### **Step 4: Verify Backend is Running**

```bash
# Test health endpoint (new terminal)
curl http://localhost:3000/api/v1/health

# Expected response:
# {"status":"ok","timestamp":"2025-09-29T..."}

# Or open in browser:
# http://localhost:3000/api/v1/health
```

---

## 🎨 Chạy Frontend

### **Step 1: Install Dependencies (New Terminal)**

```bash
# Navigate to frontend (keep backend running)
cd blog-frontend

# Install packages
npm install

# Verify installation
npm list --depth=0
# Should show next, react, tailwindcss, etc.
```

### **Step 2: Verify Environment**

```bash
# Check environment file
ls -la | grep .env
# Should show: .env.local

# Verify API URL
cat .env.local | grep API_URL
# Should show: NEXT_PUBLIC_API_URL=http://localhost:3000
```

### **Step 3: Start Frontend Server**

```bash
# Development mode
npm run dev

# Expected output:
# ready - started server on 0.0.0.0:3001, url: http://localhost:3001
# info  - Loaded env from .env.local
```

### **Step 4: Access Application**

```bash
# Open in browser:
# http://localhost:3001

# You should see:
# ✅ Homepage with navigation
# ✅ Register/Login links
# ✅ Responsive design
```

---

## 🧪 Testing & Verification

### **API Testing with Built-in Script**

```bash
# Run automated API tests (from root directory)
cd blog-backend
node test-api.js

# Expected output:
# ✅ Health check passed
# ✅ User registration successful
# ✅ User login successful
# ✅ Profile access with JWT token
# ✅ All endpoints working
```

### **Manual Testing Flow**

#### **1. Test Registration**

```bash
# Navigate to: http://localhost:3001/register
# Fill form:
Name: Test User
Email: test@example.com
Password: password123
Confirm Password: password123
Bio: I'm testing the system

# Click Register
# Expected: Success message + redirect to login
```

#### **2. Test Login**

```bash
# Navigate to: http://localhost:3001/login
# Use credentials from registration
Email: test@example.com
Password: password123

# Click Login
# Expected: Success + redirect to dashboard with user info
```

#### **3. Test Protected Routes**

```bash
# After login, user info should appear in sidebar
# Navigate around the app - should maintain login state
# Refresh page - should still be logged in (JWT cookies)
```

### **Postman Testing (Optional)**

```bash
# Import collection: blog-backend/Blog_API_Collection.postman_collection.json
# Set environment variable: base_url = http://localhost:3000
# Run collection - all tests should pass
```

### **Database Verification**

```sql
-- Connect to database
mysql -u blog_user -p blog_db

-- Check users table
SELECT id, email, name, role, created_at FROM users;
-- Should show registered users with hashed passwords

-- Check table structure
DESCRIBE users;
-- Should match expected schema
```

---

## 🚨 Troubleshooting

### **Common Issues & Solutions**

#### **Backend Won't Start**

**Error**: `ECONNREFUSED` or database connection failed

```bash
# Check MySQL is running
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS
net start mysql  # Windows

# Verify credentials
mysql -u blog_user -p blog_db

# Check .env file
cat blog-backend/.env | grep DB_
```

**Error**: `Port 3000 already in use`

```bash
# Find process using port
lsof -ti:3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process or change port in .env
PORT=3001
```

#### **Frontend Won't Start**

**Error**: `Cannot connect to backend`

```bash
# Verify backend is running
curl http://localhost:3000/api/v1/health

# Check frontend .env.local
cat blog-frontend/.env.local
# NEXT_PUBLIC_API_URL should match backend URL
```

**Error**: `Port 3001 already in use`

```bash
# Run on different port
npm run dev -- -p 3002

# Or kill existing process
lsof -ti:3001 | xargs kill -9  # Mac/Linux
```

#### **Environment Issues**

**Error**: JWT_SECRET not found

```bash
# Regenerate JWT secret
node New-JwtSecret.js

# Verify in backend .env
grep JWT_SECRET blog-backend/.env
```

**Error**: Environment files missing

```bash
# Regenerate all env files
node setup-env.js

# Verify files exist
ls blog-backend/.env blog-frontend/.env.local
```

#### **Database Issues**

**Error**: Table doesn't exist

```bash
# TypeORM auto-creates tables on first run
# Restart backend to trigger creation
cd blog-backend
npm run start:dev
```

**Error**: Permission denied

```sql
-- Grant permissions again
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;
```

### **Debug Commands**

```bash
# Check all processes
ps aux | grep node

# Check ports in use
netstat -tulpn | grep :300

# View backend logs
cd blog-backend
npm run start:dev | tee logs.txt

# View environment variables
cd blog-backend
node -e "console.log(process.env.DB_HOST, process.env.JWT_SECRET?.substring(0,10))"
```

---

## 🚀 Production Deployment

### **Environment Setup**

```properties
# Production .env (create .env.production)
NODE_ENV=production
DB_HOST=your-production-db-host
DB_USERNAME=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=your-production-db-name
JWT_SECRET=your-production-jwt-secret-different-from-dev
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

### **Build Commands**

```bash
# Backend production build
cd blog-backend
npm run build
npm run start:prod

# Frontend production build
cd blog-frontend
npm run build
npm start
```

### **Docker Deployment (Optional)**

```dockerfile
# Dockerfile example for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### **Security Checklist**

- ✅ Strong JWT_SECRET (different from development)
- ✅ Database user with minimal permissions
- ✅ HTTPS enabled for production URLs
- ✅ Environment variables secured (not in code)
- ✅ Rate limiting enabled
- ✅ CORS properly configured
- ✅ Database backups configured

---

## 📚 Additional Resources

### **Documentation**

- **[Main README](README.md)** - Project overview
- **[Environment Setup](docs/ENVIRONMENT_SETUP.md)** - Detailed env management
- **[Backend Details](docs/BACKEND_DETAILS.md)** - API architecture
- **[Security Guide](SECURITY.md)** - Security best practices

### **API Reference**

- **Health Check**: `GET /api/v1/health`
- **Register**: `POST /api/v1/auth/register`
- **Login**: `POST /api/v1/auth/login`
- **Profile**: `GET /api/v1/users/profile` (Protected)
- **Update Profile**: `PUT /api/v1/users/profile` (Protected)

### **Tech Stack Documentation**

- **[NestJS Documentation](https://docs.nestjs.com/)**
- **[Next.js Documentation](https://nextjs.org/docs)**
- **[TypeORM Documentation](https://typeorm.io/)**
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**

---

## 🎉 Success Checklist

After completing setup, you should have:

- ✅ **MySQL database** running with `blog_db` created
- ✅ **Environment files** configured and generated
- ✅ **Backend server** running on http://localhost:3000
- ✅ **Frontend application** running on http://localhost:3001
- ✅ **User registration** working with form validation
- ✅ **User login** working with JWT tokens
- ✅ **Protected routes** requiring authentication
- ✅ **Database tables** auto-created with user data
- ✅ **API endpoints** responding correctly
- ✅ **Frontend-backend** communication established

### **What You Can Do Now:**

1. **Register new users** with validation
2. **Login/logout** with JWT authentication
3. **View/update user profiles**
4. **Test API endpoints** with Postman
5. **Develop new features** on this foundation

---

## 📞 Support & Help

### **If You Get Stuck:**

1. **Check logs** in both backend and frontend terminals
2. **Verify environment** variables are set correctly
3. **Test database** connection manually
4. **Review troubleshooting** section above
5. **Check GitHub issues** for similar problems

### **Common Quick Fixes:**

```bash
# Reset everything and start fresh
pkill -f node  # Kill all node processes
node setup-env.js  # Regenerate env files
cd blog-backend && npm run start:dev  # Restart backend
cd blog-frontend && npm run dev  # Restart frontend
```

### **Get Help:**

- **GitHub Issues**: Report bugs or ask questions
- **Documentation**: Check docs/ folder for detailed guides
- **Community**: Join discussions in GitHub Discussions

---

<div align="center">

**🎉 Congratulations! Your Blog Authentication System is Ready! 🎉**

**Made with ❤️ using NestJS, Next.js, and modern web technologies**

</div>
