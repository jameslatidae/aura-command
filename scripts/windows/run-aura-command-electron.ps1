Write-Host "Updating AURA Command..."
git pull

Write-Host "Installing dependencies..."
npm install

Write-Host "Building project..."
npm run build

Write-Host "Starting Electron App..."
npm run dev:electron
