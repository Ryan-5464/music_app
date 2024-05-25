
const { SqliteDatabaseHandler } = require("./SqliteDatabaseHandler.js")
const { Logger } = require("./Logger.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")


const logger = new Logger()


class DatabaseInitializer {



    async initialize_database(db_filepath) {

        const LOGID = "454353"

        let table_exists 

        table_exists = await this.check_if_table_exists(db_filepath, 'tracks')
        if (!table_exists) {
            this.create_tracks_table(db_filepath)
        }

        table_exists = await this.check_if_table_exists(db_filepath, 'tags')
        if (!table_exists) {
            this.create_tags_table(db_filepath)
        }

        table_exists = await this.check_if_table_exists(db_filepath, 'playlists')
        if (!table_exists) {
            this.create_playlists_table(db_filepath)
        }

        logger.log("debug", LOGID, script_name, get_function_name(), 'Database successfully initialized', this.name, Array.from(arguments))

    }



    async check_if_table_exists(db_filepath, table_name) {

        const LOGID = '474382'

        const QUERY = `
            SELECT name FROM sqlite_master 
            WHERE type='table' 
            AND name='${table_name}'
        `
    
        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const result = await database.download(QUERY)
            
        if (result.length !== 0) {
            logger.log("debug", LOGID, script_name, get_function_name(), 'Table exists', this.name, Array.from(arguments))
            return true
        } 

        else {
            logger.log("debug", LOGID, script_name, get_function_name(), 'Table does not exist', this.name, Array.from(arguments))
            return false
        }

    } 
    

    
    async create_tracks_table(db_filepath) {

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
        await database.connect(db_filepath)
        await database.execute(QUERY)
        await database.disconnect()

    }



    async create_tags_table(db_filepath) {

        const QUERY = `
            CREATE TABLE IF NOT EXISTS tags (
                track_id INTEGER,
                tag TEXT NOT NULL,
                FOREIGN KEY (track_id) REFERENCES tracks(track_id),
                PRIMARY KEY (track_id, tag)
            )
        `
        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        await database.execute(QUERY)
        await database.disconnect()

    }



    async create_playlists_table(db_filepath) {

        const QUERY = `
            CREATE TABLE IF NOT EXISTS playlists (
                tags TEXT PRIMARY KEY,
                title TEXT UNIQUE
            )
        `
        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        await database.execute(QUERY)
        await database.disconnect()

    }

}



module.exports = { DatabaseInitializer }
