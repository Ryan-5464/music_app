const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



export async function fetchTracks(dbFilepath) {


    let QUERY = `
        SELECT * FROM tracks;
    `
    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
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

