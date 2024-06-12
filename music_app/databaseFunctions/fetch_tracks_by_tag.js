const sqlite3 = require('sqlite3').verbose();
const { Logger } = require("../handlers/Logger.js")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js");
const { devNull } = require('os');


const logger = new Logger()



async function fetch_tracks_by_tag(db_filepath, tags_list, any_button_active) {

    const LOG_ID = '283743'

    let QUERY;
    console.log("tags_list", tags_list)
    const n = tags_list.length;
    const tags = tags_list.map(word => `'${word}'`).join(',')
    console.log("TAGS", tags)
    logger.log("debug", LOG_ID, script_name, get_function_name(), `{'tags': ${tags}}`, "", Array.from(arguments))
    
    if (any_button_active === true) {
        
        QUERY = `    
            SELECT DISTINCT tracks.id, tracks.track_id, tracks.url, tracks.duration_sec, 
            tracks.local_path, tracks.file_size_b, tracks.title, 
            tracks.times_played, tracks.date_downloaded
            FROM tracks
            WHERE EXISTS (
                SELECT 1 
                FROM tags 
                WHERE tags.track_id = tracks.track_id 
                AND tags.tag IN (${tags})
            )
        ;`
        //     SELECT *
        //     FROM tracks
        //     LEFT JOIN tags ON tracks.track_id = tags.track_id
        //         AND tags.tag IN (${tags})
        //         WHERE tags.tag IS NOT NULL
        //         GROUP BY tracks.track_id;

        // `
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

    if (tags.length === 2 || tags.length === 1) {

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




class TrackTagFilter {
    
    constructor () {
        this.database = new SqliteDatabaseHandler()
    }
    
    async fetchTracksByTag(dbPath, tagsList, anyButtonActive) {
        await this.database.connect(dbPath)
        console.log("EIEIEIE", tagsList)
        let tracks = null
        if (tagsList.length === 1) {    
            console.log("testetst")
            tracks = await this.fetchTracksNoTagFilter()
            tracks = await this.fetchTags(tracks)
            await this.database.disconnect()
            console.log("class tracks", tracks)
            return tracks
        }
        if (anyButtonActive) {
            tracks = await this.fetchTracksAnyTagFilter(tagsList)
            tracks = await this.fetchTags(tracks)
            await this.database.disconnect()
            console.log("class tracks", tracks)
            return tracks
        }
        else {
            tracks = await this.fetchTracksAllTagFilter(tagsList)
            tracks = await this.fetchTags(tracks)
            await this.database.disconnect()
            console.log("class tracks", tracks)
            return tracks
        }
    }
    
    convertTagListToString(tagsList) {
        const tagsString = tagsList.map(word => `'${word}'`).join(', ')
        return tagsString
    }

    getPlaceholders(length) {
        let placeholders = '?'
        for (let i = 1; i < length; i++) {
            placeholders = placeholders + ', ?'
        }
        return placeholders
    }
    
    async fetchTracksAnyTagFilter(tagsList) {
        const placeholders = this.getPlaceholders(tagsList.length)
        const QUERY = `    
                SELECT DISTINCT tracks.id, tracks.track_id, tracks.url, tracks.duration_sec, 
                tracks.local_path, tracks.file_size_b, tracks.title, 
                tracks.times_played, tracks.date_downloaded
            FROM tracks
            INNER JOIN tags ON tracks.track_id = tags.track_id
            WHERE tags.tag IN (${placeholders});
        `
        const tracks = await this.database.download(QUERY, tagsList)
        console.log("Atracks", tracks)
        return tracks
    }
        
    async fetchTracksAllTagFilter(tagsList) {
        const n = tagsList.length
        const tagString = this.convertTagListToString(tagsList)
        const QUERY = `   
            SELECT DISTINCT tracks.id, tracks.track_id, tracks.url, tracks.duration_sec, 
            tracks.local_path, tracks.file_size_b, tracks.title, 
            tracks.times_played, tracks.date_downloaded
            FROM tracks
            WHERE tracks.track_id IN (
                SELECT track_id
                FROM tags
                WHERE tag IN (${tagString})
                GROUP BY track_id
                HAVING COUNT(DISTINCT tag) = ${n}
            );
        `
        const tracks = await this.database.download(QUERY)
        return tracks
    }
        
    async fetchTracksNoTagFilter() {
        const QUERY = `   
            SELECT * FROM tracks;
        `
        const tracks = await this.database.download(QUERY)
        return tracks
    }

    async fetchTags(tracks) {
        const QUERY = `
            SELECT tag FROM tags 
            WHERE track_id = ?
        `
        for (const _track of tracks) {
            console.log("_track", _track)
            _track.tags = await this.database.download(QUERY, [_track.track_id])
        }
        return tracks
    }
}

module.exports = { TrackTagFilter }