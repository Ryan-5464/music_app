
const { SqliteDatabaseHandler } = require("./SqliteDatabaseHandler.js")
const { FileHandler } = require("./FileHandler.js")
const { DEBUG, DB_FILEPATH, AUDIO_FILENAME } = require("../config.js")
const { Logger } = require("./Logger.js")
var ytdl = require('ytdl-core');
const fs = require('fs');



const logger = new Logger() 



class AudioDownloader {

    async download_audio (db_filepath, url) {

        const LOG_ID = "454535"

        const audio_exists = await this.check_if_audio_exists(db_filepath, url);
        if (audio_exists) {
            logger.error(LOG_ID, {'message': 'Failed to download audio'})
            return null;
        }   
    
        const metadata = await this.request_audio_metadata(url);
        if (!metadata) {
            logger.error(LOG_ID, {'message': 'Failed to download audio'})
            return null;
        }
      
        const download_success = await this.download_file(url, metadata.local_file_path);
        if (!download_success) {
            logger.error(LOG_ID, {'message': 'Failed to download audio'})
            return null;
        };
    
        const metadata_uploaded = await this.upload_metadata(db_filepath, metadata.audio_id, metadata.url, metadata.duration_sec, metadata.local_file_path, metadata.alias)
        if (!metadata_uploaded) {
            logger.error(LOG_ID, {'message': 'Failed to download audio'})
            return null;
        };
    
        return true;
    
    }

    async check_if_audio_exists(db_filepath, url) {

        const LOG_ID = '273482'

        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(AudioDownloader > check_if_audio_exists)'})
            logger.debug(LOG_ID, {'args': `{'db_filepath: ${db_filepath}, url: ${url}}`})
        }

        const database = new SqliteDatabaseHandler()
        await database.connect(db_filepath)

        const query = `SELECT * FROM audio_metadata WHERE url = ?`
        const values = [url]
        const result = await database.download(query, values)
        await database.disconnect()

        if (result.length === 0) {

            if (DEBUG) {
                logger.debug(LOG_ID, {'message': 'Audio does not exist'})
            }
            return

        } else {

            if (DEBUG) {
                logger.debug(LOG_ID, {'message': 'Audio exists'})
            }
            return true

        }

    }

        
    async request_audio_metadata(url) {

        const LOG_ID = '192892'

        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(AudioDownloader > request_audio_metadata)'})
            logger.debug(LOG_ID, {'args': `{'url': ${url}}`})
        }

        try {

            const info = await ytdl.getInfo(url)
            const metadata = {
                "audio_id": info.videoDetails.videoId,
                "url": url,
                "duration_sec": info.videoDetails.lengthSeconds,
                "local_file_path": AUDIO_FILENAME.replace("[]", info.videoDetails.videoId),
                "alias": info.videoDetails.title 
            }

            if (DEBUG) {
                logger.debug(LOG_ID, {'metadata': `{'audio_id': ${metadata.audio_id}, 'url': ${metadata.url}, 'duration_sec': ${metadata.duration_sec}, 'local_file_path': ${metadata.local_file_path}, 'alias': ${metadata.alias}}`})
            }

            logger.info(LOG_ID, {'message': "Metadata retrieved"})

            return metadata

        }

        catch (error) {
            
            if (DEBUG) {
                logger.debug(LOG_ID, {'error': error.message})
            }

            logger.error(LOG_ID, {'message': 'Audio not found'})
            return

        }

    }


    async download_file(url, local_file_path) {

        const LOG_ID = '038238'

        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(AudioDownloader > download_file)'})
            logger.debug(LOG_ID, {'args': `{'url': ${url}, 'local_file_path': ${local_file_path}}`})
        }

        try {

            const video = ytdl(url,{ filter: 'audioonly', format: 'mp3' })
            const output_stream = fs.createWriteStream(local_file_path)
        
            await new Promise((resolve, reject) => {
                output_stream.on('finish', resolve)
                output_stream.on('error', reject)
                video.pipe(output_stream)
            });

            console.log(LOG_ID, {'message': 'Audio downloaded successfully'})
            return true

        }
    
        catch (error) {

            if (DEBUG) {
                logger.debug(LOG_ID, {'error message': error.message})
            }
            
            logger.error(LOG_ID, {'message': `Unable to download file from url --> ${url}`})
        }
      
    }
    
    async upload_metadata(db_filepath, audio_id, url, duration_sec, local_file_path, alias) {

        const LOG_ID = '738473'

        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(AudioDownloader > upload_metadata)'})
            logger.debug(LOG_ID, {'args': `{'db_filepath': ${db_filepath}, 'audio_id': ${audio_id}, 'url': ${url}, 'duration_sec': ${duration_sec}, 'local_file_path': ${local_file_path}, 'alias': ${alias}}`})
        }

        const file_handler = new FileHandler()
        const file_size_b = file_handler.file_size_in_bytes(local_file_path)

        if (DEBUG) {
            logger.debug(LOG_ID, {'file size in bytes': file_size_b})
        }

        const database  = new SqliteDatabaseHandler()
        await database.connect(db_filepath)

        const INSERT_QUERY = `
            INSERT INTO audio_metadata
            (audio_id, url, duration_sec, local_file_path, file_size_b, alias) 
            VALUES 
            (?, ?, ?, ?, ?, ?)
        `

        const values = [audio_id, url, duration_sec, local_file_path, file_size_b, alias]

        const success = await database.upload(INSERT_QUERY, values)

        if (!success) {

            if (DEBUG) {
                logger.debug(LOG_ID, {'error message': error.message})
                logger.debug(LOG_ID, {'message': 'Failed to upload metadata. Deleting audio file...'})
            }

            await file_handler.delete(local_file_path) 
            await database.disconnect()
            return
        }

        await database.disconnect()
        return true
    }

}


module.exports = { AudioDownloader }