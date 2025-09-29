# 🔒 Hướng Dẫn Bảo Mật - Security Guidelines

## ⚠️ QUAN TRỌNG: Những gì KHÔNG được commit lên Git

### 🚫 Files tuyệt đối KHÔNG commit:

- `.env` - File environment chứa mật khẩu thật
- `*.env.local`, `*.env.production` - Environment files với dữ liệu thật
- `database.config.ts` - Nếu chứa thông tin database thật
- `*.key`, `*.pem`, `*.crt` - SSL certificates và private keys
- `secrets.json`, `credentials.json` - Files chứa API keys
- `jwt.secret` - JWT secret keys

### ✅ Files được phép commit:

- `.env.example` - Template environment file (không chứa dữ liệu thật)
- `.env.template` - Template files

## 🛠️ Setup Environment cho Development

### Backend Setup:

1. Copy file `blog-backend/.env.example` thành `blog-backend/.env`:

   ```bash
   cp blog-backend/.env.example blog-backend/.env
   ```

2. Cập nhật các giá trị trong `blog-backend/.env` với thông tin thật:
   ```bash
   DB_PASSWORD=your_real_password_here
   JWT_SECRET=your_real_jwt_secret_here
   ```

### Frontend Setup:

1. Copy file `blog-frontend/.env.example` thành `blog-frontend/.env.local`:

   ```bash
   cp blog-frontend/.env.example blog-frontend/.env.local
   ```

2. Cập nhật các API URLs và secrets:
   ```bash
   NEXTAUTH_SECRET=your_real_nextauth_secret
   ```

## 🔍 Kiểm tra trước khi commit

Trước khi commit code, luôn chạy từ **thư mục root** của project:

```bash
git status
```

Đảm bảo KHÔNG có files nhạy cảm nào trong danh sách sẽ được commit.

### 📁 Git Structure

Project này sử dụng **một repository duy nhất** ở thư mục root để quản lý cả backend và frontend:

```
Blog_Project/           ← Git repository ở đây
├── .gitignore         ← File .gitignore chính
├── blog-backend/      ← NestJS backend (không có .git riêng)
├── blog-frontend/     ← Next.js frontend (không có .git riêng)
└── SECURITY.md        ← File này
```

**Lưu ý:** Tất cả Git commands phải chạy từ thư mục `Blog_Project/`

## 🆘 Nếu đã commit nhầm file mật khẩu

1. **Ngay lập tức đổi tất cả passwords/secrets** đã bị lộ
2. Remove file khỏi Git history:
   ```bash
   git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all
   ```
3. Force push (⚠️ cẩn thận):
   ```bash
   git push origin --force --all
   ```

## 📝 Best Practices

1. **Luôn sử dụng environment variables** cho mọi thông tin nhạy cảm
2. **Không hardcode** passwords, API keys trong source code
3. **Review code** trước khi commit
4. **Sử dụng strong passwords** và rotate định kỳ
5. **Enable 2FA** cho tất cả accounts quan trọng

## 🔧 Tools hỗ trợ

- **git-secrets**: Scan commits để tìm secrets
- **truffleHog**: Tìm secrets trong Git history
- **GitGuardian**: Monitor repos để phát hiện secrets

---

**Nhớ: An toàn hơn là xin lỗi sau! 🛡️**
