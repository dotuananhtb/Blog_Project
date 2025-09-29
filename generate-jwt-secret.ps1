# ==================================================
# 🔐 JWT Secret Generator (PowerShell)
# ==================================================
# Script này tạo JWT_SECRET an toàn và cập nhật file .env

param(
    [switch]$Help
)

if ($Help) {
    Write-Host "🔐 JWT Secret Generator" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\generate-jwt-secret.ps1" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  -Help    Show this help message" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Description:" -ForegroundColor Blue
    Write-Host "  Generates a cryptographically secure JWT_SECRET and updates" -ForegroundColor Blue
    Write-Host "  your .env files automatically." -ForegroundColor Blue
    exit 0
}

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$ForegroundColor = "White"
    )
    Write-Host $Message -ForegroundColor $ForegroundColor
}

function Generate-JwtSecret {
    param([int]$Length = 32)
    
    # Generate random bytes and convert to hex
    $bytes = New-Object byte[] $Length
    $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::Create()
    $rng.GetBytes($bytes)
    $rng.Dispose()
    
    return [System.BitConverter]::ToString($bytes) -replace '-', '' | ForEach-Object { $_.ToLower() }
}

function Update-EnvFile {
    param(
        [string]$FilePath,
        [string]$NewSecret
    )
    
    try {
        if (-not (Test-Path $FilePath)) {
            Write-ColorOutput "❌ File $FilePath không tồn tại!" "Red"
            return $false
        }
        
        $content = Get-Content $FilePath -Raw
        
        # Tìm và thay thế JWT_SECRET
        if ($content -match '^JWT_SECRET=.*$') {
            $content = $content -replace '^JWT_SECRET=.*$', "JWT_SECRET=$NewSecret"
            Set-Content -Path $FilePath -Value $content.TrimEnd() -NoNewline
            Write-ColorOutput "✅ Đã cập nhật JWT_SECRET trong $(Split-Path $FilePath -Leaf)" "Green"
            return $true
        } else {
            Write-ColorOutput "⚠️  Không tìm thấy JWT_SECRET trong $(Split-Path $FilePath -Leaf)" "Yellow"
            return $false
        }
    }
    catch {
        Write-ColorOutput "❌ Lỗi khi cập nhật ${FilePath}: $($_.Exception.Message)" "Red"
        return $false
    }
}

# Main script
Write-ColorOutput "🔐 JWT Secret Generator" "Cyan"
Write-ColorOutput "================================" "Cyan"
Write-ColorOutput "" "White"

# Generate new JWT secret
$newJwtSecret = Generate-JwtSecret -Length 32

Write-ColorOutput "📋 JWT_SECRET mới đã được tạo:" "Blue"
Write-ColorOutput $newJwtSecret "White"
Write-ColorOutput "" "White"

# Security info
Write-ColorOutput "🔒 Thông tin bảo mật:" "Yellow"
Write-ColorOutput "   • Độ dài: $($newJwtSecret.Length) characters ($($newJwtSecret.Length * 4) bits)" "Yellow"
Write-ColorOutput "   • Entropy: Cryptographically secure random" "Yellow"
Write-ColorOutput "   • Phù hợp cho: Production environment" "Yellow"
Write-ColorOutput "" "White"

# Paths to env files
$rootEnvPath = Join-Path $PSScriptRoot ".env"
$rootEnvExamplePath = Join-Path $PSScriptRoot ".env.example"

$updated = $false

# Update root .env file
if (Test-Path $rootEnvPath) {
    Write-ColorOutput "🔄 Cập nhật root .env file..." "Blue"
    if (Update-EnvFile -FilePath $rootEnvPath -NewSecret $newJwtSecret) {
        $updated = $true
    }
} else {
    Write-ColorOutput "⚠️  Root .env file không tồn tại, tạo từ template..." "Yellow"
    
    if (Test-Path $rootEnvExamplePath) {
        # Copy .env.example to .env
        $templateContent = Get-Content $rootEnvExamplePath -Raw
        
        # Update JWT_SECRET in template content
        $templateContent = $templateContent -replace '^JWT_SECRET=.*$', "JWT_SECRET=$newJwtSecret"
        
        Set-Content -Path $rootEnvPath -Value $templateContent.TrimEnd() -NoNewline
        Write-ColorOutput "✅ Đã tạo .env file với JWT_SECRET mới" "Green"
        $updated = $true
    } else {
        Write-ColorOutput "❌ Không tìm thấy .env.example template" "Red"
    }
}

if ($updated) {
    Write-ColorOutput "" "White"
    Write-ColorOutput "🚀 Regenerating environment files..." "Blue"
    
    # Run setup-env.js to update backend/frontend env files
    try {
        $output = & node "setup-env.js" 2>&1
        Write-Output $output
        
        Write-ColorOutput "" "White"
        Write-ColorOutput "🎉 Hoàn thành! JWT_SECRET đã được cập nhật." "Green"
        Write-ColorOutput "" "White"
        Write-ColorOutput "📋 Next steps:" "Yellow"
        Write-ColorOutput "1. Restart backend server để áp dụng JWT_SECRET mới" "Yellow"
        Write-ColorOutput "2. Existing JWT tokens sẽ invalid - users cần login lại" "Yellow"
        Write-ColorOutput "3. Đảm bảo backup JWT_SECRET này một cách bảo mật" "Yellow"
        Write-ColorOutput "" "White"
        Write-ColorOutput "⚠️  Security reminder:" "Red"
        Write-ColorOutput "   • KHÔNG share JWT_SECRET publicly" "Red"
        Write-ColorOutput "   • Sử dụng different secrets cho dev/staging/production" "Red"
        Write-ColorOutput "   • Rotate JWT_SECRET định kỳ trong production" "Red"
    }
    catch {
        Write-ColorOutput "❌ Có lỗi khi regenerate environment files: $($_.Exception.Message)" "Red"
    }
} else {
    Write-ColorOutput "" "White"
    Write-ColorOutput "📋 Manual setup required:" "Yellow"
    Write-ColorOutput "1. Copy JWT_SECRET ở trên vào file .env" "Yellow"
    Write-ColorOutput "2. Chạy: node setup-env.js" "Yellow"
    Write-ColorOutput "3. Restart servers" "Yellow"
}