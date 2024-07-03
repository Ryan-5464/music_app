const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")


async function fetchTracksBySearch(db_filepath, searchString) {

    let QUERY = `
        SELECT * FROM tracks WHERE title LIKE ?
    `
    const values = ['%' + searchString + '%']
    const database = new SqliteDatabaseHandler()
    await database.connect(db_filepath)
    const tracks = await database.download(QUERY, values)

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


module.exports = { fetchTracksBySearch }