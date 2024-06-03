const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



async function tag_track(db_path, track_id, tag) {
    const QUERY = `
        INSERT INTO tags (track_id, tag) VALUES (?, ?);
    `
    const values = [track_id, tag]
    const database = new SqliteDatabaseHandler()
    await database.connect(db_path)
    await database.upload(QUERY, values)
}

module.exports = { tag_track }