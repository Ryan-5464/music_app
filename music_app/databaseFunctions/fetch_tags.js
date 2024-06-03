
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



async function fetch_tags(db_path, track_id) {
    const QUERY = `
        SELECT tag FROM tags 
        WHERE track_id = ?;
    `
    const values = [track_id]
    const database = new SqliteDatabaseHandler()
    await database.connect(db_path)
    const tags = await database.download(QUERY, values) 
    return tags
}

module.exports = { fetch_tags }