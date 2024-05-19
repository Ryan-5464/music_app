const { AudioDownloader } = require("./handlers/AudioDownloader.js")
const { DatabaseInitializer } = require("./handlers/DatabaseInitializer.js")
const { Logger } = require("./handlers/Logger.js")
const { SqliteDatabaseHandler } = require("./handlers/SqliteDatabaseHandler.js")
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
        return false
    }

    return true
}


async function initialize_database(db_filepath) {
    
    const database_initializer = new DatabaseInitializer()
    await database_initializer.initialize_database(db_filepath)
    const database = new SqliteDatabaseHandler()
    await database.connect(db_filepath)
    return database
    
}



module.exports = { download_audio, initialize_database }