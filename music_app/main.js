const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { selectPlaylists } = require('./databaseApi.js');
const { selectTracksByTag } = require('./databaseFunctions/selectTracksByTag.js');
const { deleteTrack } = require('./databaseFunctions/deleteTrack.js');
const { download_audio, initialize_database } = require('./server_side.js');
const { DB_FILEPATH, DEBUG } = require('./config.js');
const { Logger } = require('./handlers/Logger.js')


const logger = new Logger()


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

    
    try {

        const LOG_ID = '382938'
        
        const database = initialize_database(DB_FILEPATH)
    
    
        ipcMain.on('channelSend', (event, data) => {
            download_audio(DB_FILEPATH, data.url).then((success) => {
                if (!success) {
                    event.sender.send('channelReceive', 'audio download failed: ' + error.message)
                } else {
                    event.sender.send('channelReceive', 'downloading audio');
                }
            })
        })
    
    
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
            saveTagsPlaylist(data.tags, data.playlistName).then((result) => {
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

    }

    catch (error) {
        
        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': 'main.js', 'error message': error.message})
        }
    }
})



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



