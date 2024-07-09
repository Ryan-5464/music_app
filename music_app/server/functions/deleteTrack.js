const { log } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { deleteFile } = require("../handlers/FileHandler.js");
const config = require("../../config.json")
const path = require('path');
const scriptName = path.basename(__filename);
const { getThisFunctionName } = require("../helpers/helpers.js")





export async function deleteTrack(dbFilepath, trackId) {
    const LOG_ID = '273783'

    const QUERY = `
        DELETE FROM tracks
        WHERE track_id = ?;
    `;

    const file_path = config.TRACK_FILENAME.replace("[]", trackId);
    await deleteFile(file_path);

    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
    const values = [trackId]
    await database.upload(QUERY, values)
    await database.disconnect()

    log("info", LOG_ID, scriptName, getThisFunctionName(), 'Track deleted successfully', "", Array.from(arguments))

}


