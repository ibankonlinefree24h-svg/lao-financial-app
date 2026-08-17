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

echo 3. Pushing code to GitHub...
git push origin main

echo.
echo ========================================================
echo   ✨ SUCCESS! Code pushed to GitHub.
echo   🌐 Vercel is auto-deploying your live app now!
echo ========================================================
