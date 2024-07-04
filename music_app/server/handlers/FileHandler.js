const { Logger } = require("./Logger.js")
const { getThisFunctionName } = require("../helpers/getThisFunctionName.js")
const path = require('path');
const scriptName = path.basename(__filename);
const fs = require('fs');
const fsp = require('fs').promises;


const logger = new Logger()


class FileHandler {

    static async delete(filePath) {
        const LOG_ID = '123132'
        try {
            await fsp.unlink(filePath)
            logger.log("debug", LOG_ID, scriptName, getThisFunctionName(), 'File deleted successfully', FileHandler.name, Array.from(arguments))
        }
        catch(error) {
            logger.log("error", LOG_ID, scriptName, getThisFunctionName(), error.message, FileHandler.name, Array.from(arguments))
        }
    }

    static fileSizeInBytes(localFilePath) {
        const LOG_ID = '746374'
        const fileSizeB = fs.statSync(localFilePath);
        logger.log("debug", LOG_ID, scriptName, getThisFunctionName(), '', FileHandler.name, Array.from(arguments))
        return fileSizeB
    }

}


module.exports = { FileHandler };