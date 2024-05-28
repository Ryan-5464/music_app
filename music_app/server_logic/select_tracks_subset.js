const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { Logger } = require("../handlers/Logger.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")



const logger = new Logger()



function extract_subset(tracks, page, limit) {
    const end = page * limit
    const start = end - limit
    const subset = tracks.slice(start, end)
    return subset
}



async function fetch_tracks_subset(db_path, page, limit) {

    const LOG_ID = "238848" 

    try {

        let QUERY = `
            SELECT * FROM tracks;
        `
        const database = new SqliteDatabaseHandler()
        await database.connect(db_path)
        const tracks = await database.download(QUERY)
        const subset = extract_subset(tracks, page, limit)
        for (const track of subset) {
            
            track.tags = []
            QUERY = `
            SELECT tag from tags WHERE track_id = ?
            `
            values = [track.track_id]
            const tags = await database.download(QUERY, values)
            track.tags = tags 
            
        }
        console.log("subset", subset)
        database.disconnect()
        return subset

    }

    catch (error) {
        logger.log("error", LOG_ID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
    }

}


module.exports = { fetch_tracks_subset }