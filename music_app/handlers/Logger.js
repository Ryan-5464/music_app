class Logger {

    debug (log_id, key_value_pairs) {

        const key_value_string = this.format_key_value_pairs(key_value_pairs)
        console.debug(`LOGID = ${log_id}; LEVEL = Debug; ${key_value_string}`)

    }

    info (log_id, key_value_pairs) {

        const key_value_string = this.format_key_value_pairs(key_value_pairs)
        console.log(`LOGID = ${log_id}; LEVEL = Info; ${key_value_string}`)
      
    }

    warning (log_id, key_value_pairs) {

        const key_value_string = this.format_key_value_pairs(key_value_pairs)
        console.warning(`LOGID = ${log_id}; LEVEL = Warning; ${key_value_string}`)
      
    }

    error (log_id, key_value_pairs) {

        const key_value_string = this.format_key_value_pairs(key_value_pairs)
        console.error(`LOGID = ${log_id}; LEVEL = Error; ${key_value_string}`)
      
    }

    critical (log_id, key_value_pairs) {

        const key_value_string = this.format_key_value_pairs(key_value_pairs)
        console.critical(`LOGID = ${log_id}; LEVEL = Critical; ${key_value_string}`)
      
    }

    format_key_value_pairs (key_value) {

        let key_value_string = ''
        let key_string = ''

        for (const [key, value] of Object.entries(key_value)) {
            
            key_string = `${key}`.toUpperCase()
            key_value_string += ` ${key_string} = ${value};`;
        }

        return key_value_string
    }
}



module.exports = { Logger }