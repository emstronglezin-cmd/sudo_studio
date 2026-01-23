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

  // Ouvrir les outils de développement pour le débogage
  mainWindow.webContents.openDevTools();

  // Ajouter des menus personnalisés pour l'application
  const { Menu } = require('electron');
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        { label: 'New File', click: () => mainWindow.webContents.send('menu-action', 'new-file') },
        { label: 'New Folder', click: () => mainWindow.webContents.send('menu-action', 'new-folder') },
        { type: 'separator' },
        { label: 'Open Folder', click: () => mainWindow.webContents.send('menu-action', 'open-folder') },
        { label: 'Save', click: () => mainWindow.webContents.send('menu-action', 'save') },
        { label: 'Save As', click: () => mainWindow.webContents.send('menu-action', 'save-as') },
        { type: 'separator' },
        { label: 'Exit', role: 'quit' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Toggle Explorer', click: () => mainWindow.webContents.send('menu-action', 'toggle-explorer') },
        { label: 'Toggle Terminal', click: () => mainWindow.webContents.send('menu-action', 'toggle-terminal') },
        { label: 'Toggle Emulator', click: () => mainWindow.webContents.send('menu-action', 'toggle-emulator') },
        { label: 'Toggle Chat', click: () => mainWindow.webContents.send('menu-action', 'toggle-chat') },
      ],
    },
    {
      label: 'Terminal',
      submenu: [
        { label: 'New Terminal', click: () => mainWindow.webContents.send('menu-action', 'new-terminal') },
        { label: 'Clear', click: () => mainWindow.webContents.send('menu-action', 'clear-terminal') },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { label: 'About Sudo Studio', click: () => mainWindow.webContents.send('menu-action', 'about') },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

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