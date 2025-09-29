# 🚀 Blog Authentication System - Setup Guide

## Tổng quan dự án đã hoàn thành

### ✅ Backend (NestJS) - HOÀN THÀNH

**Thời gian: 3.5 tiếng (theo kế hoạch)**

#### Các tính năng đã implement:

1. **Setup NestJS project cho Blog System** ✅
   - Project structure với modules: auth, users, posts
   - TypeORM integration với MySQL
   - Global validation pipes
   - CORS configuration

2. **RESTful API structure** ✅
   - `/api/v1/auth` - Authentication endpoints
   - `/api/v1/users` - User management endpoints
   - `/api/v1/posts` - Posts endpoints (placeholder)
   - `/api/v1/health` - Health check

3. **User entity implementation** ✅
   - Fields: id, email, password, name, avatar, role, bio, created_at, updated_at
   - UUID primary key
   - Enum cho user roles (admin, user, moderator)
   - TypeORM decorators và relationships

4. **User registration API với validation** ✅
   - DTO validation với class-validator
   - Email uniqueness check
   - Password hashing với bcrypt (12 rounds)
   - JWT token generation

5. **Authentication System** ✅
   - JWT-based authentication
   - Login/logout endpoints
   - Protected routes với JWT guards
   - Password validation
   - User profile endpoints (GET, PUT)

### 🏗️ Frontend (NextJS) - FOUNDATION READY

**Thời gian: 2.5 tiếng (theo kế hoạch)**

#### Các component đã tạo:

1. **NextJS Project Setup** ✅
   - TypeScript + Tailwind CSS
   - Project structure chuẩn
   - Dependencies: react-hook-form, yup, axios, js-cookie

2. **Layout Components** ✅
   - Header với navigation và user menu
   - Footer với links và social media
   - Sidebar với user info và navigation
   - Responsive design

3. **Authentication Pages** ✅
   - Registration page với form validation
   - Login page với form handling
   - Form validation với yup schema
   - Error handling

4. **Authentication Logic** ✅
   - useAuth hook với context
   - API service layer
   - Cookie-based token management
   - Auto token refresh logic

## 📋 Setup Instructions

### Backend Setup

1. **Database Setup**

```bash
# Tạo MySQL database
CREATE DATABASE blog_db;
```

2. **Environment Configuration**

```bash
# Copy và edit file .env
cp .env.example .env

# Update với thông tin database của bạn:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=blog_db
JWT_SECRET=your-super-secret-jwt-key
```

3. **Install Dependencies & Run**

```bash
# Đã cài đặt sẵn, chỉ cần chạy:
npm run start:dev
```

4. **Test API**

```bash
# Chạy test script
node test-api.js

# Hoặc import Postman collection
# File: Blog_API_Collection.postman_collection.json
```

### Frontend Setup

1. **Navigate to Frontend**

```bash
cd ../blog-frontend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Configuration**

```bash
# Tạo file .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
```

4. **Run Development Server**

```bash
npm run dev
```

## 🛠️ API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Đăng ký user
- `POST /api/v1/auth/login` - Đăng nhập
- `POST /api/v1/auth/logout` - Đăng xuất

### Users

- `GET /api/v1/users/profile` - Lấy thông tin profile
- `PUT /api/v1/users/profile` - Cập nhật profile

### Posts (Placeholder)

- `GET /api/v1/posts` - Lấy tất cả posts
- `GET /api/v1/posts/my-posts` - Lấy posts của user

### Utility

- `GET /api/v1/health` - Health check

## 📊 Demo Data

### Sample Registration

```json
{
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe",
  "bio": "A passionate blogger"
}
```

### Sample Login

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🔐 Security Features

- ✅ Password hashing với bcrypt
- ✅ JWT tokens với 7 ngày expiration
- ✅ Input validation với class-validator
- ✅ CORS protection
- ✅ Environment variables cho sensitive data
- ✅ Protected routes với guards

## 📁 Project Structure

### Backend

```
src/
├── auth/                 # Authentication module
├── users/                # Users module
├── posts/                # Posts module
├── entities/             # Database entities
├── dto/                  # Data Transfer Objects
├── config/               # Configuration files
└── main.ts               # Application entry point
```

### Frontend

```
src/
├── app/                  # Next.js 13+ app directory
├── components/           # React components
│   └── layout/          # Layout components
├── hooks/               # Custom hooks (useAuth)
├── services/            # API services
└── ...
```

## 🎯 Deliverables COMPLETED

✅ **Authentication flow demo** - Test script available  
✅ **Login UI** - Responsive login/register pages  
✅ **Postman collection** - Complete API testing collection  
✅ **Backend API** - Full authentication system  
✅ **Frontend Foundation** - Layout và auth pages

## 🚀 Next Steps (Thứ 2)

### Backend (5 tiếng)

1. Session authentication implementation ✅ (Đã có JWT)
2. Login/logout endpoints với error handling ✅
3. Password hashing với bcrypt ✅
4. User profile endpoints ✅

### Frontend (3 tiếng)

1. Login/Logout pages với responsive design ✅
2. Session token management với cookies ✅
3. API integration cho authentication flows ✅

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection**: Đảm bảo MySQL running và credentials đúng
2. **CORS Issues**: Frontend chạy port 3001, backend port 3000
3. **JWT Issues**: Check JWT_SECRET trong .env
4. **Port Conflicts**: Đảm bảo ports 3000, 3001 available

### Error Messages

- `ECONNREFUSED`: Database không kết nối được
- `Unauthorized`: Token invalid hoặc expired
- `ValidationError`: Input data không đúng format

## 📞 Support

Kiểm tra logs trong terminal và đảm bảo:

1. Database đang chạy
2. Environment variables được set
3. Dependencies đã install
4. Ports không bị conflict

---

**Status: Phase 1 COMPLETE** ✅  
**Ready for: Phase 2 Implementation** 🚀
