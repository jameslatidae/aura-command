import { app, BrowserWindow, Menu } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Note: Using a simple check. If app is packaged, it's definitely production.
const isDev = !app.isPackaged && process.env.NODE_ENV !== 'production';

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 950,
    minWidth: 1200,
    minHeight: 760,
    title: 'AURA Command',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  Menu.setApplicationMenu(null);
  win.setMenuBarVisibility(false);

  // Determine the URL/file based on dev or prod
  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  win.maximize();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Block DevTools shortcuts and right click in production
  if (!isDev) {
    app.on('web-contents-created', (e, contents) => {
      contents.on('context-menu', (event, params) => {
        event.preventDefault();
      });
      contents.on('before-input-event', (event, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === 'i') {
          event.preventDefault();
        }
        if (input.key === 'F12') {
          event.preventDefault();
        }
      });
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
