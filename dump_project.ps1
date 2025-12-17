# Nexus OS - Project Context Dumper
# This script combines all relevant code into one text file for AI analysis.

$OutputFile = "nexus_full_context.txt"
$RootPath = Get-Location

# 1. Start fresh
if (Test-Path $OutputFile) { Remove-Item $OutputFile }
New-Item -Path $OutputFile -ItemType File | Out-Null

Write-Host "🚀 Starting Nexus OS Dump..." -ForegroundColor Cyan

# 2. Define folders/files to IGNORE (The Junk List)
$excludePatterns = @(
    "node_modules", 
    ".next", 
    ".git", 
    ".vscode", 
    "package-lock.json", 
    "yarn.lock", 
    "nexus_full_context.txt", 
    "dump_project.ps1",
    "*.ico",
    "*.png",
    "*.jpg",
    "*.jpeg",
    "*.svg"
)

# 3. Find all code files recursively
# We only look for specific file types to keep it clean
$files = Get-ChildItem -Path $RootPath -Recurse -Include "*.ts", "*.tsx", "*.js", "*.css", "*.prisma", "*.json", ".env.local" | Where-Object {
    $path = $_.FullName
    $shouldSkip = $false
    foreach ($pattern in $excludePatterns) {
        if ($path -like "*\$pattern*") {
            $shouldSkip = $true
            break
        }
    }
    return -not $shouldSkip
}

# 4. Write them to the single text file
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($RootPath.Path.Length + 1)
    
    Add-Content -Path $OutputFile -Value "================================================================================"
    Add-Content -Path $OutputFile -Value "FILE PATH: $relativePath"
    Add-Content -Path $OutputFile -Value "================================================================================"
    Add-Content -Path $OutputFile -Value ""
    
    try {
        $content = Get-Content -Path $file.FullName -Raw
        Add-Content -Path $OutputFile -Value $content
    } catch {
        Add-Content -Path $OutputFile -Value "[Error reading file]"
    }
    
    Add-Content -Path $OutputFile -Value ""
    Add-Content -Path $OutputFile -Value ""
    
    Write-Host "✅ Added: $relativePath" -ForegroundColor Green
}

Write-Host "`n🎉 DONE! All code saved to: $OutputFile" -ForegroundColor Yellow