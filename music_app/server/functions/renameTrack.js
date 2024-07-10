const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



async function renameTrack(dbFilepath, trackId, newName) {
    console.log("trig")
    const QUERY = `
        UPDATE tracks
        SET title = ?
        WHERE track_id = ?;    
    `
    const values = [newName, trackId]
    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
    await database.upload(QUERY, values)
    return null
}





module.exports = { renameTrack }
