// Preload minimal et moderne pour une application Electron
const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload chargé avec succès');
});

// Expose une API sécurisée au renderer
contextBridge.exposeInMainWorld('api', {
  platform: () => process.platform,
  openFile: (filePath) => {
    console.log('[API] Appel à openFile avec filePath :', filePath);
    return ipcRenderer.invoke('dialog:openFile', filePath);
  },
  send: (channel, data) => {
    console.log('[API] Appel à send avec channel :', channel, 'et data :', data);
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    console.log('[API] Appel à receive avec channel :', channel);
    ipcRenderer.on(channel, (event, ...args) => {
      console.log('[API] Message reçu sur channel :', channel, 'avec args :', args);
      func(...args);
    });
  },
  on: (channel, func) => {
    console.log('[API] Appel à on avec channel :', channel);
    ipcRenderer.on(channel, (event, ...args) => {
      console.log('[API] Message reçu sur channel :', channel, 'avec args :', args);
      func(...args);
    });
  },
  // Ajout d'une méthode pour charger un module spécifique si nécessaire
  loadModule: (moduleName) => {
    if (['fs', 'path'].includes(moduleName)) {
      console.log('[API] Chargement du module :', moduleName);
      return require(moduleName);
    }
    throw new Error('Module non autorisé');
  }
});

// Détecter les tentatives d'utilisation de `require`
window.require = undefined;
Object.defineProperty(window, 'require', {
  get() {
    console.error('Tentative d’utilisation de `require` détectée dans le processus de rendu.');
    return undefined;
  },
});