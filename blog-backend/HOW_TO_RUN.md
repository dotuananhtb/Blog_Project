# 🚀 HƯỚNG DẪN CHẠY DỰ ÁN BLOG AUTHENTICATION SYSTEM

## Bước 1: Chuẩn bị môi trường

### Yêu cầu:

- Node.js (v16+)
- MySQL Server đang chạy
- Git

## Bước 2: Setup Database

### Option A: Sử dụng MySQL root user

1. Mở MySQL Workbench hoặc command line
2. Tạo database:

```sql
CREATE DATABASE blog_db;
```

3. Cập nhật file `.env` với password root:

```env
DB_PASSWORD=your_mysql_root_password
```

### Option B: Tạo user riêng (KHUYÊN DÙNG)

1. Chạy file `database-setup.sql`:

```bash
mysql -u root -p < database-setup.sql
```

2. Copy `.env.with-new-user` thành `.env`:

```bash
copy .env.with-new-user .env
```

## Bước 3: Chạy Backend

```bash
# Di chuyển vào thư mục backend
cd project

# Cài đặt dependencies (nếu chưa có)
npm install

# Chạy development server
npm run start:dev
```

**Kết quả mong đợi:**

```
[Nest] Starting Nest application...
[Nest] TypeOrmModule dependencies initialized
[Nest] Application is running on: http://localhost:3000
```

**Test API:**

- Health check: http://localhost:3000/api/v1/health
- API docs: http://localhost:3000/api/v1

## Bước 4: Test API với script

```bash
# Test tự động tất cả endpoints
node test-api.js
```

## Bước 5: Chạy Frontend (Terminal mới)

```bash
# Di chuyển vào thư mục frontend
cd ../blog-frontend

# Cài đặt dependencies
npm install

# Tạo file env
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local

# Chạy development server
npm run dev
```

**Kết quả mong đợi:**

```
ready - started server on 0.0.0.0:3001
```

## Bước 6: Truy cập ứng dụng

### Backend API:

- **Health Check:** http://localhost:3000/api/v1/health
- **API Base:** http://localhost:3000/api/v1/

### Frontend Web:

- **Homepage:** http://localhost:3001
- **Register:** http://localhost:3001/register
- **Login:** http://localhost:3001/login

## Bước 7: Test chức năng

1. **Đăng ký tài khoản mới:**
   - Vào http://localhost:3001/register
   - Điền form và submit

2. **Đăng nhập:**
   - Vào http://localhost:3001/login
   - Đăng nhập với tài khoản vừa tạo

3. **Test API với Postman:**
   - Import file: `Blog_API_Collection.postman_collection.json`
   - Set environment variable: `base_url = http://localhost:3000`

## 🔧 Troubleshooting

### Lỗi Database Connection:

```
Error: Access denied for user 'root'@'localhost'
```

**Fix:** Cập nhật `DB_PASSWORD` trong file `.env`

### Lỗi Port đã sử dụng:

```
Error: listen EADDRINUSE :::3000
```

**Fix:**

- Backend: Đổi `PORT=3001` trong `.env`
- Frontend: Đổi port trong `package.json` hoặc dùng `npm run dev -- -p 3002`

### Lỗi Module not found (Frontend):

```
Cannot find module '@/hooks/useAuth'
```

**Fix:** Kiểm tra file `tsconfig.json` có paths mapping đúng

### Database tables không tồn tại:

TypeORM sẽ tự động tạo tables khi khởi động (synchronize: true)

## 📁 Cấu trúc Project

```
blog-system/
├── project/                 # Backend (NestJS)
│   ├── src/
│   ├── .env                # Database config
│   └── package.json
├── blog-frontend/          # Frontend (NextJS)
│   ├── src/
│   ├── .env.local         # API URL
│   └── package.json
└── README.md
```

## 🎯 Demo Flow

1. Khởi động cả backend và frontend
2. Vào http://localhost:3001/register
3. Tạo tài khoản mới
4. Đăng nhập và test các chức năng
5. Check database để xem data được lưu

## 📞 Support

Nếu gặp lỗi, check:

1. MySQL đang chạy?
2. Port 3000, 3001 available?
3. File .env configured đúng?
4. Dependencies đã install?

**Logs quan trọng:**

- Backend: Terminal chạy `npm run start:dev`
- Frontend: Terminal chạy `npm run dev`
- Database: MySQL logs
