const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { log } = require("../handlers/Logger.js")
const path = require('path');
const scriptName = path.basename(__filename);
const { getThisFunctionName } = require("../helpers/helpers.js")





async function deleteTag(dbFilepath, trackId, tagName) {
    
    try {
        const LOG_ID = '443434'
    
        const QUERY = `
            DELETE FROM tags 
            WHERE track_id = ? AND tag = ?;
        `
        const values = [trackId, tagName]
        const database = new SqliteDatabaseHandler()
        await database.connect(dbFilepath)
        await database.upload(QUERY, values) 

        log("info", LOG_ID, scriptName, getThisFunctionName(), 'Tag deleted successfully', "", Array.from(arguments))
    }
    catch (error) {
        console.log(error.message)
    }
}





module.exports = { deleteTag }