const config = require("../config.json")



class Logger {

    log(

        level, 
        logId, 
        scriptName, 
        funcName, 
        logMessage, 
        className=null, 
        args=null

    ) {
    
        if (!config.ACTIVE_LOGS.includes("ALL") && !config.ACTIVE_LOGS.includes(logId)) {
            return
        }

        let message

        if (config.LOG_LEVEL === 0 && level === "debug") {
            message = this.prepareLog("DEBUG", logId, scriptName, funcName, logMessage, className, args)
            console.debug(message)
            return
        }

        if (config.LOG_LEVEL < 2 && level === "info") {
            message = this.prepareLog("INFO", logId, scriptName, funcName, logMessage, className, args)
            console.info(message)
            return
        }

        if (config.LOG_LEVEL < 3 && level === "warning") {
            message = this.prepareLog("WARNING", logId, scriptName, funcName, logMessage, className, args)
            console.warn(message)
            return
        }
        
        if (config.LOG_LEVEL < 4 && level === "error") {
            message = this.prepareLog("ERROR", logId, scriptName, funcName, logMessage, className, args)
            console.error(message)
            return
        }
    }

    prepareLog(

        level, 
        logId, 
        scriptName, 
        funcName, 
        logMessage, 
        className, 
        args

     ) {

        let message = `\n\nLEVEL=${level};\nTIME=${this.currentTime()};\n`
        message = message + `LOGID=${logId}; \n`
        message = message + `MSG=${logMessage}; \n`
        message = message + `SCRIPT=${scriptName}; \n`
        
        if (className !== null) {
            message = message + `CLS=${className}; \n`
        }
        
        message = message + `FUNC=${funcName}; \n`
        
        if (args !== null) {
            message = message + `ARGS=${args}; \n\n`
        }
        
        return message
    }

    currentTime() {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

}



module.exports = { Logger }