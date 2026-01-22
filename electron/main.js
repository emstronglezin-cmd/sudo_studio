const { app, BrowserWindow } = require('electron');
const path = require('path');

// Désactiver le service réseau pour éviter l'erreur "Network service crashed"
app.commandLine.appendSwitch('disable-features', 'NetworkService');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#1e1e1e', // Fond sombre pour éviter l'écran noir
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false, // Désactiver les modules distants pour plus de sécurité
      sandbox: false, // Désactiver temporairement le sandboxing pour déboguer
      webSecurity: true, // Réactiver la sécurité web
      allowRunningInsecureContent: false, // Désactiver le contenu non sécurisé
    },
  });

  // Mise à jour du chemin pour utiliser le dossier dist à la racine
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
  console.log('Chargement du fichier HTML depuis :', indexPath);

  mainWindow.loadFile(indexPath)
    .then(() => {
      console.log('Fichier HTML chargé avec succès.');
    })
    .catch((err) => {
      console.error('Erreur lors du chargement du fichier HTML :', err);
    });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Erreur de chargement (${errorCode}): ${errorDescription}`);
  });

  mainWindow.webContents.on('dom-ready', () => {
    console.log('Le DOM est prêt.');
  });

  mainWindow.webContents.on('console-message', (event, level, message) => {
    console.log(`Message console [niveau ${level}]: ${message}`);
  });

  mainWindow.webContents.openDevTools(); // Outil de débogage

  // Politique de sécurité du contenu (CSP) stricte
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self'; script-src-elem 'self'; worker-src 'self' blob:; connect-src 'self' http://localhost:* ws://localhost:*; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:;"
        ]
      }
    });
  });
}

app.on('ready', createWindow);

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