const { AudioDownloader } = require("../handlers/AudioDownloader.js")
const { DatabaseInitializer } = require("../handlers/DatabaseInitializer.js")
const { TrackListHandler } = require("../handlers/TrackListHandler.js")
const { Logger } = require("../handlers/Logger.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("./helpers/getThisFunctionName.js")



const logger = new Logger()


async function download_audio(db_filepath, url) {

    const LOG_ID = '478382'



    const audio_downloader = new AudioDownloader()
    const success = await audio_downloader.download_audio(db_filepath, url)

    if (!success) {
        logger.log("warning", LOG_ID, script_name, get_function_name(), 'Could not download audio', "", Array.from(arguments))
        return
    }

    return success
}


async function initialize_database(db_filepath) {
    
    await DatabaseInitializer.initialize_database(db_filepath)
    
}


async function fetch_track_count(db_filepath) {
    const tracklist_handler = new TrackListHandler()
    const track_count = await tracklist_handler.fetch_track_count(db_filepath)
    console.log("tr", track_count[0].count)
    return track_count[0].count
}




module.exports = { download_audio, initialize_database, fetch_track_count }