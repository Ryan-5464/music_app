const sqlite3 = require('sqlite3').verbose();
const { DEBUG } = require('../config.js');
const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



const logger = new Logger()



async function select_most_recent_tracks(db_filepath, limit) {

    const LOG_ID = '283743'

    if (DEBUG) {
        logger.debug(LOG_ID, {'origin': '(select_most_recent_tracks.js > select_most_recent_tracks)'})
        logger.debug(LOG_ID, {'args': `{'db_filepath': ${db_filepath}, 'limit': ${limit}}`}) 
    }

    let QUERY = `
        SELECT * 
        FROM audio_metadata
        LIMIT ?
    `
        
    if (DEBUG) { 
        logger.debug(LOG_ID, {'query': QUERY})
    }
    
    try {

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const values = [limit]
        const result = await database.download(QUERY, values)

        if (DEBUG) {
            logger.debug(LOG_ID, {'result': result})
        }
        return result
    }

    catch(error) {
        console.log(error.message)
    }
}





module.exports = { select_most_recent_tracks }