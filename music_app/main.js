const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const config = require('./config.json');


const { TrackTagFilter } = require("./server/handlers/TrackTagFilter.js")
const { DbInitializer } = require("./server/handlers/DbInitializer.js")
const { downloadAudio } = require("./server/functions/downloadAudio.js")
const { deleteTrack } = require("./server/functions/deleteTrack.js")
const { getTags } = require("./server/functions/getTags.js")
const { tagTrack } = require("./server/functions/tagTrack.js")
const { fetchTracks } = require("./server/functions/fetchTracks.js")
const { deleteTag } = require("./server/functions/deleteTag.js")
const { fetchTracksBySearch } = require("./server/functions/fetchTracksBySearch.js")
const { fetchTrackSource } = require("./server/functions/fetchTrackSource.js")
const {fetchTrackByTrackId } = require("./server/functions/fetchTrackByTrackId.js")




const createWindow = () => {
    const win = new BrowserWindow({
        width: 1400,
        height: 814,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        resizable: false,
    })

    win.loadFile('index.html')
}



app.whenReady().then(() => {
    
    DbInitializer.initializeDb(config.DB_FILEPATH)

    ipcMain.on('get-track-by-id--send', (event, data) => {
        fetchTrackByTrackId(config.DB_FILEPATH, data.trackId).then((track) => {
            event.sender.send('get-track-by-id--receive', track)
        })
    })

    ipcMain.on('download-track--send', (event, data) => {
        downloadAudio(config.DB_FILEPATH, data.url).then((success) => {
            if (!success) {
                event.sender.send('download-track--receive', 'Could not download audio!')
            } else if (success === 1) {
                event.sender.send('download-track--receive', 'Track already exists!');
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
        fetchTracks(config.DB_FILEPATH).then((tracks) => {
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

    ipcMain.on('fetch-tracks-by-search--send', (event, data) => {
        fetchTracksBySearch(config.DB_FILEPATH, data.searchString).then((tracks) => {
            console.log("TRATTERATV", tracks)
            event.sender.send('fetch-tracks-by-search--receive', tracks)
        })
    })

    ipcMain.on('add-tag--send', (event, data) => {
        tagTrack(config.DB_FILEPATH, data.trackId, data.tagName).then((tags) => {
            event.sender.send('add-tag--receive', tags)
        })
    })

    ipcMain.on('delete-tag--send', (event, data) => {
        console.log("trig")
        deleteTag(config.DB_FILEPATH, data.trackId, data.tagName).then(() => {
            event.sender.send('delete-tag--receive', "")
        })
    })

    ipcMain.on('get-tags--send', (event, data) => {
        getTags(config.DB_FILEPATH, data.trackId).then((tags) => {
            event.sender.send('get-tags--receive', tags)
        })
    })

    ipcMain.on('delete-track--send', (event, data) => {
        console.log("delete track id", data.trackId)
        deleteTrack(config.DB_FILEPATH, data.trackId).then((result) => {
            console.log(`Track with id ${data.trackId} deleted.`)
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



