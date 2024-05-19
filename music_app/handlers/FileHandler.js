const { DEBUG } = require("../config.js")
const { Logger } = require("./Logger.js")
const fs = require('fs');
const fsp = require('fs').promises;


const logger = new Logger()


class FileHandler {

    async delete(file_path) {

        const LOG_ID = '123132'

        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(FileHandler > delete)'})
            logger.debug(LOG_ID, {'args': `{'file_path': ${file_path}}`})
        }

        try {
            await fsp.unlink(file_path)
            
            if (DEBUG) {
                logger.debug(LOG_ID, {'message': 'File deleted successfully'})
            }
        }

        catch(error) {
            logger.debug(LOG_ID, {'error message': error.message})
        }

    }

    file_size_in_bytes(local_file_path) {

        const LOG_ID = '746374'

        if(DEBUG) {
            logger.debug(LOG_ID, {'origin': '(FileHandler > file_size_in_bytes)'})
            logger.debug(LOG_ID, {'args': `{'local_file_path': ${local_file_path}}`})
        }

        const file_size_b = fs.statSync(local_file_path);

        if (DEBUG) {
            logger.debug(LOG_ID, {'file size (bytes)': file_size_b})
        }

        return file_size_b
   
    }

}


module.exports = { FileHandler };