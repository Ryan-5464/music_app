const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { log } = require("../handlers/Logger.js")
const path = require('path');
const scriptName = path.basename(__filename);
const { getThisFunctionName } = require("../helpers/helpers.js")





async function initializeDb(dbFilepath) {

    const LOGID = "454353"

    let tableExists 

    tableExists = await checkIftableExists(dbFilepath, 'tracks')
    if (!tableExists) {
        createTracksTable(dbFilepath)
    }

    tableExists = await checkIftableExists(dbFilepath, 'tags')
    if (!tableExists) {
        createTagsTable(dbFilepath)
    }

    tableExists = await checkIftableExists(dbFilepath, 'playlists')
    if (!tableExists) {
        createPlaylistsTable(dbFilepath)
    }

    log("debug", LOGID, scriptName, getThisFunctionName(), 'Database successfully initialized', "", Array.from(arguments))

}





module.exports = { initializeDb }




async function checkIftableExists(dbFilepath, tableName) {

    const LOGID = '474382'

    const QUERY = `
        SELECT name FROM sqlite_master 
        WHERE type='table' 
        AND name='${tableName}'
    `

    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
    const result = await database.download(QUERY)
        
    if (result.length !== 0) {
        log("debug", LOGID, scriptName, getThisFunctionName(), 'Table exists', "", Array.from(arguments))
        return true
    } 

    else {
        log("debug", LOGID, scriptName, getThisFunctionName(), 'Table does not exist', "", Array.from(arguments))
        return false
    }

} 





async function createTracksTable(dbFilepath) {

    const QUERY = `
        CREATE TABLE IF NOT EXISTS tracks (
            id INTEGER PRIMARY KEY,
            track_id TEXT NOT NULL,
            url TEXT NOT NULL,
            duration_sec INTEGER NOT NULL,
            local_path TEXT NOT NULL,
            file_size_b INTEGER NOT NULL,
            title TEXT NOT NULL, 
            times_played INTEGER DEFAULT 0,
            date_downloaded DEFAULT (DATE('now'))
        )
    `
    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
    await database.execute(QUERY)
    await database.disconnect()

}





async function createTagsTable(dbFilepath) {

    const QUERY = `
        CREATE TABLE IF NOT EXISTS tags (
            track_id INTEGER,
            tag TEXT NOT NULL,
            FOREIGN KEY (track_id) REFERENCES tracks(track_id),
            PRIMARY KEY (track_id, tag)
        )
    `
    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
    await database.execute(QUERY)
    await database.disconnect()

}





async function createPlaylistsTable(dbFilepath) {

    const QUERY = `
        CREATE TABLE IF NOT EXISTS playlists (
            tags TEXT PRIMARY KEY,
            title TEXT UNIQUE
        )
    `
    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)
    await database.execute(QUERY)
    await database.disconnect()

}