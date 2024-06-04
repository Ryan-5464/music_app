const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { Logger } = require("../handlers/Logger.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")



async function delete_tag(db_path, track_id, tag) {
    
    try {
        const logger = new Logger()
        const LOG_ID = '443434'
    
        const QUERY = `
            DELETE FROM tags 
            WHERE track_id = ? AND tag = ?;
        `
        const values = [track_id, tag]
        const database = new SqliteDatabaseHandler()
        await database.connect(db_path)
        await database.upload(QUERY, values) 

        logger.log("info", LOG_ID, script_name, get_function_name(), 'Tag deleted successfully', "", Array.from(arguments))
    }
    catch (error) {
        console.log(error.message)
    }




}

module.exports = { delete_tag }