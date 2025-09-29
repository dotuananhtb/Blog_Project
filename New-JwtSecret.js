#!/usr/bin/env node

/**
 * 🔐 JWT Secret Generator
 *
 * Script này tạo JWT_SECRET an toàn và cập nhật file .env
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Màu sắc cho console
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

function generateJwtSecret(length = 32) {
  return crypto.randomBytes(length).toString("hex");
}

function updateEnvFile(filePath, newSecret) {
  try {
    if (!fs.existsSync(filePath)) {
      log(`❌ File ${filePath} không tồn tại!`, "red");
      return false;
    }

    let content = fs.readFileSync(filePath, "utf8");

    // Tìm và thay thế JWT_SECRET
    const jwtSecretRegex = /^JWT_SECRET=.*$/m;

    if (jwtSecretRegex.test(content)) {
      content = content.replace(jwtSecretRegex, `JWT_SECRET=${newSecret}`);
      fs.writeFileSync(filePath, content, "utf8");
      log(
        `✅ Đã cập nhật JWT_SECRET trong ${path.basename(filePath)}`,
        "green"
      );
      return true;
    } else {
      log(
        `⚠️  Không tìm thấy JWT_SECRET trong ${path.basename(filePath)}`,
        "yellow"
      );
      return false;
    }
  } catch (error) {
    log(`❌ Lỗi khi cập nhật ${filePath}: ${error.message}`, "red");
    return false;
  }
}

function main() {
  log("🔐 JWT Secret Generator", "cyan");
  log("================================", "cyan");
  log("", "reset");

  // Generate new JWT secret
  const newJwtSecret = generateJwtSecret(32); // 32 bytes = 256 bits

  log("📋 JWT_SECRET mới đã được tạo:", "blue");
  log(`${newJwtSecret}`, "bright");
  log("", "reset");

  // Security info
  log("🔒 Thông tin bảo mật:", "yellow");
  log(
    `   • Độ dài: ${newJwtSecret.length} characters (${
      newJwtSecret.length * 4
    } bits)`,
    "yellow"
  );
  log(`   • Entropy: Cryptographically secure random`, "yellow");
  log(`   • Phù hợp cho: Production environment`, "yellow");
  log("", "reset");

  // Paths to env files
  const rootEnvPath = path.join(__dirname, ".env");
  const rootEnvExamplePath = path.join(__dirname, ".env.example");

  let updated = false;

  // Update root .env file
  if (fs.existsSync(rootEnvPath)) {
    log("🔄 Cập nhật root .env file...", "blue");
    if (updateEnvFile(rootEnvPath, newJwtSecret)) {
      updated = true;
    }
  } else {
    log("⚠️  Root .env file không tồn tại, tạo từ template...", "yellow");

    if (fs.existsSync(rootEnvExamplePath)) {
      // Copy .env.example to .env
      let templateContent = fs.readFileSync(rootEnvExamplePath, "utf8");

      // Update JWT_SECRET in template content
      templateContent = templateContent.replace(
        /^JWT_SECRET=.*$/m,
        `JWT_SECRET=${newJwtSecret}`
      );

      fs.writeFileSync(rootEnvPath, templateContent, "utf8");
      log("✅ Đã tạo .env file với JWT_SECRET mới", "green");
      updated = true;
    } else {
      log("❌ Không tìm thấy .env.example template", "red");
    }
  }

  if (updated) {
    log("", "reset");
    log("🚀 Regenerating environment files...", "blue");

    // Run setup-env.js to update backend/frontend env files
    const { spawn } = require("child_process");
    const setupEnv = spawn("node", ["setup-env.js"], {
      stdio: "pipe",
      cwd: __dirname,
    });

    setupEnv.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    setupEnv.stderr.on("data", (data) => {
      process.stderr.write(data);
    });

    setupEnv.on("close", (code) => {
      log("", "reset");
      if (code === 0) {
        log("🎉 Hoàn thành! JWT_SECRET đã được cập nhật.", "green");
        log("", "reset");
        log("📋 Next steps:", "yellow");
        log("1. Restart backend server để áp dụng JWT_SECRET mới", "yellow");
        log(
          "2. Existing JWT tokens sẽ invalid - users cần login lại",
          "yellow"
        );
        log("3. Đảm bảo backup JWT_SECRET này một cách bảo mật", "yellow");
        log("", "reset");
        log("⚠️  Security reminder:", "red");
        log("   • KHÔNG share JWT_SECRET publicly", "red");
        log("   • Sử dụng different secrets cho dev/staging/production", "red");
        log("   • Rotate JWT_SECRET định kỳ trong production", "red");
      } else {
        log("❌ Có lỗi khi regenerate environment files", "red");
      }
    });
  } else {
    log("", "reset");
    log("📋 Manual setup required:", "yellow");
    log("1. Copy JWT_SECRET ở trên vào file .env", "yellow");
    log("2. Chạy: node setup-env.js", "yellow");
    log("3. Restart servers", "yellow");
  }
}

// Show help if requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  log("🔐 JWT Secret Generator", "cyan");
  log("", "reset");
  log("Usage:", "yellow");
  log("  node New-JwtSecret.js", "yellow");
  log("", "reset");
  log("Options:", "yellow");
  log("  --help, -h    Show this help message", "yellow");
  log("", "reset");
  log("Description:", "blue");
  log("  Generates a cryptographically secure JWT_SECRET and updates", "blue");
  log("  your .env files automatically.", "blue");
  process.exit(0);
}

// Run main function
main();
