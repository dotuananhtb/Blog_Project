#!/usr/bin/env node

/**
 * 🔧 Environment Configuration Generator
 *
 * Script này tự động tạo các file .env riêng cho backend và frontend
 * từ file .env tập trung ở root project
 */

const fs = require("fs");
const path = require("path");

// Màu sắc cho console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function readEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    const envVars = {};

    lines.forEach((line) => {
      line = line.trim();
      if (line && !line.startsWith("#") && line.includes("=")) {
        const [key, ...valueParts] = line.split("=");
        const value = valueParts.join("=");
        envVars[key.trim()] = value.trim();
      }
    });

    return envVars;
  } catch (error) {
    throw new Error(`Không thể đọc file ${filePath}: ${error.message}`);
  }
}

function generateBackendEnv(envVars) {
  const backendVars = [
    // Database
    "DB_HOST",
    "DB_PORT",
    "DB_USERNAME",
    "DB_PASSWORD",
    "DB_NAME",
    "DATABASE_URL",

    // JWT & Auth
    "JWT_SECRET",
    "JWT_EXPIRES_IN",

    // Server Config
    "NODE_ENV",
    "PORT",
    "BACKEND_URL",

    // CORS
    "FRONTEND_URL",
    "ALLOWED_ORIGINS",

    // Email (optional)
    "MAIL_HOST",
    "MAIL_PORT",
    "MAIL_USERNAME",
    "MAIL_PASSWORD",
    "MAIL_FROM",

    // Cloud Storage (optional)
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_REGION",
    "AWS_S3_BUCKET",

    // Security
    "BCRYPT_SALT_ROUNDS",
    "RATE_LIMIT_WINDOW_MS",
    "RATE_LIMIT_MAX_REQUESTS",

    // Development
    "LOG_LEVEL",
    "ENABLE_CORS",
    "ENABLE_SWAGGER",
    "DATABASE_LOGGING",
  ];

  let content = `# ==================================================
# 🚀 BACKEND ENVIRONMENT CONFIGURATION
# ==================================================
# Generated from root .env file
# DO NOT EDIT MANUALLY - Use setup-env.js script instead
#

`;

  backendVars.forEach((key) => {
    if (envVars[key]) {
      content += `${key}=${envVars[key]}\n`;
    }
  });

  return content;
}

function generateFrontendEnv(envVars) {
  const frontendVars = [
    // API URLs
    "NEXT_PUBLIC_API_URL",
    "NEXT_PUBLIC_FRONTEND_URL",
    "NEXT_PUBLIC_API_BASE_URL",

    // NextAuth
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "NEXTAUTH_URL_INTERNAL",

    // OAuth Providers
    "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "NEXT_PUBLIC_FACEBOOK_APP_ID",
    "FACEBOOK_APP_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",

    // Analytics
    "GOOGLE_ANALYTICS_ID",
    "SENTRY_DSN",

    // General
    "NODE_ENV",
  ];

  let content = `# ==================================================
# 🎨 FRONTEND ENVIRONMENT CONFIGURATION
# ==================================================
# Generated from root .env file
# DO NOT EDIT MANUALLY - Use setup-env.js script instead
#

`;

  frontendVars.forEach((key) => {
    if (envVars[key]) {
      content += `${key}=${envVars[key]}\n`;
    }
  });

  return content;
}

function writeEnvFile(filePath, content) {
  try {
    // Tạo thư mục nếu chưa tồn tại
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, "utf8");
    return true;
  } catch (error) {
    log(`❌ Lỗi khi ghi file ${filePath}: ${error.message}`, "red");
    return false;
  }
}

function main() {
  log("🔧 Environment Configuration Generator", "cyan");
  log("=========================================", "cyan");

  const rootEnvPath = path.join(__dirname, ".env");
  const rootEnvExamplePath = path.join(__dirname, ".env.example");

  // Kiểm tra file .env tồn tại
  let envFilePath = rootEnvPath;
  if (!fs.existsSync(rootEnvPath)) {
    log(`⚠️  File .env không tồn tại, sử dụng .env.example`, "yellow");
    envFilePath = rootEnvExamplePath;

    if (!fs.existsSync(rootEnvExamplePath)) {
      log("❌ Không tìm thấy file .env hoặc .env.example", "red");
      process.exit(1);
    }
  }

  try {
    // Đọc environment variables
    log(
      `📖 Đọc environment variables từ ${path.basename(envFilePath)}...`,
      "blue"
    );
    const envVars = readEnvFile(envFilePath);

    // Generate backend .env
    log("🖥️  Tạo backend/.env...", "blue");
    const backendEnv = generateBackendEnv(envVars);
    const backendPath = path.join(__dirname, "blog-backend", ".env");

    if (writeEnvFile(backendPath, backendEnv)) {
      log(`✅ Tạo thành công: ${backendPath}`, "green");
    }

    // Generate frontend .env.local
    log("🎨 Tạo frontend/.env.local...", "blue");
    const frontendEnv = generateFrontendEnv(envVars);
    const frontendPath = path.join(__dirname, "blog-frontend", ".env.local");

    if (writeEnvFile(frontendPath, frontendEnv)) {
      log(`✅ Tạo thành công: ${frontendPath}`, "green");
    }

    log("", "reset");
    log("🎉 Hoàn thành! Environment files đã được tạo.", "green");
    log("", "reset");
    log("📋 Next steps:", "yellow");
    log(
      "1. Kiểm tra và cập nhật các giá trị trong file .env nếu cần",
      "yellow"
    );
    log("2. Chạy lại script này mỗi khi cập nhật .env", "yellow");
    log("3. Đảm bảo .env không được commit vào Git", "yellow");
  } catch (error) {
    log(`❌ Lỗi: ${error.message}`, "red");
    process.exit(1);
  }
}

// Chạy script
main();
