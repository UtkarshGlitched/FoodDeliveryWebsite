@echo off
echo Starting local static server on http://localhost:8000
python -m http.server 8000
if errorlevel 1 (
  echo Failed to start server. Ensure Python 3 is installed and on PATH.
)
