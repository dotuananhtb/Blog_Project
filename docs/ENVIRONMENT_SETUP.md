# 🔧 Environment Configuration Management

> Hướng dẫn quản lý environment configuration tập trung cho Blog Project

## 📁 Cấu trúc mới

```
Blog_Project/
├── .env.example              # ⭐ Template environment tập trung (commit được)
├── .env                      # 🔒 Environment thật (KHÔNG commit)
├── setup-env.js              # 🤖 Script Node.js tạo env files
├── setup-env.ps1             # 🤖 Script PowerShell tạo env files
├── generate-jwt-secret.js    # 🔐 JWT Secret generator (Node.js)
├── generate-jwt-secret.ps1   # 🔐 JWT Secret generator (PowerShell)
├── blog-backend/
│   └── .env                 # 🔄 Generated từ root .env
└── blog-frontend/
    └── .env.local           # 🔄 Generated từ root .env
```

## 🚀 Cách sử dụng

### Lần đầu setup

1. **Copy template environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Cập nhật giá trị thật trong `.env`:**

   ```bash
   # Ví dụ:
   DB_PASSWORD=my_real_password_123
   JWT_SECRET=super_secret_jwt_key_minimum_32_characters_long
   NEXTAUTH_SECRET=different_secret_for_nextauth_here
   ```

3. **Generate JWT_SECRET an toàn:**

   ```bash
   # Tự động generate và cập nhật JWT_SECRET
   node generate-jwt-secret.js

   # Hoặc sử dụng PowerShell (Windows)
   .\generate-jwt-secret.ps1
   ```

4. **Tạo environment files cho backend/frontend:**

   ```bash
   # Sử dụng Node.js
   node setup-env.js

   # Hoặc sử dụng PowerShell (Windows)
   .\setup-env.ps1
   ```

### Khi cập nhật environment

1. **Chỉnh sửa file `.env` ở root**
2. **Chạy lại script để sync:**
   ```bash
   node setup-env.js
   ```

## 📋 Environment Variables

### 🗄️ Database (Backend)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=blog_db
```

### 🔐 Authentication (Backend)

```env
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
```

### 🖥️ Server Configuration (Backend)

```env
NODE_ENV=development
PORT=3000
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
```

### 🎨 Frontend Configuration

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3001
```

### 🌐 External Services (Optional)

```env
# OAuth Providers
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# Cloud Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your_bucket_name
```

### 🔐 JWT Security Best Practices

#### JWT_SECRET Requirements:

```env
# ✅ Good - 64 characters (256 bits)
JWT_SECRET=a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456

# ❌ Bad - Too short and predictable
JWT_SECRET=mysecret123
```

#### Auto-generate JWT_SECRET:

```bash
# Generate cryptographically secure JWT_SECRET
node generate-jwt-secret.js

# Output example:
# JWT_SECRET=e12882a07f0649a1ec1d04ee6553e2e57be1c3d756038d484c091df083fea3dc
```

#### Environment Separation:

```env
# Development
JWT_SECRET=dev-6a8b2c4d8e9f1a2b3c4d5e6f7890abcdef123456789abcdef0123456789abcd

# Production
JWT_SECRET=prod-different-secret-key-never-use-dev-secrets-in-production-envs

# Staging
JWT_SECRET=staging-another-unique-secret-for-testing-environment-security
```

## 🛠️ Scripts

### Environment Management Scripts

#### Node.js Script (`setup-env.js`)

- ✅ Cross-platform (Windows, Mac, Linux)
- ✅ Colored output
- ✅ Error handling
- ✅ Automatic directory creation

#### PowerShell Script (`setup-env.ps1`)

- ✅ Windows optimized
- ✅ Native PowerShell experience
- ✅ Colored output
- ✅ Error handling

### JWT Security Scripts

#### JWT Secret Generator (`generate-jwt-secret.js`)

- ✅ **Cryptographically secure** random generation
- ✅ **Auto-update** .env files
- ✅ **Regenerate** backend/frontend env files
- ✅ **Security validation** (minimum 256 bits)

```bash
# Generate new JWT_SECRET and update all files
node generate-jwt-secret.js

# Output:
# 🔐 JWT Secret Generator
# 📋 JWT_SECRET mới: e12882a07f0649a1ec1d04ee6553e2e5...
# ✅ Đã cập nhật .env files
```

#### PowerShell JWT Generator (`generate-jwt-secret.ps1`)

```powershell
# Windows native JWT secret generation
.\generate-jwt-secret.ps1
```

- ✅ Colored output
- ✅ Error handling

## 🔒 Security Features

### File Protection

- `.env` files automatically ignored by Git
- Template `.env.example` safe to commit
- Generated files có header warning

### Separation of Concerns

- **Backend variables**: Database, JWT, server config
- **Frontend variables**: API URLs, NextAuth, public configs
- **Shared variables**: NODE_ENV

### Best Practices

- ✅ Strong password requirements
- ✅ Separate secrets cho different services
- ✅ Environment-specific URLs
- ✅ Optional variables clearly marked

## 🚀 Environment Types

### Development

```env
NODE_ENV=development
DB_HOST=localhost
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3000
```

### Staging

```env
NODE_ENV=staging
DB_HOST=staging-db.yourcompany.com
FRONTEND_URL=https://staging.yourdomain.com
BACKEND_URL=https://api-staging.yourdomain.com
```

### Production

```env
NODE_ENV=production
DB_HOST=prod-db.yourcompany.com
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

## 📝 Package.json Scripts (Recommended)

Thêm vào `package.json` ở root:

```json
{
  "scripts": {
    "setup:env": "node setup-env.js",
    "setup:env:windows": "powershell -ExecutionPolicy Bypass -File setup-env.ps1",
    "dev:setup": "npm run setup:env && npm run dev",
    "check:env": "node -e \"console.log('ENV check:', process.env.NODE_ENV)\""
  }
}
```

## 🔍 Troubleshooting

### Script không chạy được

```bash
# Đảm bảo Node.js installed
node --version

# Chạy với quyền admin (nếu cần)
sudo node setup-env.js
```

### PowerShell execution policy

```powershell
# Cho phép chạy scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Hoặc chạy 1 lần
powershell -ExecutionPolicy Bypass -File setup-env.ps1
```

### Environment variables không load

1. Kiểm tra file `.env` có tồn tại
2. Restart development servers sau khi chạy script
3. Verify file paths trong terminal

## 🎯 Lợi ích

### ✅ Centralized Management

- Tất cả config ở 1 nơi
- Dễ maintain và update
- Consistent across environments

### ✅ Security

- Template safe to share
- Actual values never committed
- Clear separation of concerns

### ✅ Developer Experience

- One command setup
- Automatic generation
- Clear documentation

### ✅ Team Collaboration

- Standardized environment setup
- Easy onboarding cho new developers
- Reduced configuration errors

## 📞 Support

Nếu gặp vấn đề với environment configuration:

1. **Check logs** từ setup script
2. **Verify file permissions**
3. **Check paths** trong terminal
4. **Review .gitignore** đảm bảo .env files ignored

---

**Tip**: Luôn backup file `.env` production một cách bảo mật trước khi thay đổi!
