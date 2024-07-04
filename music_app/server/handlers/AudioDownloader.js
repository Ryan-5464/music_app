
const { SqliteDatabaseHandler } = require("./SqliteDatabaseHandler.js")
const { FileHandler } = require("./FileHandler.js")
const { Logger } = require("./Logger.js")
const path = require('path');
const scriptName = path.basename(__filename);
const { getThisFunctionName } = require("../helpers/getThisFunctionName.js")
var ytdl = require('ytdl-core');
const fs = require('fs');
const config = require("../../config.json")


const logger = new Logger() 



class AudioDownloader {

    static async downloadAudio (dbFilepath, url) {

        const LOGID = "454535"

        const audioExists = await AudioDownloader.checkIfAudioFileExists(dbFilepath, url);
        if (audioExists) {
            logger.log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', AudioDownloader.name, Array.from(arguments))
            return 1;
        }   
    
        const metadata = await AudioDownloader.requestTracks(url);
        if (!metadata) {
            logger.log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', AudioDownloader.name, Array.from(arguments))
            return null;
        }
      
        const downloadSuccess = await AudioDownloader.downloadFile(url, metadata.localPath);
        if (!downloadSuccess) {
            logger.log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', AudioDownloader.name, Array.from(arguments))
            return null;
        };
    
        const metadataUploaded = await AudioDownloader.uploadMetadata(dbFilepath, metadata.trackId, metadata.url, metadata.duration, metadata.localPath, metadata.title)
        if (!metadataUploaded) {
            logger.log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', AudioDownloader.name, Array.from(arguments))
            return null;
        };
    
        return true;
    
    }

    static async checkIfAudioFileExists(dbFilepath, url) {

        const LOGID = '273482'

        const database = new SqliteDatabaseHandler()
        await database.connect(dbFilepath)

        const query = `SELECT * FROM tracks WHERE url = ?`
        const values = [url]
        const result = await database.download(query, values)
        await database.disconnect()

        if (result.length === 0) {

            logger.log("debug", LOGID, scriptName, getThisFunctionName(), 'Audio does not exist', AudioDownloader.name, Array.from(arguments))
            return

        } else {

            logger.log("debug", LOGID, scriptName, getThisFunctionName(), 'Audio exists', AudioDownloader.name, Array.from(arguments))
            return true

        }

    }

        
    static async requestTracks(url) {

        const LOGID = '192892'

        try {

            const info = await ytdl.getInfo(url)
            console.log(info)
            console.log("info", info.videoDetails.videoId)
            const metadata = {
                "trackId": info.videoDetails.videoId,
                "url": url,
                "duration": info.videoDetails.lengthSeconds,
                "localPath": config.TRACK_FILENAME.replace("[]", info.videoDetails.videoId),
                "title": info.videoDetails.title 
            }

            const message = `{'trackId': ${metadata.trackId}, 'url': ${metadata.url}, 'duration': ${metadata.duration}, 'localPath': ${metadata.localPath}, 'title': ${metadata.title}}`
            logger.log("debug", LOGID, scriptName, getThisFunctionName(), message, AudioDownloader.name, Array.from(arguments))
            logger.log("info", LOGID, scriptName, getThisFunctionName(), "Metadata retrieved", AudioDownloader.name, Array.from(arguments))

            return metadata

        }

        catch (error) {
            
            logger.log("error", LOGID, scriptName, getThisFunctionName(), error.message, AudioDownloader.name, Array.from(arguments))
            return

        }

    }


    static async downloadFile(url, localPath) {

        const LOGID = '038238'


        try {

            const video = ytdl(url,{ filter: 'audioonly', format: 'mp3' })
            const output_stream = fs.createWriteStream(localPath)
        
            await new Promise((resolve, reject) => {
                output_stream.on('finish', resolve)
                output_stream.on('error', reject)
                video.pipe(output_stream)
            });
            logger.log("debug", LOGID, scriptName, getThisFunctionName(), 'Audio downloaded successfully', AudioDownloader.name, Array.from(arguments))
            return true

        }
    
        catch (error) {

            logger.log("error", LOGID, scriptName, getThisFunctionName(), error.message, AudioDownloader.name, Array.from(arguments))
            logger.log("info", LOGID, scriptName, getThisFunctionName(), `Unable to download file from url --> ${url}`, AudioDownloader.name, Array.from(arguments))
        }
      
    }
    
    static async uploadMetadata(dbFilepath, trackId, url, duration, localPath, title) {

        const LOGID = '738473'

        const fileSizeB = FileHandler.fileSizeInBytes(localPath)

        logger.log("debug", LOGID, scriptName, getThisFunctionName(), `{"file size in bytes": ${fileSizeB}}`, AudioDownloader.name, Array.from(arguments))

        const database  = new SqliteDatabaseHandler()
        await database.connect(dbFilepath)

        const INSERT_QUERY = `
            INSERT INTO tracks
            (track_id, url, duration_sec, local_path, file_size_b, title) 
            VALUES 
            (?, ?, ?, ?, ?, ?)
        `

        const values = [trackId, url, duration, localPath, fileSizeB, title]

        const success = await database.upload(INSERT_QUERY, values)

        if (!success) {

            logger.log("error", LOGID, scriptName, getThisFunctionName(), error.message, AudioDownloader.name, Array.from(arguments))
            logger.log("info", LOGID, scriptName, getThisFunctionName(), 'Failed to upload metadata. Deleting audio file...', AudioDownloader.name, Array.from(arguments))

            await file_handler.delete(localPath) 
            await database.disconnect()
            return
        }

        await database.disconnect()
        return true
    }

}


module.exports = { AudioDownloader }