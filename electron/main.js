const { app, BrowserWindow } = require('electron');
const path = require('path');
const net = require('net');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      sandbox: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });

  if (app.isPackaged) {
    const indexPath = path.join(__dirname, '../dist/index.html');
    mainWindow.loadFile(indexPath).catch((err) => {
      console.error('Erreur lors du chargement du fichier HTML :', err);
    });
  } else {
    const devURL = 'http://localhost:5173';
    mainWindow.loadURL(devURL).catch((err) => {
      console.error('Erreur lors du chargement de l\'URL DEV :', err);
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function findAvailablePort(startPort, callback) {
  const server = net.createServer();
  server.listen(startPort, () => {
    server.once('close', () => callback(startPort));
    server.close();
  });
  server.on('error', () => {
    findAvailablePort(startPort + 1, callback);
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});