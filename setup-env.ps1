# ==================================================
# 🔧 Environment Configuration Generator (PowerShell)
# ==================================================
# Script này tự động tạo các file .env riêng cho backend và frontend
# từ file .env tập trung ở root project

# Màu sắc cho console output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$ForegroundColor = "White"
    )
    Write-Host $Message -ForegroundColor $ForegroundColor
}

function Read-EnvFile {
    param([string]$FilePath)
    
    if (-not (Test-Path $FilePath)) {
        throw "Không thể đọc file $FilePath"
    }
    
    $envVars = @{}
    $content = Get-Content $FilePath
    
    foreach ($line in $content) {
        $line = $line.Trim()
        if ($line -and -not $line.StartsWith('#') -and $line.Contains('=')) {
            $parts = $line.Split('=', 2)
            if ($parts.Length -eq 2) {
                $key = $parts[0].Trim()
                $value = $parts[1].Trim()
                $envVars[$key] = $value
            }
        }
    }
    
    return $envVars
}

function Generate-BackendEnv {
    param([hashtable]$EnvVars)
    
    $backendVars = @(
        'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 'DATABASE_URL',
        'JWT_SECRET', 'JWT_EXPIRES_IN',
        'NODE_ENV', 'PORT', 'BACKEND_URL',
        'FRONTEND_URL', 'ALLOWED_ORIGINS',
        'MAIL_HOST', 'MAIL_PORT', 'MAIL_USERNAME', 'MAIL_PASSWORD', 'MAIL_FROM',
        'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_S3_BUCKET',
        'BCRYPT_SALT_ROUNDS', 'RATE_LIMIT_WINDOW_MS', 'RATE_LIMIT_MAX_REQUESTS',
        'LOG_LEVEL', 'ENABLE_CORS', 'ENABLE_SWAGGER', 'DATABASE_LOGGING'
    )
    
    $content = @"
# ==================================================
# 🚀 BACKEND ENVIRONMENT CONFIGURATION
# ==================================================
# Generated from root .env file
# DO NOT EDIT MANUALLY - Use setup-env.ps1 script instead
#

"@

    foreach ($key in $backendVars) {
        if ($EnvVars.ContainsKey($key)) {
            $content += "$key=$($EnvVars[$key])`n"
        }
    }
    
    return $content
}

function Generate-FrontendEnv {
    param([hashtable]$EnvVars)
    
    $frontendVars = @(
        'NEXT_PUBLIC_API_URL', 'NEXT_PUBLIC_FRONTEND_URL', 'NEXT_PUBLIC_API_BASE_URL',
        'NEXTAUTH_SECRET', 'NEXTAUTH_URL', 'NEXTAUTH_URL_INTERNAL',
        'NEXT_PUBLIC_GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET',
        'NEXT_PUBLIC_FACEBOOK_APP_ID', 'FACEBOOK_APP_SECRET',
        'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET',
        'GOOGLE_ANALYTICS_ID', 'SENTRY_DSN',
        'NODE_ENV'
    )
    
    $content = @"
# ==================================================
# 🎨 FRONTEND ENVIRONMENT CONFIGURATION
# ==================================================
# Generated from root .env file
# DO NOT EDIT MANUALLY - Use setup-env.ps1 script instead
#

"@

    foreach ($key in $frontendVars) {
        if ($EnvVars.ContainsKey($key)) {
            $content += "$key=$($EnvVars[$key])`n"
        }
    }
    
    return $content
}

function Write-EnvFile {
    param(
        [string]$FilePath,
        [string]$Content
    )
    
    try {
        $dir = Split-Path $FilePath -Parent
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }
        
        Set-Content -Path $FilePath -Value $Content -Encoding UTF8
        return $true
    }
    catch {
        Write-ColorOutput "❌ Lỗi khi ghi file ${FilePath}: $($_.Exception.Message)" "Red"
        return $false
    }
}

# Main script
Write-ColorOutput "🔧 Environment Configuration Generator" "Cyan"
Write-ColorOutput "=========================================" "Cyan"

$rootEnvPath = Join-Path $PSScriptRoot ".env"
$rootEnvExamplePath = Join-Path $PSScriptRoot ".env.example"

# Kiểm tra file .env tồn tại
$envFilePath = $rootEnvPath
if (-not (Test-Path $rootEnvPath)) {
    Write-ColorOutput "⚠️  File .env không tồn tại, sử dụng .env.example" "Yellow"
    $envFilePath = $rootEnvExamplePath
    
    if (-not (Test-Path $rootEnvExamplePath)) {
        Write-ColorOutput "❌ Không tìm thấy file .env hoặc .env.example" "Red"
        exit 1
    }
}

try {
    # Đọc environment variables
    Write-ColorOutput "📖 Đọc environment variables từ $(Split-Path $envFilePath -Leaf)..." "Blue"
    $envVars = Read-EnvFile -FilePath $envFilePath
    
    # Generate backend .env
    Write-ColorOutput "🖥️  Tạo blog-backend/.env..." "Blue"
    $backendEnv = Generate-BackendEnv -EnvVars $envVars
    $backendPath = Join-Path $PSScriptRoot "blog-backend\.env"
    
    if (Write-EnvFile -FilePath $backendPath -Content $backendEnv) {
        Write-ColorOutput "✅ Tạo thành công: $backendPath" "Green"
    }
    
    # Generate frontend .env.local
    Write-ColorOutput "🎨 Tạo blog-frontend/.env.local..." "Blue"
    $frontendEnv = Generate-FrontendEnv -EnvVars $envVars
    $frontendPath = Join-Path $PSScriptRoot "blog-frontend\.env.local"
    
    if (Write-EnvFile -FilePath $frontendPath -Content $frontendEnv) {
        Write-ColorOutput "✅ Tạo thành công: $frontendPath" "Green"
    }
    
    Write-ColorOutput "" "White"
    Write-ColorOutput "🎉 Hoàn thành! Environment files đã được tạo." "Green"
    Write-ColorOutput "" "White"
    Write-ColorOutput "📋 Next steps:" "Yellow"
    Write-ColorOutput "1. Kiểm tra và cập nhật các giá trị trong file .env nếu cần" "Yellow"
    Write-ColorOutput "2. Chạy lại script này mỗi khi cập nhật .env" "Yellow"
    Write-ColorOutput "3. Đảm bảo .env không được commit vào Git" "Yellow"
    
} catch {
    Write-ColorOutput "❌ Lỗi: $($_.Exception.Message)" "Red"
    exit 1
}