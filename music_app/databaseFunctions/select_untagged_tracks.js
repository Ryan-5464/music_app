const sqlite3 = require('sqlite3').verbose();
const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")



const logger = new Logger()



async function select_untagged_tracks(db_filepath) {

    const LOG_ID = '283743'

    let QUERY = `
        SELECT am.*
        FROM audio_metadata am
        LEFT JOIN audio_tags at ON am.audio_id = at.audio_id
        WHERE at.audio_id IS NULL;
    `
        
    logger.log("debug", LOG_ID, script_name, get_function_name(), `{'query': ${QUERY}}`, "", Array.from(arguments))

    try {

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const result = await database.download(QUERY)

        logger.log("debug", LOG_ID, script_name, get_function_name(), `{'result': ${result}}`, "", Array.from(arguments))
        return result
    }

    catch(error) {
        logger.log("error", LOG_ID, script_name, get_function_name(), error.message, "", Array.from(arguments))
    }
}





module.exports = { select_untagged_tracks }