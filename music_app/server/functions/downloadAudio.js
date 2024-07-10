const { log } = require("../handlers/Logger.js")
const { getThisFunctionName } = require("../helpers/helpers.js")
const path = require('path');
const scriptName = path.basename(__filename);
var ytdl = require('ytdl-core');
const fs = require('fs');
const config = require("../../config.json")
const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler.js")
const { deleteFile, fileSizeInBytes } = require("../handlers/FileHandler.js")
const { Readable } = require('stream');
const { finished } = require('stream/promises');





async function downloadAudio(dbFilepath, url) {

    const LOG_ID = '478382'
    const success = await download(dbFilepath, url)
    if (!success) {
        log("warning", LOG_ID, scriptName, getThisFunctionName(), 'Could not download audio', "", Array.from(arguments))
        return
    }
    return success
}





module.exports = { downloadAudio }





async function download(dbFilepath, url) {

    const LOGID = "454535"

    const audioExists = await checkIfAudioFileExists(dbFilepath, url);
    if (audioExists) {
        log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', "", Array.from(arguments))
        return 1
    }   

    let response = await requestInfo(url);
    const metadata = response.metadata
    if (!metadata) {
        log("error", LOGID, scriptName, getThisFunctionName(), 'Failed to download track', "", Array.from(arguments))
        return null
    }
  
    downloadSuccess = await downloadFile(response.info, metadata.localPath);
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





async function requestInfo(url) {

    const LOGID = '192892'

    try {
        const trackId  = getYouTubeVideoId(url)
        if (!trackId) {
            return
        }
        const info = await getInfo(trackId)
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
        const arr = {metadata, info}
        console.log(arr)
        return arr

    }
    catch (error) {
        
        log("error", LOGID, scriptName, getThisFunctionName(), error.message, "", Array.from(arguments))
        return

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





async function getInfo(videoId) {
    const apiKey = 'AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc'
    const headers = {
      'X-YouTube-Client-Name': '5',
      'X-YouTube-Client-Version': '19.09.3',
      Origin: 'https://www.youtube.com',
      'User-Agent': 'com.google.ios.youtube/19.09.3 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)',
      'content-type': 'application/json'
    }
  
    const b = {
      context: {
        client: {
          clientName: 'IOS',
          clientVersion: '19.09.3',
          deviceModel: 'iPhone14,3',
          userAgent: 'com.google.ios.youtube/19.09.3 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)',
          hl: 'en',
          timeZone: 'UTC',
          utcOffsetMinutes: 0
        }
      },
      videoId,
      playbackContext: { contentPlaybackContext: { html5Preference: 'HTML5_PREF_WANTS' } },
      contentCheckOk: true,
      racyCheckOk: true
    }
  
    const res = await fetch(`https://www.youtube.com/youtubei/v1/player?key${apiKey}&prettyPrint=false`, { method: 'POST', body: JSON.stringify(b), headers });
    // throw an error when failed to get info
    if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const json = await res.json();
    return json;
  }
  




  async function downloadFile(info, localPath) {

    if(info.playabilityStatus.status !== 'OK') throw new Error(info.playabilityStatus.reason);
  
    const formats = info.streamingData.adaptiveFormats;
    console.log(formats)
    let selectedFormat = formats[6];
    const ext = selectedFormat.mimeType.match(/^\w+\/(\w+)/)[1];
    console.log(`Downloading ${localPath}`);
    const writer = fs.createWriteStream(localPath);
    const res = await fetch(selectedFormat.url);

    if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const HIGH_WATER_MARK = 256 * 1024; // 256 KB
    const readable = Readable.fromWeb(res.body, { highWaterMark: HIGH_WATER_MARK });

    // Handle stream events to diagnose and optimize
    let i = 0; 
    readable.on('data', (chunk) => {
        console.log(`${i} - Received ${chunk.length} bytes of data. [${new Date().toISOString()}]`);
        i += 1
    });
  
    readable.on('end', () => {
      console.log('Stream ended.');
    });
  
    readable.on('error', (err) => {
      console.error('Error in readable stream:', err);
    });
  
    writer.on('finish', () => {
      console.log('All data has been written.');
    });
  
    writer.on('error', (err) => {
      console.error('Error in writable stream:', err);
    });

    try {
        console.log(res.body)
        await finished(readable.pipe(writer));
        console.log(`Downloaded ${localPath}`);
        return true
    } catch(err) {
        return false
    }
  }





  function getYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }