const { log } = require("./Logger.js")
const { getThisFunctionName } = require("../helpers/helpers.js")
const path = require('path');
const scriptName = path.basename(__filename);
const fs = require('fs');
const fsp = require('fs').promises;





export async function deleteFile(filePath) {
    const LOG_ID = '123132'
    try {
        await fsp.unlink(filePath)
        log("debug", LOG_ID, scriptName, getThisFunctionName(), 'File deleted successfully', "", Array.from(arguments))
    }
    catch(error) {
        log("error", LOG_ID, scriptName, getThisFunctionName(), error.message, "", Array.from(arguments))
    }
}





export function fileSizeInBytes(localFilePath) {
    const LOG_ID = '746374'
    const fileSizeB = fs.statSync(localFilePath);
    log("debug", LOG_ID, scriptName, getThisFunctionName(), '', "", Array.from(arguments))
    return fileSizeB
}