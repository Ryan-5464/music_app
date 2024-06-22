const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { delete_track } = require('./databaseFunctions/delete_track.js');
const { download_audio, initialize_database } = require('./server/server_side.js');
const config = require('./config.json');
const { getTags } = require("./databaseFunctions/getTags.js")
const { tag_track } = require("./databaseFunctions/tag_track.js")
const {fetch_tracks } = require("./databaseFunctions/fetch_tracks.js")
const { delete_tag } = require("./databaseFunctions/delete_tag.js")
const { TrackTagFilter } = require("./databaseFunctions/fetch_tracks_by_tag.js")
const {fetchTrackByTrackId } = require("./databaseFunctions/fetchTracksByTrackId.js")
const { fetchTrackSource } = require("./server_logic/convertSong.js")



const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 650,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}



app.whenReady().then(() => {
    
    initialize_database(config.DB_FILEPATH)

    ipcMain.on('get-track-by-id--send', (event, data) => {
        fetchTrackByTrackId(config.DB_FILEPATH, data.trackId).then((track) => {
            event.sender.send('get-track-by-id--receive', track)
        })
    })

    ipcMain.on('download-track--send', (event, data) => {
        download_audio(config.DB_FILEPATH, data.url).then((success) => {
            if (!success) {
                event.sender.send('download-track--receive', 'Could not download audio!')
            } else {
                event.sender.send('download-track--receive', 'Audio downloaded successfully!');
            }
        })
    })

    ipcMain.on('play-track--send', (event, data) => {
        const filePath = config.TRACK_FILENAME.replace("[]", data.trackId)
        fetchTrackSource(filePath).then((dataurl => {
            event.sender.send('play-track--receive', dataurl)

        }))
    })

    ipcMain.on('fetch-all-tracks--send', (event, data) => {
        fetch_tracks(config.DB_FILEPATH).then((tracks) => {
            const start_index = (data.page - 1) * data.limit
            const end_index = Math.min(start_index + data.limit, tracks.length)
            const resultSet = tracks.slice(start_index, end_index)
            event.sender.send('fetch-all-tracks--receive', resultSet)
        })
    })

    ipcMain.on('fetch-tracks-by-tag--send', (event, data) => {
        const trackTagFilter = new TrackTagFilter()
        trackTagFilter.fetchTracksByTag(config.DB_FILEPATH, data.tags, data.anyButtonActive).then((tracks) => {
            console.log("TRATTERATV", tracks)
            event.sender.send('fetch-tracks-by-tag--receive', tracks)
        })
    })

    ipcMain.on('add-tag--send', (event, data) => {
        tag_track(config.DB_FILEPATH, data.trackId, data.tagName).then((tags) => {
            event.sender.send('add-tag--receive', tags)
        })
    })

    ipcMain.on('delete-tag--send', (event, data) => {
        console.log("trig")
        delete_tag(config.DB_FILEPATH, data.trackId, data.tagName).then(() => {
            event.sender.send('delete-tag--receive', "")
        })
    })

    ipcMain.on('get-tags--send', (event, data) => {
        getTags(config.DB_FILEPATH, data.trackId).then((tags) => {
            event.sender.send('get-tags--receive', tags)
        })
    })

    ipcMain.on('delete-track--send', (event, data) => {
        delete_track(config.DB_FILEPATH, data.track_id).then((result) => {
            console.log(`Track with id ${data.track_id} deleted.`)
            event.sender.send('delete-track--receive', result);
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



