@echo off
title Push Lao Financial App to GitHub
color 0A
echo ========================================================
echo   🚀 PUSHING LAO FINANCIAL APP TO GITHUB...
echo ========================================================
echo.
cd /d f:\B
git remote set-url origin https://github.com/ibankonlinefree24h-svg/lao-financial-app.git
git branch -M main
git push -u origin main

echo 🌐 Deploying to GitHub Pages...
call npm run deploy

echo.
echo ========================================================
echo   ✨ SUCCESS! Code is uploaded & Deployed to GitHub Pages!
echo   🌐 App URL: https://ibankonlinefree24h-svg.github.io/lao-financial-app/
echo ========================================================
pause
