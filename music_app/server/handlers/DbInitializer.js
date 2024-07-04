
const { SqliteDatabaseHandler } = require("./SqliteDatabaseHandler.js")
const { Logger } = require("./Logger.js")
const path = require('path');
const scriptName = path.basename(__filename);
const { getThisFunctionName } = require("../helpers/getThisFunctionName.js")


const logger = new Logger()


class DbInitializer {

    static async initializeDb(dbFilepath) {

        const LOGID = "454353"

        let tableExists 

        tableExists = await DbInitializer.checkIftableExists(dbFilepath, 'tracks')
        if (!tableExists) {
            DbInitializer.createTracksTable(dbFilepath)
        }

        tableExists = await DbInitializer.checkIftableExists(dbFilepath, 'tags')
        if (!tableExists) {
            DbInitializer.createTagsTable(dbFilepath)
        }

        tableExists = await DbInitializer.checkIftableExists(dbFilepath, 'playlists')
        if (!tableExists) {
            DbInitializer.createPlaylistsTable(dbFilepath)
        }

        logger.log("debug", LOGID, scriptName, getThisFunctionName(), 'Database successfully initialized', DbInitializer.name, Array.from(arguments))

    }



    static async checkIftableExists(dbFilepath, tableName) {

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
            logger.log("debug", LOGID, scriptName, getThisFunctionName(), 'Table exists', DbInitializer.name, Array.from(arguments))
            return true
        } 

        else {
            logger.log("debug", LOGID, scriptName, getThisFunctionName(), 'Table does not exist', DbInitializer.name, Array.from(arguments))
            return false
        }

    } 
    

    
    static async createTracksTable(dbFilepath) {

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



    static async createTagsTable(dbFilepath) {

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



    static async createPlaylistsTable(dbFilepath) {

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

}



module.exports = { DbInitializer }
