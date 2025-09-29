# 🎨 Blog Frontend (Next.js)

> Frontend Web Application cho Blog Authentication System

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Update NEXT_PUBLIC_API_URL=http://localhost:3000

# Run development server
npm run dev
```

## Features

- ✅ **Responsive Design** với Tailwind CSS
- ✅ **Authentication** với JWT tokens
- ✅ **Form Validation** với react-hook-form + yup
- ✅ **TypeScript** support
- ✅ **Modern Layout** components
- ✅ **API Integration** với backend

## Pages

- **Homepage** (`/`) - Landing page
- **Register** (`/register`) - User registration form
- **Login** (`/login`) - User login form
- **Dashboard** (Coming soon) - User dashboard

## Components

### Layout Components

- `Header` - Navigation với user menu
- `Sidebar` - User info và navigation
- `Footer` - Links và social media
- `Layout` - Main layout wrapper

### Authentication

- `useAuth` hook - Authentication context
- Form components với validation
- Protected route wrapper

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3001

# Authentication (if using NextAuth)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3001
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📚 Documentation

Xem documentation chi tiết tại:

- **[Main README](../README.md)** - Tổng quan project
- **[Environment Setup](../docs/ENVIRONMENT_SETUP.md)** - Quản lý environment tập trung
- **[Setup Guide](../docs/SETUP_GUIDE.md)** - Hướng dẫn setup chi tiết
- **[How to Run](../docs/HOW_TO_RUN.md)** - Hướng dẫn chạy step-by-step

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: react-hook-form + yup
- **HTTP Client**: Axios
- **State Management**: React Context
- **Authentication**: JWT + Cookies

## API Integration

Frontend kết nối với backend qua REST API:

- Base URL: `http://localhost:3000/api/v1`
- Authentication: JWT tokens in cookies
- Error handling: Custom error boundaries

```typescript
// Example API call
const response = await api.post("/auth/login", {
  email: "user@example.com",
  password: "password123",
});
```
