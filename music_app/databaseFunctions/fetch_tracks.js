const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")



const logger = new Logger()



async function fetch_tracks(db_filepath) {

    const LOG_ID = '474799'

    let QUERY = `
        SELECT * FROM tracks;
    `
    const database = new SqliteDatabaseHandler()
    await database.connect(db_filepath)
    const tracks = await database.download(QUERY)

    QUERY = `
        SELECT tag FROM tags 
        WHERE track_id = ?;
    `

    
    for (const _track of tracks) {
        const values = [_track.track_id]
        _track.tags = await database.download(QUERY, values) 
    }
    await database.disconnect()
    return tracks
}


module.exports = { fetch_tracks }