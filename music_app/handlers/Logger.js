const { ACTIVE_LOGS, LOG_LEVEL }  = require("../config.js")



// Usage = logger.log(LOG_ID, script_name, get_function_name(), 'Connected to database', this.name, Array.from(arguments))


class Logger {

    log(level, log_id, filename, func, message, cls=null, args=null) {
    
        if (!ACTIVE_LOGS.includes("ALL") && !ACTIVE_LOGS.includes(log_id)) {
            return
        }
    
        if (LOG_LEVEL === 0 && level === "debug") {
            const log_message = this.prepare_log("DEBUG", log_id, filename, func, message, cls, args)
            console.debug(log_message)
            return
        }

        if (LOG_LEVEL < 2 && level === "info") {
            const log_message = this.prepare_log("INFO", log_id, filename, func, message, cls, args)
            console.info(log_message)
            return
        }

        if (LOG_LEVEL < 3 && level === "warning") {
            const log_message = this.prepare_log("WARNING", log_id, filename, func, message, cls, args)
            console.warn(log_message)
            return
        }
        
        if (LOG_LEVEL < 4 && level === "error") {
            const log_message = this.prepare_log("ERROR", log_id, filename, func, message, cls, args)
            console.error(log_message)
            return
        }
        
    }

    prepare_log(log_level, log_id, filename, func, message, cls, args) {
        let log_message = `\n\nLEVEL=${log_level};\nTIME=${this.current_time()};\n`
        log_message = log_message + `LOGID=${log_id}; \n`
        log_message = log_message + `MSG=${message}; \n`
        log_message = log_message + `SCRIPT=${filename}; \n`
        
        if (cls !== null) {
            log_message = log_message + `CLS=${cls}; \n`
        }
        
        log_message = log_message + `FUNC=${func}; \n`
        
                if (args !== null) {
                    log_message = log_message + `ARGS=${args}; \n\n`
                }
        

        return log_message
    }

    current_time() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

}



module.exports = { Logger }