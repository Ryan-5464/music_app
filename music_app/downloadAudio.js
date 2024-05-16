const fs = require('fs');
const fsp = require('fs').promises;
var ytdl = require('ytdl-core');
const sqlite3 = require('sqlite3').verbose();
const { DB_FILEPATH, DB_TABLE_AUDIOFILES, AUDIO_FILENAME } = require('./config.js');
const { fileHandler } = require('./handlers/fileHandler.js');



async function downloadAudio(url) {

    const audioExists = await checkIfAudioExists(url);
    if (audioExists) {
        return null;
    }   

    const metadata = await getMetaData(url);
    if (metadata === null) {
        return null;
    }
  
    const downloadSuccess = await downloadFile(url, metadata.localFilePath);
    if (downloadSuccess === null) {
        return null;
    };

    const metadataUploaded = await uploadMetadata(metadata.audioFileId, metadata.youtubeLink, metadata.durationSec, metadata.localFilePath, metadata.alias)
    if (metadataUploaded === false) {
        return null;
    };

    return true;

}; 



async function checkIfAudioExists(url) {

    try {
        const videoId = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)([^"&?/ ]{11})/)[1];
        const audioFilePath = AUDIO_FILENAME.replace("[]", videoId);
        await fsp.access(audioFilePath, fs.constants.F_OK);
        console.debug("DEBUG : Audio file already exists.");
        return true;
    } 
    catch (error) {
        console.debug('DEBUG : File does not exist.');
        return false;
    }

}



async function getMetaData(url) {

    try {
        const info = await ytdl.getInfo(url);
        console.log(info);
        console.log(info.videoDetails.title);
        const metadata = {
            "audioFileId": info.videoDetails.videoId,
            "youtubeLink": info.videoDetails.video_url,
            "durationSec": info.videoDetails.lengthSeconds,
            "localFilePath": AUDIO_FILENAME.replace("[]", info.videoDetails.videoId),
            "alias": info.videoDetails.title 
        };
        console.debug("DEBUG : Metadata retrieved.");
        return metadata;
    }

    catch (error) {
        console.error(error.message, error.stack);
        console.error("ERROR : Audio not found.");
        return null;
    }

};



async function downloadFile(url, localFilePath) {

    try {
        const video = ytdl(url,{ filter: 'audioonly', format: 'mp3' });
        const outputStream = fs.createWriteStream(localFilePath);
    
        await new Promise((resolve, reject) => {
            outputStream.on('finish', resolve);
            outputStream.on('error', reject);
            video.pipe(outputStream);
        });

        console.log("LOG : Audio downloaded successfully.")
        return true;
    }

    catch (error) {
        console.error(error.message, error.stack);
        console.log("ERROR : Unable to download audio file from url --> ", url);
        return null;
    }
  
};



async function uploadMetadata(audioFileId, youtubeLink, durationSec, localFilePath, alias) {

    try {
        const stats = fs.statSync(localFilePath);
        const fileSizeB = stats.size
        const db = new sqlite3.Database(DB_FILEPATH);
        console.log("alias", alias);
        db.serialize(() => {
            const stmt = db.prepare('INSERT INTO ' + DB_TABLE_AUDIOFILES + ' (audioFileId, youtubeLink, durationSec, localFilePath, fileSizeB, alias) VALUES (?, ?, ?, ?, ?, ?)');
            stmt.run(audioFileId, youtubeLink, durationSec, localFilePath, fileSizeB, alias, (error) => {
                if (error) {
                    console.error(error.message, error.stack);
                } 
                console.debug('DEBUG : Data inserted successfully.');
            });
            stmt.finalize();
        });
        
        db.close((error) => {
            if (error) {
                console.error(error.message, error.stack);
            } 
            console.debug('DEBUG : Database connection closed successfully.');
        });
        return true;
    } 
    
    catch (error) {
        console.error(error.message, error.stack);
        console.error("ERROR : Failed to upload metadata. Deleting audio file...");
        fileHandler("delete", localFilePath); 
        return null;
    }
};






module.exports = { downloadAudio };
