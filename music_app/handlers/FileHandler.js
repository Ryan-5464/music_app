const { Logger } = require("./Logger.js")
const { get_function_name } = require("../helpers/get_function_name.js")
const path = require('path');
const script_name = path.basename(__filename);
const fs = require('fs');
const fsp = require('fs').promises;


const logger = new Logger()


class FileHandler {

    async delete(file_path) {

        const LOG_ID = '123132'

        try {
            await fsp.unlink(file_path)
            
            logger.log("debug", LOG_ID, script_name, get_function_name(), 'File deleted successfully', this.name, Array.from(arguments))
        }

        catch(error) {
            logger.log("error", LOG_ID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
        }

    }

    file_size_in_bytes(local_file_path) {

        const LOG_ID = '746374'

        const file_size_b = fs.statSync(local_file_path);

        logger.log("debug", LOG_ID, script_name, get_function_name(), '', this.name, Array.from(arguments))

        return file_size_b
   
    }

}


module.exports = { FileHandler };