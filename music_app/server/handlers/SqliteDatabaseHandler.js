// if debug
const { LOG_LEVEL } = require('../../config.json');
const { log } = require("./Logger.js")
const path = require('path');
const scriptName = path.basename(__filename);
const { getThisFunctionName } = require("../helpers/helpers.js")


let sqlite3

if (LOG_LEVEL === 0) {
    sqlite3 = require('sqlite3').verbose()
} else {
    sqlite3 = require('sqlite3')
}





class SqliteDatabaseHandler {



    constructor () {
        this.db = null
    }

    async connect(dbFilepath) {

        const LOG_ID = '493049'

        try {

            this.db = await new Promise( (resolve, reject) => {
                const db = new sqlite3.Database(dbFilepath, (error) => {
                    if (error) { 
                        reject(error) 
                    }
                    else { 
                        resolve(db) 
                    }
                }) 

            })
            log("info", LOG_ID, scriptName, getThisFunctionName(), 'Connected to database', this.name, Array.from(arguments))

        }
        
        catch (error) {
            log("error", LOG_ID, scriptName, getThisFunctionName(), error.message, this.name, Array.from(arguments))
        }

    }



    async disconnect() {
        
        const LOG_ID = '663634'
        
        if (!this.db) {
            log("warning", LOG_ID, scriptName, getThisFunctionName(), 'No database to close', this.name, Array.from(arguments))
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
            log("info", LOG_ID, scriptName, getThisFunctionName(), 'Database closed successfully', this.name, Array.from(arguments))

        }

        catch (error) {
            log("error", LOG_ID, scriptName, getThisFunctionName(), error.message, this.name, Array.from(arguments))
        }

    }



    async execute(query) {

        const LOG_ID = '019292'

        if (!this.db) {
            log("error", LOG_ID, scriptName, getThisFunctionName(), 'Unable to execute query, not connected to database', this.name, Array.from(arguments))
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
            log("info", LOG_ID, scriptName, getThisFunctionName(), 'Query executed successfully', this.name, Array.from(arguments))

        }

        catch (error) {
            log("error", LOG_ID, scriptName, getThisFunctionName(), error.message, this.name, Array.from(arguments))
        }

    }



    async upload(query, values) {

        const LOG_ID = '624564'

        if (!this.db) {
            log("error", LOG_ID, scriptName, getThisFunctionName(), 'Unable to upload, not connected to database', this.name, Array.from(arguments))
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
            log("info", LOG_ID, scriptName, getThisFunctionName(), 'Data uploaded to database succesfully', this.name, Array.from(arguments))
            return true
        }
    
        catch (error) {
            log("error", LOG_ID, scriptName, getThisFunctionName(), error.message, this.name, Array.from(arguments))
        }
        
    }
    


    async download(query, optionalValues=null) {
        
        const LOG_ID = '928482'

        if (!this.db) {
            log("error", LOG_ID, scriptName, getThisFunctionName(), 'Unable to upload, not connected to database', this.name, Array.from(arguments))
            return
        }

        if (optionalValues !== null) {
            
            try {
    
                const data = await new Promise((resolve, reject) => {
                    this.db.all(query, optionalValues, (error, data) => {
                        if (error) {
                            resolve(error)
                        } 
                        else {
                            resolve(data)
                        }
                    })
                })
                log("info", LOG_ID, scriptName, getThisFunctionName(), 'Data succesfully retrieved', this.name, Array.from(arguments))
                return data

            }
            
            catch (error) {
                log("error", LOG_ID, scriptName, getThisFunctionName(), error.message, this.name, Array.from(arguments))
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
                log("info", LOG_ID, scriptName, getThisFunctionName(), 'Data succesfully retrieved', this.name, Array.from(arguments))
                return data
            
            }

            catch (error) {
                log("error", LOG_ID, scriptName, getThisFunctionName(), error.message, this.name, Array.from(arguments))
            }
            
        }

    }

}





module.exports = { SqliteDatabaseHandler }


