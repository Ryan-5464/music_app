const config = require('../../config.json');





// Usage = logger.log(LOG_ID, scriptName, getThisFunctionName(), 'Connected to database', this.name, Array.from(arguments))





export function log(level, logId, filename, func, message, cls=null, args=null) {
    
    if (!config.ACTIVE_LOGS.includes("ALL") && !config.ACTIVE_LOGS.includes(logId)) {
        return
    }

    if (config.LOG_LEVEL === 0 && level === "debug") {
        const logMessage = prepare_log("DEBUG", logId, filename, func, message, cls, args)
        console.debug(logMessage)
        return
    }

    if (config.LOG_LEVEL < 2 && level === "info") {
        const logMessage = prepare_log("INFO", logId, filename, func, message, cls, args)
        console.info(logMessage)
        return
    }

    if (config.LOG_LEVEL < 3 && level === "warning") {
        const logMessage = prepare_log("WARNING", logId, filename, func, message, cls, args)
        console.warn(logMessage)
        return
    }
    
    if (config.LOG_LEVEL < 4 && level === "error") {
        const logMessage = prepare_log("ERROR", logId, filename, func, message, cls, args)
        console.error(logMessage)
        return
    }
}





function prepare_log(logLevel, logId, filename, func, message, cls, args) {

    let logMessage = `\n\nLEVEL=${logLevel};\nTIME=${currentTime()};\n`
    logMessage = logMessage + `LOGID=${logId}; \n`
    logMessage = logMessage + `MSG=${message}; \n`
    logMessage = logMessage + `SCRIPT=${filename}; \n`
    if (cls !== null) {
        logMessage = logMessage + `CLS=${cls}; \n`
    }
    logMessage = logMessage + `FUNC=${func}; \n`
    if (args !== null) {
        logMessage = logMessage + `ARGS=${args}; \n\n`
    }
    return logMessage
}





function currentTime() {

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}
