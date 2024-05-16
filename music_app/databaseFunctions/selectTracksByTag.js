const sqlite3 = require('sqlite3').verbose();
const { DB_FILEPATH } = require('../config.js');



async function selectTracksByTag(tagsList, anyButtonActive) {
    let QUERY;
    const tags = tagsList.map(tag => tag.split(' ').map(word => `'${word}'`)).join(', ');
    const n = tags.split(',').length;
    console.log("tagslist", tags);
    
    if (anyButtonActive === true) {
        QUERY = `
        SELECT * FROM audioFiles 
        WHERE audioFileId IN (
            SELECT DISTINCT audioFileId 
                FROM audioFileTags 
                WHERE tag IN (${tags})
            );
            `;

        QUERY = `
            SELECT *
            FROM audioFiles
            LEFT JOIN audioFileTags ON audioFiles.audioFileId = audioFileTags.audioFileId
                AND audioFileTags.tag IN (${tags})
            WHERE audioFileTags.tag IS NOT NULL
            GROUP BY audioFiles.audioFileId;
        `
        } 

    else {
        QUERY = `
        SELECT * 
        FROM audioFiles
        LEFT JOIN audioFileTags ON audioFiles.audioFileId = audioFileTags.audioFileId
            AND audioFileTags.tag IN (${tags})
            WHERE audioFileTags.tag IS NOT NULL
            GROUP BY audioFiles.audioFileId
            HAVING COUNT(DISTINCT tag) = ${n};
            `;
            // WHERE audioFileId IN (
            //     SELECT audioFileId FROM audioFileTags
            //     WHERE tag IN (${tags})
            //     GROUP BY audioFileId
            //     HAVING COUNT(DISTINCT tag) = ${n}
            // );
        }

    if (tags.length === 2) {
        console.log("tagslist is empty");
        QUERY = `
            SELECT * FROM audioFiles;
        `
    }
        
    console.log("query", QUERY);
    
    try {
        const db = new sqlite3.Database(DB_FILEPATH);
        const result = await executeQuery(db, QUERY);
        console.log("result1", result);
        return result;
    }

    catch(error) {
            console.log(error.message);
    };
}



function executeQuery(db, query) {
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows); // Resolve with the rows returned by the query
            }
        });
    });
}


module.exports = { selectTracksByTag }