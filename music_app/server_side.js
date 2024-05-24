const { AudioDownloader } = require("./handlers/AudioDownloader.js")
const { DatabaseInitializer } = require("./handlers/DatabaseInitializer.js")
const { TrackListHandler } = require("./handlers/TrackListHandler.js")
const { Logger } = require("./handlers/Logger.js")
const { DEBUG } = require('./config.js')


const logger = new Logger()


async function download_audio(db_filepath, url) {

    const LOG_ID = '478382'

    if(DEBUG) {
        logger.debug(LOG_ID , {'origin': '(server_side > download_audio)'})
    }

    const audio_downloader = new AudioDownloader()
    const success = await audio_downloader.download_audio(db_filepath, url)

    if (!success) {
        logger.info(LOG_ID, {'message': 'Could not download audio'})
        return
    }

    return true
}


async function initialize_database(db_filepath) {
    
    const database_initializer = new DatabaseInitializer()
    await database_initializer.initialize_database(db_filepath)
    
}


async function fetch_track_count(db_filepath) {
    const tracklist_handler = new TrackListHandler()
    await tracklist_handler.fetch_track_count(db_filepath)
}


module.exports = { download_audio, initialize_database, fetch_track_count }