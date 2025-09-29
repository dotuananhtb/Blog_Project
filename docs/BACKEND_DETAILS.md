# Blog Authentication System Backend

Backend API cho Blog System sử dụng NestJS với JWT Authentication.

## Tính năng

- ✅ User Registration với validation
- ✅ JWT Authentication (Login/Logout)
- ✅ Password hashing với bcrypt
- ✅ User profile management (GET, PUT)
- ✅ RESTful API structure với versioning
- ✅ TypeORM integration với MySQL
- ✅ Global validation pipes
- ✅ CORS enabled cho frontend integration

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Đăng ký user mới
- `POST /api/v1/auth/login` - Đăng nhập user
- `POST /api/v1/auth/logout` - Đăng xuất user (cần JWT token)

### Users

- `GET /api/v1/users/profile` - Lấy thông tin profile (cần JWT token)
- `PUT /api/v1/users/profile` - Cập nhật profile (cần JWT token)

### Posts (Placeholder)

- `GET /api/v1/posts` - Lấy tất cả posts
- `GET /api/v1/posts/my-posts` - Lấy posts của user (cần JWT token)

### Health Check

- `GET /api/v1/health` - Kiểm tra trạng thái API

## Setup Instructions

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình Database

Tạo database MySQL với tên `blog_db` hoặc cập nhật file `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=blog_db
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=3000
```

### 3. Chạy ứng dụng

```bash
# Development mode với watch
npm run start:dev

# Production mode
npm run start:prod
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## Database Schema

### User Entity

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  role ENUM('admin', 'user', 'moderator') DEFAULT 'user',
  bio VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Postman Collection

Import file `Blog_API_Collection.postman_collection.json` vào Postman để test các API endpoints.

### Environment Variables cần thiết:

- `base_url`: http://localhost:3000
- `access_token`: (tự động set sau khi login)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Kiến trúc Project

```
src/
├── auth/                 # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── users/                # Users module
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── posts/                # Posts module (placeholder)
│   ├── posts.controller.ts
│   └── posts.service.ts
├── entities/             # Database entities
│   └── user.entity.ts
├── dto/                  # Data Transfer Objects
│   └── auth.dto.ts
├── config/               # Configuration files
│   └── database.config.ts
├── app.module.ts
├── app.controller.ts
└── main.ts
```

## Security Features

- Password hashing với bcrypt (salt rounds: 12)
- JWT tokens với 7 ngày expiration
- Input validation với class-validator
- CORS protection
- Environment variables cho sensitive data

## Next Steps

1. Implement Posts CRUD operations
2. Add file upload cho avatars
3. Implement refresh tokens
4. Add rate limiting
5. Add logging và monitoring
6. Add unit tests cho tất cả services
7. Deploy lên cloud platform

## Troubleshooting

### Database Connection Issues

- Đảm bảo MySQL đang chạy
- Kiểm tra thông tin database trong file `.env`
- Tạo database nếu chưa có

### JWT Issues

- Đảm bảo `JWT_SECRET` được set trong `.env`
- Token có thể expired, cần login lại

## Support

Nếu có vấn đề gì, hãy check:

1. Logs trong terminal
2. Database connection
3. Environment variables
4. Port conflicts (3000 đã được sử dụng chưa)
