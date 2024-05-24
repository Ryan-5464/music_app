const { SqliteDatabaseHandler } = require("./SqliteDatabaseHandler.js")


class TrackListHandler {

    async fetch_track_count(db_filepath) {

        const query = `
            SELECT COUNT(*) AS count FROM audio_metadata;
        `

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const track_count = await database.download(query)
        return track_count
    }

}



module.exports = { TrackListHandler }