# 🚀 Blog Backend API (NestJS)

> Backend API cho Blog Authentication System

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Update .env with your database credentials

# Run development server
npm run start:dev
```

## API Endpoints

- **Base URL**: `http://localhost:3000/api/v1`
- **Health Check**: `GET /api/v1/health`
- **API Docs**: `GET /api/v1` (Swagger - Coming soon)

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Users

- `GET /users/profile` - Get user profile (Protected)
- `PUT /users/profile` - Update user profile (Protected)

### Posts (Placeholder)

- `GET /posts` - Get all posts
- `GET /posts/my-posts` - Get user's posts (Protected)

## Testing

```bash
# Automated API testing
node test-api.js

# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=blog_db

# JWT
JWT_SECRET=your_jwt_secret_key

# Application
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3001
```

## 📚 Documentation

Xem documentation chi tiết tại:

- **[Main README](../README.md)** - Tổng quan project
- **[Environment Setup](../docs/ENVIRONMENT_SETUP.md)** - Quản lý environment tập trung
- **[Setup Guide](../docs/SETUP_GUIDE.md)** - Hướng dẫn setup chi tiết
- **[Backend Details](../docs/BACKEND_DETAILS.md)** - Chi tiết backend architecture
- **[How to Run](../docs/HOW_TO_RUN.md)** - Hướng dẫn chạy step-by-step
- **[Demo Script](../docs/DEMO_SCRIPT.md)** - Script demo features

## Tech Stack

- **Framework**: NestJS
- **Database**: MySQL + TypeORM
- **Authentication**: JWT
- **Validation**: class-validator
- **Password**: bcrypt
- **Language**: TypeScript

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
