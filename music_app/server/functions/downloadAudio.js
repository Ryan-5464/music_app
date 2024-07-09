const { log } = require("../handlers/Logger.js")
const { getThisFunctionName } = require("../helpers/helpers.js")
const path = require('path');
const scriptName = path.basename(__filename);
var ytdl = require('ytdl-core');
const fs = require('fs');
const config = require("../../config.json")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { deleteFile, fileSizeInBytes } = require("../handlers/FileHandler.js")





export async function downloadAudio(dbFilepath, url) {

    const LOG_ID = '478382'
    const success = await download(dbFilepath, url)
    if (!success) {
        log("warning", LOG_ID, scriptName, getThisFunctionName(), 'Could not download audio', "", Array.from(arguments))
        return
    }
    return success
}





async function download(dbFilepath, url) {

    const LOGID = "454535"

    const audioExists = await checkIfAudioFileExists(dbFilepath, url);
    if (audioExists) {
        log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', "", Array.from(arguments))
        return 1
    }   

    const metadata = await requestTracks(url);
    if (!metadata) {
        log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', "", Array.from(arguments))
        return null
    }
  
    const downloadSuccess = await downloadFile(url, metadata.localPath);
    if (!downloadSuccess) {
        log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', "", Array.from(arguments))
        return null
    }

    const metadataUploaded = await uploadMetadata(dbFilepath, metadata.trackId, metadata.url, metadata.duration, metadata.localPath, metadata.title)
    if (!metadataUploaded) {
        log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', "", Array.from(arguments))
        return null
    }

    return true
}





async function checkIfAudioFileExists(dbFilepath, url) {

    const LOGID = '273482'

    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)

    const query = `SELECT * FROM tracks WHERE url = ?`
    const values = [url]
    const result = await database.download(query, values)
    await database.disconnect()

    if (result.length === 0) {
        log("debug", LOGID, scriptName, getThisFunctionName(), 'Audio does not exist', "", Array.from(arguments))
        return
    } else {
        log("debug", LOGID, scriptName, getThisFunctionName(), 'Audio exists', "", Array.from(arguments))
        return true

    }
}





async function requestTracks(url) {

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
        log("debug", LOGID, scriptName, getThisFunctionName(), message, "", Array.from(arguments))
        log("info", LOGID, scriptName, getThisFunctionName(), "Metadata retrieved", "", Array.from(arguments))

        return metadata

    }
    catch (error) {
        
        log("error", LOGID, scriptName, getThisFunctionName(), error.message, "", Array.from(arguments))
        return

    }
}





async function downloadFile(url, localPath) {

    const LOGID = '038238'


    try {

        const video = ytdl(url,{ filter: 'audioonly', format: 'mp3' })
        const output_stream = fs.createWriteStream(localPath)
    
        await new Promise((resolve, reject) => {
            output_stream.on('finish', resolve)
            output_stream.on('error', reject)
            video.pipe(output_stream)
        });
        log("debug", LOGID, scriptName, getThisFunctionName(), 'Audio downloaded successfully', "", Array.from(arguments))
        return true

    }

    catch (error) {

        log("error", LOGID, scriptName, getThisFunctionName(), error.message, "", Array.from(arguments))
        log("info", LOGID, scriptName, getThisFunctionName(), `Unable to download file from url --> ${url}`, "", Array.from(arguments))
    }
  
}





async function uploadMetadata(dbFilepath, trackId, url, duration, localPath, title) {

    const LOGID = '738473'

    const fileSizeB = fileSizeInBytes(localPath)

    log("debug", LOGID, scriptName, getThisFunctionName(), `{"file size in bytes": ${fileSizeB}}`, "", Array.from(arguments))

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

        log("error", LOGID, scriptName, getThisFunctionName(), error.message, "", Array.from(arguments))
        log("info", LOGID, scriptName, getThisFunctionName(), 'Failed to upload metadata. Deleting audio file...', "", Array.from(arguments))

        await deleteFile(localPath) 
        await database.disconnect()
        return
    }

    await database.disconnect()
    return true
}