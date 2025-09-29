# 🎥 Demo Script - Blog Authentication System

## Demo Flow (5-10 phút)

### 1. Project Overview (1 phút)

"Chào mọi người! Hôm nay tôi sẽ demo Blog Authentication System vừa hoàn thành theo kế hoạch 6 tiếng."

**Show:**

- Project structure: Backend (NestJS) + Frontend (NextJS)
- SETUP_GUIDE.md để giải thích architecture

### 2. Backend API Demo (3 phút)

#### A. Health Check & API Structure

```bash
# Terminal 1 - Start backend
cd project
npm run start:dev
```

**Explain:** "Backend chạy trên port 3000 với RESTful API structure /api/v1/..."

#### B. Postman Demo

**Import collection:** `Blog_API_Collection.postman_collection.json`

**Test sequence:**

1. GET `/api/v1/health` - "Kiểm tra API hoạt động"
2. POST `/api/v1/auth/register` - "Đăng ký user mới với validation"
   ```json
   {
     "email": "demo@example.com",
     "password": "password123",
     "name": "Demo User",
     "bio": "Demo account for authentication system"
   }
   ```
3. POST `/api/v1/auth/login` - "Đăng nhập và nhận JWT token"
4. GET `/api/v1/users/profile` - "Protected endpoint với JWT"
5. PUT `/api/v1/users/profile` - "Cập nhật profile"

**Highlight:**

- Password được hash với bcrypt
- JWT token tự động set vào Postman environment
- Validation errors khi data sai
- Protected routes cần authentication

#### C. Automated Test Script

```bash
node test-api.js
```

**Explain:** "Script tự động test tất cả endpoints"

### 3. Frontend Demo (3 phút)

#### A. Start Frontend

```bash
# Terminal 2 - Start frontend
cd ../blog-frontend
npm run dev
```

**Navigate to:** `http://localhost:3001`

#### B. Registration Flow

1. Click "Register"
2. Fill form với validation:
   - Name: Demo User
   - Email: demo2@example.com
   - Password: password123
   - Confirm Password: password123
   - Bio: "I love writing blogs!"
3. Show form validation errors nếu điền sai
4. Submit thành công → redirect to home

**Highlight:**

- Form validation với yup schema
- Responsive design với Tailwind CSS
- Error handling

#### C. Login Flow

1. Logout nếu đã login
2. Click "Login"
3. Login với account vừa tạo
4. Show user info trong sidebar
5. Navigate qua các pages

**Highlight:**

- JWT token lưu trong cookie
- User state management với Context
- Protected routes

#### D. Layout Components

**Show:**

- Header với user menu
- Sidebar với user info và navigation
- Footer với links
- Responsive design trên mobile

### 4. Database & Security (1 phút)

#### A. Database Schema

**Show trong MySQL Workbench hoặc phpMyAdmin:**

- Users table với fields: id, email, password (hashed), name, role, bio, timestamps
- UUID primary keys
- User roles enum

#### B. Security Features

**Explain:**

- Bcrypt password hashing (12 rounds)
- JWT tokens với 7 days expiration
- Input validation với class-validator
- CORS protection
- Environment variables cho sensitive data

### 5. Code Quality & Architecture (1 phút)

#### A. Backend Architecture

**Show code structure:**

- Modular design: auth, users, posts modules
- TypeORM entities
- DTO validation
- Dependency injection
- JWT strategy và guards

#### B. Frontend Architecture

**Show code:**

- Custom hooks (useAuth)
- API service layer
- Form handling với react-hook-form
- Type safety với TypeScript

### 6. Next Steps & Wrap-up (1 phút)

**Completed (Phase 1):**
✅ User Registration với validation  
✅ JWT Authentication (Login/Logout)  
✅ Password hashing với bcrypt  
✅ User profile endpoints (GET, PUT)  
✅ RESTful API structure  
✅ Frontend foundation với layout components  
✅ Registration/Login pages

**Next Phase (Thứ 2 - 8 tiếng):**

- Session management enhancements
- Posts CRUD operations
- Advanced frontend features
- File upload cho avatars
- Email verification
- Password reset functionality

**Deliverables Ready:**

- ✅ Authentication flow demo
- ✅ Login UI with responsive design
- ✅ Postman collection
- ✅ Complete setup documentation

"Cảm ơn mọi người đã theo dõi! Hệ thống authentication foundation đã hoàn thành và sẵn sàng cho phase tiếp theo."

---

## Demo Tips:

1. **Preparation:**
   - Start MySQL database
   - Have terminals ready
   - Import Postman collection
   - Prepare sample data

2. **Troubleshooting:**
   - Check ports 3000, 3001 available
   - Verify database connection
   - Ensure .env files configured

3. **Key Points to Emphasize:**
   - Security best practices
   - Clean code architecture
   - Responsive design
   - Error handling
   - Development workflow

4. **Interactive Elements:**
   - Show live form validation
   - Demonstrate API errors
   - Test mobile responsiveness
   - Show database records
