const sqlite3 = require('sqlite3').verbose();
const { DB_FILEPATH } = require('../config.js');
const fsp = require('fs').promises;


async function saveTagsPlaylist(tags, playlistName) {
    const db = new sqlite3.Database(DB_FILEPATH);
    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO tagPlaylists (tags, playlistName) VALUES (?, ?)');
        stmt.run(tags, playlistName, (error) => {
            if (error) {
                console.error(error.message, error.stack);
            }
            console.debug('DEBUG : Data inserted successfully.');
        });
        stmt.finalize();
    })
}

module.exports = { saveTagsPlaylist }