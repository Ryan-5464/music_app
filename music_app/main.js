const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { downloadAudio } = require('./downloadAudio.js');
const { database, selectPlaylists } = require('./databaseApi.js');
const { selectTracksByTag } = require('./databaseFunctions/selectTracksByTag.js');
const { deleteTrack } = require('./databaseFunctions/deleteTrack.js');
const sqlite3 = require('sqlite3').verbose();



const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })

  win.loadFile('index.html')
}



app.whenReady().then(() => {  

    let db = database().then(res => {
        console.log("typeof db 3", res instanceof sqlite3.Database);
        return res;
    }).catch(err => {
        console.log(err.message);
    });

    console.log("hello", db instanceof sqlite3.Database);
    ipcMain.handle('ping', () => 'pong');

    ipcMain.on('channelSend', (event, data) => {  
        downloadAudio(data.url).then( () => {
          event.sender.send('channelReceive', 'downloading audio');
        }).catch((error) => {
          event.sender.send('channelReceive', 'audio download failed: ' + error.message);
      }); 
    });

    ipcMain.on('persistent-to-main', (event, data) => {  
      selectTracksByTag(data.tags, data.anyButtonActive).then((result) => {
        console.log('result', result);
        event.sender.send('persistent-from-main', result);
      });
    }); 

    ipcMain.on('delete-track-send', (event, data) => {
      deleteTrack(data.audioFileId).then((result) => {
        console.log(`Track with id ${data.audioFileId} deleted.`)
        event.sender.send('delete-track-receive', result);
      }); 
    });

    ipcMain.on('save-tags-playlist-send', (event, data) => {
      saveTagsPlaylist(data.tags,  data.playlistName).then((result) => {
        const playlists = selectPlaylists();
        event.sender.send('save-tags-playlist-receive', playlists);
      }); 
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
