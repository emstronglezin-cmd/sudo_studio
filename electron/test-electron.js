const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width:900,
    height:600 ,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  win.loadFile(path.join(__dirname, 'test.html'))
}
app.whenReady().then(createWindow);