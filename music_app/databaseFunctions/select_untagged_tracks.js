const sqlite3 = require('sqlite3').verbose();
const { DEBUG } = require('../config.js');
const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



const logger = new Logger()



async function select_untagged_tracks(db_filepath) {

    const LOG_ID = '283743'

    if (DEBUG) {
        logger.debug(LOG_ID, {'origin': '(select_tracks_by_tag.js > select_tracks_by_tag)'})
        logger.debug(LOG_ID, {'args': `{'db_filepath': ${db_filepath}}`}) 
    }

    let QUERY = `
        SELECT am.*
        FROM audio_metadata am
        LEFT JOIN audio_tags at ON am.audio_id = at.audio_id
        WHERE at.audio_id IS NULL;
    `
        
    if (DEBUG) { 
        logger.debug(LOG_ID, {'query': QUERY})
    }
    
    try {

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const result = await database.download(QUERY)

        if (DEBUG) {
            logger.debug(LOG_ID, {'result': result})
        }
        return result
    }

    catch(error) {
        console.log(error.message)
    }
}





module.exports = { select_untagged_tracks }