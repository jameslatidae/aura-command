# AURA Command

AURA Command is an LED planning tool for live event LED screen projects.

## Commands

### Web App
- `npm run dev`: Runs the Vite web app
- `npm run dev:web`: Alias for `npm run dev`
- `npm run build`: Builds the Vite app
- `npm run build:web`: Alias for `npm run build`

### Electron Desktop App
- `npm run dev:electron`: Compiles Electron code, starts the Vite web server, and launches the Electron shell automatically.
- `npm run build:electron`: Builds both the React/Vite front-end and the Electron code.

## Windows Local Workflow

To easily run the desktop app on Windows, run the provided script in PowerShell:

```powershell
.\scripts\windows\run-aura-command-electron.ps1
```

This will automatically pull the latest changes, install dependencies, build the project, and launch the Electron app.
