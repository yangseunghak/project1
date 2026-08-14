@echo off
cd /d "%~dp0"
start "" "http://127.0.0.1:4173"
where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server 4173 --bind 127.0.0.1
  exit /b
)
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 4173 --bind 127.0.0.1
  exit /b
)
echo Python is required to preview this static site.
pause
