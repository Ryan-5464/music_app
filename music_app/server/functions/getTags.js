
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



async function getTags(dbFilepath, trackId) {
    const QUERY = `
        SELECT tag FROM tags 
        WHERE track_id = ?;
    `
    const values = [trackId]
    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
    const tags = await database.download(QUERY, values) 
    return tags
}

module.exports = { getTags }