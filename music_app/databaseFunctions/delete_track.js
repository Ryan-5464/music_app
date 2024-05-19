const { DEBUG, AUDIO_FILENAME } = require('../config.js');
const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { FileHandler } = require("../handlers/FileHandler.js");


const logger = new Logger()



async function delete_track(db_filepath, audio_id) {

    const LOG_ID = '273783'

    if (DEBUG) {
        logger.debug(LOG_ID, {'origin': '(delete_track.js > delete_track)'})
        logger.debug(LOG_ID, {'args': `{'db_filepath': ${db_filepath}, 'audio_id': ${audio_id}}`})
    }

    const QUERY = `
        DELETE FROM audio_metadata
        WHERE audio_id = ?;
    `;

    const file_handler = new FileHandler()
    const filePath = AUDIO_FILENAME.replace("[]", audio_id);
    await file_handler.delete(filePath);

    const database = new SqliteDatabaseHandler()
    await database.connect(db_filepath)
    const values = [audio_id]
    await database.upload(QUERY, values)
    await database.disconnect()

    if (DEBUG) {
        logger.info(LOG_ID, {'message': 'Track deleted successfully'})
    }

}



module.exports = { delete_track }