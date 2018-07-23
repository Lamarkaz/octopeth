'use strict'

import { app, BrowserWindow } from 'electron'

// import the module
import * as Splashscreen from "@trodi/electron-splashscreen";
const mainOpts: Electron.BrowserWindowConstructorOptions = ...
// configure the splashscreen
const config: Splashscreen.Config = {
    windowOpts: mainOpts;
    templateUrl: `${__dirname}/splash-screen.html`;
    splashScreenOpts: {
        width: 425,
        height: 325,
    },
};
// initialize the splashscreen handling
const main: BrowserWindow = Splashscreen.initSplashScreen(config);
// load your browser window per usual
main.loadURL(`file://index.html`);

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 1100,
    minHeight: 600,
    minWidth: 1100,
    useContentSize: true,
    backgroundColor: toElectronBackgroundColor(cfg.backgroundColor || '#000'),
    titleBarStyle: 'hidden',
    title: 'Hyper.app',
    // we want to go frameless on Windows and Linux
    frame: process.platform === 'darwin',
    transparent: process.platform === 'darwin',
    icon,
    show: process.env.HYPER_DEBUG || process.env.HYPERTERM_DEBUG || isDev,
    acceptFirstMouse: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
