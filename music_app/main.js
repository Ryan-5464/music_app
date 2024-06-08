const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')
const { selectPlaylists } = require('./databaseApi.js');
const { select_tracks_by_tag } = require('./databaseFunctions/select_tracks_by_tag.js');
const { delete_track } = require('./databaseFunctions/delete_track.js');
const { download_audio, initialize_database } = require('./server_side.js');
const { select_untagged_tracks } = require('./databaseFunctions/select_untagged_tracks.js')
const { fetch_track_count } = require('./server_side.js')
const config = require('./config.json');
const { Logger } = require('./handlers/Logger.js')
const { select_most_recent_tracks } = require('./databaseFunctions/select_most_recent_tracks.js')
const { save_playlist } = require("./databaseFunctions/save_playlist.js")
const { fetch_tracks_subset } = require("./server_logic/select_tracks_subset.js")
const { fetch_tags } = require("./databaseFunctions/fetch_tags.js")
const { tag_track } = require("./databaseFunctions/tag_track.js")
const {fetch_tracks } = require("./databaseFunctions/fetch_tracks.js")
const { delete_tag } = require("./databaseFunctions/delete_tag.js")
const { TrackTagFilter } = require("./databaseFunctions/fetch_tracks_by_tag.js")


const logger = new Logger()



const { MpvLinuxInstaller } = require("./system/mpvLinuxInstaller.js")
const { AudioPlayer } = require("./system/playAudio.js")
const { fetchTrackSource } = require("./server_logic/convertSong.js")



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
    
    initialize_database(config.DB_FILEPATH)


    ipcMain.on('download-track-send', (event, data) => {
        download_audio(config.DB_FILEPATH, data.url).then((success) => {
            if (!success) {
                event.sender.send('download-track-receive', 'Could not download audio!')
            } else {
                event.sender.send('download-track-receive', 'Audio downloaded successfully!');
            }
        })
    })

    ipcMain.on('play-track--send', (event, data) => {
        const filePath = config.TRACK_FILENAME.replace("[]", data.trackId)
        fetchTrackSource(filePath).then((dataurl => {
            event.sender.send('play-track--receive', dataurl)

        }))
        //const mp3FilePath = path.join(__dirname, `./tracks/${data.trackId}.mp3`)
        //audioPlayer.playAudioFile(mp3FilePath)
    })


    ipcMain.on('fetch-tracks--send', (event, data) => {
        fetch_tracks(config.DB_FILEPATH).then((tracks) => {
            event.sender.send('fetch-tracks--receive', tracks)
        })
    })

    ipcMain.on('fetch-tracks-by-tag--send', (event, data) => {
        console.log("virebvirbauv")
        const trackTagFilter = new TrackTagFilter()
        trackTagFilter.fetchTracksByTag(config.DB_FILEPATH, data.tags, data.anyButtonActive).then((tracks) => {
            console.log("TRATTERATV", tracks)
            event.sender.send('fetch-tracks-by-tag--receive', tracks)
        })
    })

    ipcMain.on('fetch-tags-send', (event, data) => {
        fetch_tags(config.DB_FILEPATH, data.track_id).then((tags) => {
            event.sender.send('fetch-tags-receive', tags)
        })
    })

    ipcMain.on('create-tag-send', (event, data) => {
        tag_track(config.DB_FILEPATH, data.track_id, data.tag).then((tags) => {
            event.sender.send('create-tag-receive', tags)
        })
    })

    ipcMain.on('delete-tag-send', (event, data) => {
        delete_tag(config.DB_FILEPATH, data.track_id, data.tag).then(() => {
            event.sender.send('delete-tag-receive', "")
        })
    })

    ipcMain.on('track-set-send', (event, result_set) => {
        fetch_tracks_subset(config.DB_FILEPATH, result_set.page, result_set.limit).then((_set) => {
            if (!_set) {
                event.sender.send('track-set-receive', 'Could not retrieve tracks from database!')
            } else {
                result_set.result_set = _set
                event.sender.send('track-set-receive', result_set);
            }
        })
    })


    ipcMain.on('track-count-send', (event, data) => {
        fetch_track_count(config.DB_FILEPATH)
            .then((track_count) => {
                event.sender.send('track-count-receive', track_count);
            })
            .catch((error) => {
                event.sender.send('track-count-receive', error)
            })
    })


    ipcMain.on('persistent-to-main', (event, data) => {
        select_tracks_by_tag(config.DB_FILEPATH, data.tags, data.any_button_active).then((result) => {
            event.sender.send('persistent-from-main', result);
        });
    });


    ipcMain.on('delete-track-send', (event, data) => {
        delete_track(config.DB_FILEPATH, data.track_id).then((result) => {
            console.log(`Track with id ${data.track_id} deleted.`)
            event.sender.send('delete-track-receive', result);
        });
    });


    ipcMain.on('save-playlist-send', (event, data) => {
        save_playlist(config.DB_FILEPATH, data.tags, data.title).then(() => {
            const playlists = selectPlaylists();
            event.sender.send('save-playlist-receive', playlists);
        });
    });

    ipcMain.on('untagged-tracks-send', (event, data) => {
        console.log("hello")

        select_untagged_tracks(config.DB_FILEPATH).then((result) => {
            console.log(`Untagged tracks retrieved successfully.`)
            console.log(result)
            event.sender.send('untagged-tracks-receive', result)
        });
    });

    ipcMain.on('fetch-tracks-request', (event, data) => {
        if (data.type === "most-recent") {

            select_most_recent_tracks(config.DB_FILEPATH, data.limit).then((result) => {
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



