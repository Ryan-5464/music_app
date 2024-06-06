const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { selectPlaylists } = require('./databaseApi.js');
const { select_tracks_by_tag } = require('./databaseFunctions/select_tracks_by_tag.js');
const { delete_track } = require('./databaseFunctions/delete_track.js');
const { download_audio, initialize_database } = require('./server_side.js');
const { select_untagged_tracks } = require('./databaseFunctions/select_untagged_tracks.js')
const { fetch_track_count } = require('./server_side.js')
const { DB_FILEPATH } = require('./config.js');
const { Logger } = require('./handlers/Logger.js')
const { select_most_recent_tracks } = require('./databaseFunctions/select_most_recent_tracks.js')
const { save_playlist } = require("./databaseFunctions/save_playlist.js")
const { fetch_tracks_subset } = require("./server_logic/select_tracks_subset.js")
const { fetch_tags } = require("./databaseFunctions/fetch_tags.js")
const { tag_track } = require("./databaseFunctions/tag_track.js")
const {fetch_tracks } = require("./databaseFunctions/fetch_tracks.js")
const { delete_tag } = require("./databaseFunctions/delete_tag.js")

const logger = new Logger()


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 1000,
        minWidth: 1200,
        minHeight: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}



app.whenReady().then(() => {


    const LOG_ID = '382938'
    
    initialize_database(DB_FILEPATH)


    ipcMain.on('download-track-send', (event, data) => {
        download_audio(DB_FILEPATH, data.url).then((success) => {
            if (!success) {
                event.sender.send('download-track-receive', 'Could not download audio!')
            } else {
                event.sender.send('download-track-receive', 'Audio downloaded successfully!');
            }
        })
    })

    ipcMain.on('fetch-tracks--send', (event, data) => {
        console.log("XXY")
        fetch_tracks(DB_FILEPATH).then((tracks) => {
            event.sender.send('fetch-tracks--receive', tracks)
        })
    })

    ipcMain.on('fetch-tags-send', (event, data) => {
        fetch_tags(DB_FILEPATH, data.track_id).then((tags) => {
            event.sender.send('fetch-tags-receive', tags)
        })
    })

    ipcMain.on('create-tag-send', (event, data) => {
        console.log("create_tag triggered")
        tag_track(DB_FILEPATH, data.track_id, data.tag).then((tags) => {
            event.sender.send('create-tag-receive', tags)
        })
    })

    ipcMain.on('delete-tag-send', (event, data) => {
        console.log("delete_tag triggered")
        delete_tag(DB_FILEPATH, data.track_id, data.tag).then(() => {
            event.sender.send('delete-tag-receive', "")
        })
    })

    ipcMain.on('track-set-send', (event, result_set) => {
        fetch_tracks_subset(DB_FILEPATH, result_set.page, result_set.limit).then((_set) => {
            if (!_set) {
                event.sender.send('track-set-receive', 'Could not retrieve tracks from database!')
            } else {
                result_set.result_set = _set
                event.sender.send('track-set-receive', result_set);
            }
        })
    })


    ipcMain.on('track-count-send', (event, data) => {
        fetch_track_count(DB_FILEPATH)
            .then((track_count) => {
                console.log("test")
                console.log(track_count)
                event.sender.send('track-count-receive', track_count);
            })
            .catch((error) => {
                event.sender.send('track-count-receive', error)
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

        delete_track(DB_FILEPATH, data.track_id).then((result) => {
            console.log(`Track with id ${data.track_id} deleted.`)
            event.sender.send('delete-track-receive', result);
        });
    });


    ipcMain.on('save-playlist-send', (event, data) => {
        save_playlist(DB_FILEPATH, data.tags, data.title).then(() => {
            const playlists = selectPlaylists();
            event.sender.send('save-playlist-receive', playlists);
        });
    });

    ipcMain.on('untagged-tracks-send', (event, data) => {
        console.log("hello")

        select_untagged_tracks(DB_FILEPATH).then((result) => {
            console.log(`Untagged tracks retrieved successfully.`)
            console.log(result)
            event.sender.send('untagged-tracks-receive', result)
        });
    });

    ipcMain.on('fetch-tracks-request', (event, data) => {
        if (data.type === "most-recent") {

            select_most_recent_tracks(DB_FILEPATH, data.limit).then((result) => {
                console.log(`Most recent tracks.`)
                console.log(result)
                event.sender.send('fetch-tracks-response', result)
            });
        }
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



