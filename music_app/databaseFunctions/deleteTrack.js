const sqlite3 = require('sqlite3').verbose();
const { DB_FILEPATH, AUDIO_FILENAME } = require('../config.js');
const fsp = require('fs').promises;


async function deleteTrack(audioFileId) {
    DELETE_TRACK_QUERY = `
        DELETE FROM audioFiles
        WHERE audioFileId = ?;
    `;
    console.log("query", DELETE_TRACK_QUERY);
    try {
        await deleteFile(audioFileId);
        const db = new sqlite3.Database(DB_FILEPATH);
        await executeQuery(db, DELETE_TRACK_QUERY, audioFileId);
        console.log('Query executed succesfully.', DELETE_TRACK_QUERY);
    }

    catch (error) {
        console.error(error.message);
    }
}


function executeQuery(db, query, audioFileId) {
    return new Promise((resolve, reject) => {
        db.run(query, audioFileId, (err) => {
            if (err !== null) {
                reject(err);
            };
            resolve();
        });
    });
};


async function deleteFile (audioFileId) {
    const filePath = AUDIO_FILENAME.replace("[]", audioFileId);
    await fsp.unlink(filePath, (error) => {
        if (error) {
            console.error(error.message);
        }
        console.log(`File ${filePath} has been deleted successfully`);
    });

}



module.exports = { deleteTrack }