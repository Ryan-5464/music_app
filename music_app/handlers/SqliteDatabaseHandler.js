// if debug
const { LOG_LEVEL } = require('../config');
const { Logger } = require("./Logger.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")


let sqlite3

if (LOG_LEVEL === 0) {
    sqlite3 = require('sqlite3').verbose()
} else {
    sqlite3 = require('sqlite3')
}


let logger = new Logger()



class SqliteDatabaseHandler {



    constructor () {
        this.db = null
    }

    async connect(db_path) {

        const LOG_ID = '493049'

        try {

            this.db = await new Promise( (resolve, reject) => {
                const db = new sqlite3.Database(db_path, (error) => {
                    if (error) { 
                        reject(error) 
                    }
                    else { 
                        resolve(db) 
                    }
                }) 

            })
            logger.log("info", LOG_ID, script_name, get_function_name(), 'Connected to database', this.name, Array.from(arguments))

        }
        
        catch (error) {
            logger.log("error", LOG_ID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
        }

    }



    async disconnect() {
        
        const LOG_ID = '663634'
        
        if (!this.db) {
            logger.log("warning", LOG_ID, script_name, get_function_name(), 'No database to close', this.name, Array.from(arguments))
            return
        }

        try {

            await new Promise( (resolve, reject) => {
                this.db.close((error) => {
                    if (error) {
                        reject(error)
                    } 
                    else {
                        resolve()
                    }
                })
            })
            this.db = null
            logger.log("info", LOG_ID, script_name, get_function_name(), 'Database closed successfully', this.name, Array.from(arguments))

        }

        catch (error) {
            logger.log("error", LOG_ID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
        }

    }



    async execute(query) {

        const LOG_ID = '019292'

        if (!this.db) {
            logger.log("error", LOG_ID, script_name, get_function_name(), 'Unable to execute query, not connected to database', this.name, Array.from(arguments))
            return
        }

        try {

            await new Promise( (resolve, reject) => {
                this.db.run(query, (error) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve()
                    }
                })
            })
            logger.log("info", LOG_ID, script_name, get_function_name(), 'Query executed successfully', this.name, Array.from(arguments))

        }

        catch (error) {
            logger.log("error", LOG_ID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
        }

    }



    async upload(query, values) {

        const LOG_ID = '624564'

        if (!this.db) {
            logger.log("error", LOG_ID, script_name, get_function_name(), 'Unable to upload, not connected to database', this.name, Array.from(arguments))
            return
        }

        try {
            
            const statement = await this.db.prepare(query)

            await new Promise((resolve, reject) => {
                statement.run(values, (error) => {
                    if (error) {
                        statement.finalize()
                        reject(error)
                    } 
                    else {
                        statement.finalize()
                        resolve()
                    }
                })
            })
            logger.log("info", LOG_ID, script_name, get_function_name(), 'Data uploaded to database succesfully', this.name, Array.from(arguments))
            return true
        }
    
        catch (error) {
            logger.log("error", LOG_ID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
        }
        
    }
    


    async download(query, optional_values=null) {
        
        const LOG_ID = '928482'

        if (!this.db) {
            logger.log("error", LOG_ID, script_name, get_function_name(), 'Unable to upload, not connected to database', this.name, Array.from(arguments))
            return
        }

        if (optional_values !== null) {
            
            try {
    
                const data = await new Promise((resolve, reject) => {
                    this.db.all(query, optional_values, (error, data) => {
                        if (error) {
                            resolve(error)
                        } 
                        else {
                            resolve(data)
                        }
                    })
                })
                logger.log("info", LOG_ID, script_name, get_function_name(), 'Data succesfully retrieved', this.name, Array.from(arguments))
                return data

            }
            
            catch (error) {
                logger.log("error", LOG_ID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
            }

        }
        
        else {

            try {

                const data = await new Promise((resolve, reject) => {
                    this.db.all(query, (error, data) => {
                        if (error) {
                            reject(error)
                        } 
                        else {
                            resolve(data)
                        }
                    })
                })
                logger.log("info", LOG_ID, script_name, get_function_name(), 'Data succesfully retrieved', this.name, Array.from(arguments))
                return data
            
            }

            catch (error) {
                logger.log("error", LOG_ID, script_name, get_function_name(), error.message, this.name, Array.from(arguments))
            }
            
        }

    }

}




module.exports = { SqliteDatabaseHandler }