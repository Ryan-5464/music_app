const sqlite3 = require('sqlite3').verbose();
const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")


const logger = new Logger()



async function select_most_recent_tracks(db_filepath, limit) {

    const LOG_ID = '283743'

    let QUERY = `
        SELECT * 
        FROM tracks
        LIMIT ?
    `
        
    logger.log("debug", LOG_ID, script_name, get_function_name(), `{'query': ${QUERY}}`, "", Array.from(arguments))

    try {

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const values = [limit]
        const result = await database.download(QUERY, values)

        logger.log("debug", LOG_ID, script_name, get_function_name(), `{'result': ${result}}`, "", Array.from(arguments))
        return result
    }

    catch(error) {
        logger.log("error", LOG_ID, script_name, get_function_name(), error.message, "", Array.from(arguments))
    }
}





module.exports = { select_most_recent_tracks }