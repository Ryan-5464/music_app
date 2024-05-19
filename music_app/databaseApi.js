const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const { DB_FILEPATH } = require('./config.js');





async function database() {
    try {
        let db = await connectToDb();
        console.log("Database connection open.");
        initializeDb(db);
    }
    catch (error) {
        console.error(error.message);
    }
};



function connectToDb() {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(DB_FILEPATH, (err) => {
            if (err) {
                reject(err);
            };
            resolve(db);
        });
    });
};



async function initializeDb(db) {
    
    try {
        let tableExists;
        
        tableExists = await checkTableExists(db, 'audioFiles');
        if (!tableExists) {
            createAudioFilesTable(db);
        };
        
        tableExists = await checkTableExists(db, 'audioFileTags');
        if (!tableExists) {
            createAudioTagsTable(db);
        };
        
        tableExists = await checkTableExists(db, 'tagsPlaylists');
        if (!tableExists) {
            createAudioTagsTable(db);
        };
        
        tableExists = await checkTableExists(db, 'tagsPlaylists');
        if (!tableExists) {
            createAudioTagsTable(db);
        };

        console.log('Database initialized successfully.');
    } 
    catch (error) {
        console.error(err.message);
        process.exit(1);
    }
};



function checkTableExists(db, tableName) {
    const SEARCH_TAB_NAME_QUERY = `
        SELECT name FROM sqlite_master 
        WHERE type='table' 
        AND name='${tableName}'
    `;

    return new Promise((resolve, reject) => {
        db.get(SEARCH_TAB_NAME_QUERY, (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row !== undefined);
        });
    });
}



async function createAudioFilesTable(db) {
    const CREATE_AUDIOFILE_TAB_QUERY = `
        CREATE TABLE IF NOT EXISTS audio_metadata (
            id INTEGER PRIMARY KEY,
            audio_id TEXT NOT NULL,
            url TEXT NOT NULL,
            duration_sec INTEGER NOT NULL,
            local_file_path TEXT NOT NULL,
            file_size_b INTEGER NOT NULL,
            alias TEXT NOT NULL
        )
    `;

    try {
        await executeQuery(db, CREATE_AUDIOFILE_TAB_QUERY)
        console.log('Query executed succesfully.', CREATE_AUDIOFILE_TAB_QUERY);
    }

    catch (error) {
        console.error(error.message);
    }
}



async function createAudioTagsTable(db) {
    const CREATE_AUDIOTAGS_TAB_QUERY = `
        CREATE TABLE IF NOT EXISTS audio_tags (
            audio_id INTEGER,
            tag TEXT NOT NULL,
            FOREIGN KEY (audio_id) REFERENCES audio_metadata(audio_id),
            PRIMARY KEY (audio_id, tag)
        )
    `;
    
    try {
        await executeQuery(db, CREATE_AUDIOTAGS_TAB_QUERY)
        console.log('Query executed succesfully.', CREATE_AUDIOTAGS_TAB_QUERY);
    }
    catch (error) {
        console.error(error.message);
    }
};



async function createTagPlaylistsTable(db) {
    const CREATE_TAG_PLAYLISTS_TAB_QUERY = `
        CREATE TABLE IF NOT EXISTS playlists (
            tags TEXT PRIMARY KEY,
            alias TEXT UNIQUE
        );`

        try {
            await executeQuery(db, CREATE_TAG_PLAYLISTS_TAB_QUERY)
            console.log('Query executed succesfully.', CREATE_TAG_PLAYLISTS_TAB_QUERY);
        }
        catch (error) {
            console.error(error.message);
        }
}



async function selectTracksByTag(tagsList) {
    const tags = tagsList.map(tag => tag.split(' ').map(word => `'${word}'`)).join(', ');
    console.log("tagslist", tags);
    const QUERY = `SELECT * 
        FROM audio_metadata 
        WHERE audio_id IN (
            SELECT DISTINCT audio_id 
            FROM audio_tags 
            WHERE tag IN (${tags})
        );
    `;
    console.log("query", QUERY);
    try {
        const db = new sqlite3.Database(DB_FILEPATH);
        const result = await executeQuery2(db, QUERY);
        console.log("result1", result);
        return result;
    }

    catch(error) {
            console.log(error.message);
    };
}



async function selectPlaylists() {
    const QUERY = `SELECT * 
        FROM playlists; 
    `;
    console.log("query", QUERY);
    try {
        const db = new sqlite3.Database(DB_FILEPATH);
        const result = await executeQuery2(db, QUERY);
        console.log("result1", result);
        return result;
    }

    catch(error) {
            console.log(error.message);
    };  
}


function executeQuery(db, query) {
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err !== null) {
                reject(err);
            };
            resolve();
        });
    });
};



function executeQuery2(db, query) {
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}








module.exports = { database, selectTracksByTag, selectPlaylists };





