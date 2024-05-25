const { SqliteDatabaseHandler } = require('../handlers/SqliteDatabaseHandler.js');



async function save_playlist(db_filepath, tags, title) {

    const QUERY = `
        INSERT INTO playlists (tags, title) VALUES (?, ?)
    `
    const values = [tags, title] 

    const database = new SqliteDatabaseHandler()
    await database.connect(db_filepath)
    await database.upload(QUERY, values)

}

module.exports = { save_playlist }