@echo off
title LaunchLens AI - Platform Runner
echo ===================================================================
echo LaunchLens AI - Startup Idea Validation and Business Planning
echo Machine Learning & Business Intelligence Platform
echo ===================================================================
echo.
echo Starting LaunchLens AI Unified Full-Stack Server on port 8000...
echo Server URL: http://127.0.0.1:8000
echo.

cd /d "%~dp0backend"
python -m uvicorn main:app --host 127.0.0.1 --port 8000
pause
