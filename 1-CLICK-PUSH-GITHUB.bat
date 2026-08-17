@echo off
title 1-CLICK PUSH LAO FINANCIAL APP TO GITHUB
color 0A
echo ========================================================
echo   🚀 1-CLICK UPLOAD LAO FINANCIAL APP TO GITHUB
echo ========================================================
echo.
cd /d f:\B
git remote set-url origin https://github.com/ibankonlinefree24h-svg/lao-financial-app.git
git branch -M main
git push -u origin main
echo.
echo ========================================================
echo   ✨ SUCCESS! Code is uploaded to GitHub!
echo ========================================================
pause
