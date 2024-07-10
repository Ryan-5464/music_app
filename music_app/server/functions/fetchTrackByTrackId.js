const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



async function fetchTrackByTrackId(dbFilepath, trackId) {


    let QUERY = `
        SELECT * FROM tracks
        WHERE track_id = ?;
    `
    const values = [trackId]
    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
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
    const track = tracks[0]
    return track
}





module.exports = { fetchTrackByTrackId }
