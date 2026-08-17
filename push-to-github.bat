@echo off
title Push Lao Financial App to GitHub
color 0A
echo ========================================================
echo   🚀 PUSHING LAO FINANCIAL APP TO GITHUB...
echo ========================================================
echo.
cd /d f:\B
git remote set-url origin https://github.com/ibankonlinefree24h/lao-financial-app.git
git branch -M main
git push -u origin main
echo.
echo ========================================================
echo   ✨ SUCCESS! Code is uploaded to GitHub!
echo ========================================================
pause
