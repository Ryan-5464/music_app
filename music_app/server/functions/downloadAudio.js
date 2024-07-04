
const { AudioDownloader } = require("../handlers/AudioDownloader.js")
const { Logger } = require("../handlers/Logger.js")
const path = require('path');
const scriptName = path.basename(__filename);
const { getThisFunctionName } = require("../helpers/getThisFunctionName.js")



async function downloadAudio(dbFilepath, url) {
    const logger = new Logger()
    const LOG_ID = '478382'
    const success = await AudioDownloader.downloadAudio(dbFilepath, url)
    if (!success) {
        logger.log("warning", LOG_ID, scriptName, getThisFunctionName(), 'Could not download audio', "", Array.from(arguments))
        return
    }
    return success
}


module.exports = { downloadAudio }