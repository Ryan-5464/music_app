const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { selectPlaylists } = require('./databaseApi.js');
const { select_tracks_by_tag } = require('./databaseFunctions/select_tracks_by_tag.js');
const { delete_track } = require('./databaseFunctions/delete_track.js');
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


    const LOG_ID = '382938'
    
    initialize_database(DB_FILEPATH)


    ipcMain.on('channelSend', (event, data) => {
        download_audio(DB_FILEPATH, data.url).then((success) => {
            if (!success) {
                event.sender.send('channelReceive', 'Audio download failed')
            } else {
                event.sender.send('channelReceive', 'Downloading audio');
            }
        })
    })


    ipcMain.on('persistent-to-main', (event, data) => {
        select_tracks_by_tag(DB_FILEPATH, data.tags, data.any_button_active).then((result) => {
            console.log('result', result);
            event.sender.send('persistent-from-main', result);
        });
    });


    ipcMain.on('delete-track-send', (event, data) => {
        console.log("hello")

        delete_track(DB_FILEPATH, data.audio_id).then((result) => {
            console.log(`Track with id ${data.audio_id} deleted.`)
            event.sender.send('delete-track-receive', result);
        });
    });


    ipcMain.on('save-tags-playlist-send', (event, data) => {
        saveTagsPlaylist(data.tags, data.playlistName).then(() => {
            const playlists = selectPlaylists();
            event.sender.send('save-tags-playlist-receive', playlists);
        });
    });

    ipcMain.on('untagged-tracks-send', (event, data) => {
        console.log("hello")

        delete_track(DB_FILEPATH, data.audio_id).then((result) => {
            console.log(`Track with id ${data.audio_id} deleted.`)
            event.sender.send('untagged-tracks-receive', result);
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



