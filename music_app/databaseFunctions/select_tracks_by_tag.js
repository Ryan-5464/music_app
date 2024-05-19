const sqlite3 = require('sqlite3').verbose();
const { DEBUG } = require('../config.js');
const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")



const logger = new Logger()



async function select_tracks_by_tag(db_filepath, tags_list, any_button_active) {

    const LOG_ID = '283743'

    if (DEBUG) {
        logger.debug(LOG_ID, {'origin': '(select_tracks_by_tag.js > select_tracks_by_tag)'})
        logger.debug(LOG_ID, {'args': `{'db_filepath': ${db_filepath}, 'tags_list': ${tags_list}, 'any_button_active': ${any_button_active}}`}) 
    }

    let QUERY;
    const tags = tags_list.map(tag => tag.split(' ').map(word => `'${word}'`)).join(', ');
    const n = tags.split(',').length;
    
    if (DEBUG) {
        logger.debug(LOG_ID, {'tags': tags})
    }
    
    if (any_button_active === true) {
        
        // QUERY = `
        //     SELECT * FROM audio_metadata 
        //     WHERE audio_id IN (
        //         SELECT DISTINCT audio_id 
        //             FROM audio_tags 
        //             WHERE tag IN (${tags})
        //     );
        // `;

        QUERY = `
            SELECT *
            FROM audio_metadata
            LEFT JOIN audio_tags ON audio_metadata.audio_id = audio_tags.audio_id
                AND audio_tags.tag IN (${tags})
            WHERE audio_tags.tag IS NOT NULL
            GROUP BY audio_metadata.audio_id;
        `
    } 

    else {

        QUERY = `
            SELECT * 
            FROM audio_metadata
            LEFT JOIN audio_tags ON audio_metadata.audio_id = audio_tags.audio_id
                AND audio_tags.tag IN (${tags})
                WHERE audio_tags.tag IS NOT NULL
                GROUP BY audio_metadata.audio_id
                HAVING COUNT(DISTINCT tag) = ${n};
        `
            // WHERE audio_id IN (
            //     SELECT audio_id FROM audio_tags
            //     WHERE tag IN (${tags})
            //     GROUP BY audio_id
            //     HAVING COUNT(DISTINCT tag) = ${n}
            // );
    }

    if (tags.length === 2) {

        QUERY = `
            SELECT * FROM audio_metadata;
        `
    }
        
    if (DEBUG) { 
        logger.debug(LOG_ID, {'query': QUERY})
    }
    
    try {

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)
        const result = await database.download(QUERY)

        if (DEBUG) {
            logger.debug(LOG_ID, {'result': result})
        }
        return result
    }

    catch(error) {
        console.log(error.message)
    }
}





module.exports = { select_tracks_by_tag }