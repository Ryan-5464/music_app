const sqlite3 = require('sqlite3').verbose();
const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")


const logger = new Logger()



async function select_tracks_by_tag(db_filepath, tags_list, any_button_active) {

    const LOG_ID = '283743'

    let QUERY;
    const tags = tags_list.map(tag => tag.split(' ').map(word => `'${word}'`)).join(', ');
    const n = tags.split(',').length;
    
    logger.log("debug", LOG_ID, script_name, get_function_name(), `{'tags': ${tags}}`, "", Array.from(arguments))
    
    if (any_button_active === true) {
        
        QUERY = `
            SELECT *
            FROM tracks
            LEFT JOIN tags ON tracks.track_id = tags.track_id
                AND tags.tag IN (${tags})
            WHERE tags.tag IS NOT NULL
            GROUP BY tracks.track_id;
        `
    } 

    else {

        QUERY = `
            SELECT * 
            FROM tracks
            LEFT JOIN tags ON tracks.track_id = tags.track_id
                AND tags.tag IN (${tags})
                WHERE tags.tag IS NOT NULL
                GROUP BY tracks.track_id
                HAVING COUNT(DISTINCT tag) = ${n};
        `
    }

    if (tags.length === 2) {

        QUERY = `
            SELECT * FROM tracks;
        `
    }
        
    logger.log("debug", LOG_ID, script_name, get_function_name(), `{'query': ${QUERY}}`, "", Array.from(arguments))

    try {

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const result = await database.download(QUERY)

        logger.log("debug", LOG_ID, script_name, get_function_name(), `{'result': ${result}}`, "", Array.from(arguments))
        return result
    }

    catch(error) {
        logger.log("error", LOG_ID, script_name, get_function_name(), error.message, "", Array.from(arguments))
    }
}





module.exports = { select_tracks_by_tag }