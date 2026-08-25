@echo off
echo ========================================================
echo   🚀 LAO FINANCIAL APP - AUTOMATIC GITHUB & VERCEL PUSH
echo ========================================================
echo.
echo 1. Staging modified files...
git add .

echo 2. Committing changes...
set /p commit_msg="Enter commit message (or press ENTER for default): "
if "%commit_msg%"=="" set commit_msg="Auto-update Lao Financial App"

git commit -m "%commit_msg%"

echo 3. Pushing code to GitHub main branch...
git push origin main

echo 4. Building and Deploying to GitHub Pages...
call npm run deploy

echo.
echo ========================================================
echo   ✨ SUCCESS! Code pushed to GitHub & Deployed to GitHub Pages!
echo   🌐 Live App: https://ibankonlinefree24h-svg.github.io/lao-financial-app/
echo ========================================================
