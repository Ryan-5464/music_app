const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")



const logger = new Logger()



async function fetch_tracks(db_filepath) {

    const LOG_ID = '474799'

    const QUERY = `
        SELECT * FROM tracks;
    `
    console.log("XXX")
    const database = new SqliteDatabaseHandler()
    await database.connect(db_filepath)
    await database.download(QUERY)
    await database.disconnect()

    logger.log("info", LOG_ID, script_name, get_function_name(), 'Track deleted successfully', "", Array.from(arguments))

}



module.exports = { fetch_tracks }