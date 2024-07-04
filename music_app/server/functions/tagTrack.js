const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



async function tagTrack(dbFilepath, trackId, tag) {
    const QUERY = `
        INSERT INTO tags (track_id, tag) VALUES (?, ?);
    `
    const values = [trackId, tag]
    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
    await database.upload(QUERY, values)
}

module.exports = { tagTrack }