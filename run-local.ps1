# Run this in PowerShell to start a simple static server on port 8000
# Requires Python 3 installed and on PATH.
Write-Host "Starting local static server on http://localhost:8000"
try {
    python -m http.server 8000
} catch {
    Write-Error "Failed to start server. Ensure Python 3 is installed and on PATH."
}
