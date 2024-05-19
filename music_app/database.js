
const { SqliteDatabaseHandler } = require("./handlers/SqliteDatabaseHandler.js")
const { Logger } = require("./handlers/Logger.js")



class DatabaseInitializer {



    async initialize_database(db_filepath) {

        let table_exists 

        table_exists = await this.check_if_table_exists(db_filepath, 'audio_metadata')
        if (!table_exists) {
            this.create_audio_metadata_table(db_filepath)
        }

        table_exists = await this.check_if_table_exists(db_filepath, 'audio_tags')
        if (!table_exists) {
            this.create_audio_tags_table(db_filepath)
        }

        table_exists = await this.check_if_table_exists(db_filepath, 'playlists')
        if (!table_exists) {
            this.create_playlists_table(db_filepath)
        }

        if (DEBUG) {
            console.debug("DEBUG : class=DatabaseInitializer : func=initialize_database : message='Database successfully initialized'")
        }
    }



    async check_if_table_exists(db_filepath, table_name) {

        const QUERY = `
            SELECT name FROM sqlite_master 
            WHERE type='table' 
            AND name='${table_name}'
        `
    
        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const result = await database.download(QUERY)
        if (result !== undefined) {
            if (DEBUG) {
                console.debug("DEBUG : class=DatabaseInitializer : func=initialize_database : message='Table exists'")
            }
            return true
        } else {
            if (DEBUG) {
                console.debug("DEBUG : class=DatabaseInitializer : func=initialize_database : message=Table does not exist")
            }
            return false
        }
    } 
    

    
    async create_audio_metadata_table(db_filepath) {
        
        const QUERY = `
            CREATE TABLE IF NOT EXISTS audio_metadata (
                id INTEGER PRIMARY KEY,
                audio_id TEXT NOT NULL,
                url TEXT NOT NULL,
                duration_sec INTEGER NOT NULL,
                local_file_path TEXT NOT NULL,
                file_size_b INTEGER NOT NULL,
                alias TEXT NOT NULL
            )
        `
        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        await database.execute(QUERY)
        await database.disconnect()

    }



    async create_audio_tags_table(db_filepath) {

        const QUERY = `
            CREATE TABLE IF NOT EXISTS audio_tags (
                audio_id INTEGER,
                tag TEXT NOT NULL,
                FOREIGN KEY (audio_id) REFERENCES audio_metadata(audio_id),
                PRIMARY KEY (audio_id, tag)
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
                alias TEXT UNIQUE
            )
        `
        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        await database.execute(QUERY)
        await database.disconnect()
    
    }

}



module.exports = { DatabaseInitializer }
