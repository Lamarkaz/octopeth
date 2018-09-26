'use strict'

import { app, BrowserWindow, Menu } from 'electron'

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
    height: 630,
    width: 1155,
    minHeight: 630,
    minWidth: 1155,
    backgroundColor: '#222',
    useContentSize: true,
    'web-preferences': {'web-security': false}
  })

  mainWindow.loadURL(winURL)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // const MenuTemplate = [
  //   {
  //     label: 'Octopeth',
  //     submenu: [
  //       {label: 'About Octopeth'},
  //       {label: 'Developer',
  //         submenu: [
  //           {
  //             label: '',
  //             label: ''
  //           }
  //         ]
  //       },
  //       {type: 'separator'},
  //       {
  //         label: 'Exit',
  //         click () {
  //           app.quit()
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Navigation',
  //     submenu: [
  //       {
  //         label: 'Reload',
  //         accelerator: 'CmdOrCtrl+R'
  //       },
  //       {
  //         label: 'Go Forward',
  //         accelerator: 'CmdOrCtrl+F'
  //       },
  //       {
  //         label: 'Go Backward',
  //         accelerator: 'CmdOrCtrl+B'
  //       },
  //       {
  //         label: 'Close ÐApp'
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Help',
  //     submenu: [
  //       {}
  //     ]
  //   }
  // ]

  const template = [
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Documentation for developers',
          click () { require('electron').shell.openExternal('https://developer') }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: 'Octopeth',
      submenu: [
        {role: 'about'},
        {label: 'Developer', submenu: [
          {}
        ]},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        { label: 'Quit Octopeth',
          role: 'quit'
        }
      ]
    })

    // Edit menu
    template[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    )

    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
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
