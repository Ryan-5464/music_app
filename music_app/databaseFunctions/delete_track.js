const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { FileHandler } = require("../handlers/FileHandler.js");
const { AUDIO_FILENAME } = require("../config.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")



const logger = new Logger()



async function delete_track(db_filepath, audio_id) {

    const LOG_ID = '273783'

    const QUERY = `
        DELETE FROM tracks
        WHERE track_id = ?;
    `;

    const file_handler = new FileHandler()
    const file_path = AUDIO_FILENAME.replace("[]", audio_id);
    await file_handler.delete(file_path);

    const database = new SqliteDatabaseHandler()
    await database.connect(db_filepath)
    const values = [audio_id]
    await database.upload(QUERY, values)
    await database.disconnect()

    logger.log("info", LOG_ID, script_name, get_function_name(), 'Track deleted successfully', "", Array.from(arguments))

}



module.exports = { delete_track }