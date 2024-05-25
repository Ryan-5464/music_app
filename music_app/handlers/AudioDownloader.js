
const { SqliteDatabaseHandler } = require("./SqliteDatabaseHandler.js")
const { FileHandler } = require("./FileHandler.js")
const { Logger } = require("./Logger.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")
var ytdl = require('ytdl-core');
const fs = require('fs');
const { TRACK_FILENAME } = require("../config.js")


const logger = new Logger() 



class AudioDownloader {

    async download_audio (db_filepath, url) {

        const LOGID = "454535"

        const audio_exists = await this.check_if_audio_exists(db_filepath, url);
        if (audio_exists) {
            logger.log("error", LOGID, script_name, get_function_name(), 'Failed to download track', this.name, Array.from(arguments))
            return null;
        }   
    
        const metadata = await this.request_tracks(url);
        if (!metadata) {
            logger.log("error", LOGID, script_name, get_function_name(), 'Failed to download track', this.name, Array.from(arguments))
            return null;
        }
      
        const download_success = await this.download_file(url, metadata.local_path);
        if (!download_success) {
            logger.log("error", LOGID, script_name, get_function_name(), 'Failed to download track', this.name, Array.from(arguments))
            return null;
        };
    
        const metadata_uploaded = await this.upload_metadata(db_filepath, metadata.track_id, metadata.url, metadata.duration_sec, metadata.local_path, metadata.title)
        if (!metadata_uploaded) {
            logger.log("error", LOGID, script_name, get_function_name(), 'Failed to download track', this.name, Array.from(arguments))
            return null;
        };
    
        return true;
    
    }

    async check_if_audio_exists(db_filepath, url) {

        const LOGID = '273482'

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)

        const query = `SELECT * FROM tracks WHERE url = ?`
        const values = [url]
        const result = await database.download(query, values)
        await database.disconnect()

        if (result.length === 0) {

            logger.log("debug", LOGID, script_name, get_function_name(), 'Audio does not exist', this.name, Array.from(arguments))
            return

        } else {

            logger.log("debug", LOGID, script_name, get_function_name(), 'Audio exists', this.name, Array.from(arguments))
            return true

        }

    }

        
    async request_tracks(url) {

        const LOGID = '192892'

        try {

            const info = await ytdl.getInfo(url)
            console.log(info)
            console.log("info", info.videoDetails.videoId)
            const metadata = {
                "track_id": info.videoDetails.videoId,
                "url": url,
                "duration_sec": info.videoDetails.lengthSeconds,
                "local_path": TRACK_FILENAME.replace("[]", info.videoDetails.videoId),
                "title": info.videoDetails.title 
            }

            const message = `{'track_id': ${metadata.track_id}, 'url': ${metadata.url}, 'duration_sec': ${metadata.duration_sec}, 'local_path': ${metadata.local_path}, 'title': ${metadata.title}}`
            logger.log("debug", LOGID, script_name, get_function_name(), message, this.name, Array.from(arguments))
            logger.log("info", LOGID, script_name, get_function_name(), "Metadata retrieved", this.name, Array.from(arguments))

            return metadata

        }

        catch (error) {
            
            logger.log("error", LOGID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
            return

        }

    }


    async download_file(url, local_path) {

        const LOGID = '038238'


        try {

            const video = ytdl(url,{ filter: 'audioonly', format: 'mp3' })
            const output_stream = fs.createWriteStream(local_path)
        
            await new Promise((resolve, reject) => {
                output_stream.on('finish', resolve)
                output_stream.on('error', reject)
                video.pipe(output_stream)
            });
            logger.log("debug", LOGID, script_name, get_function_name(), 'Audio downloaded successfully', this.name, Array.from(arguments))
            return true

        }
    
        catch (error) {

            logger.log("error", LOGID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
            logger.log("info", LOGID, script_name, get_function_name(), `Unable to download file from url --> ${url}`, this.name, Array.from(arguments))
        }
      
    }
    
    async upload_metadata(db_filepath, track_id, url, duration_sec, local_path, title) {

        const LOGID = '738473'

        const file_handler = new FileHandler()
        const file_size_b = file_handler.file_size_in_bytes(local_path)

        logger.log("debug", LOGID, script_name, get_function_name(), `{"file size in bytes": ${file_size_b}}`, this.name, Array.from(arguments))

        const database  = new SqliteDatabaseHandler()
        await database.connect(db_filepath)

        const INSERT_QUERY = `
            INSERT INTO tracks
            (track_id, url, duration_sec, local_path, file_size_b, title) 
            VALUES 
            (?, ?, ?, ?, ?, ?)
        `

        const values = [track_id, url, duration_sec, local_path, file_size_b, title]

        const success = await database.upload(INSERT_QUERY, values)

        if (!success) {

            logger.log("error", LOGID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
            logger.log("info", LOGID, script_name, get_function_name(), 'Failed to upload metadata. Deleting audio file...', this.name, Array.from(arguments))

            await file_handler.delete(local_path) 
            await database.disconnect()
            return
        }

        await database.disconnect()
        return true
    }

}


module.exports = { AudioDownloader }