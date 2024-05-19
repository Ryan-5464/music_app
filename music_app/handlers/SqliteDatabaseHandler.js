// if debug
const { DEBUG } = require('../config');
const { Logger } = require("./Logger.js")



let sqlite3

if (DEBUG) {
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
        if(DEBUG) {
            logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > connect)'})
            logger.debug(LOG_ID, {'args': `{db_path: ${db_path}}`})
        }

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
            logger.info(LOG_ID, {'message': 'Connected to database'})

        }
        
        catch (error) {
            logger.error(LOG_ID, {'message': error.message})
        }

    }



    async disconnect() {
        
        const LOG_ID = '663634'
        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > disconnect)'})
        }
        
        if (!this.db) {
            logger.warning(LOG_ID, {'message': 'No database to close'})
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
            logger.info(LOG_ID, {'message': 'Database closed successfully'})

        }

        catch (error) {
            logger.error(LOG_ID, {'message': `${error.message}`})
        }

    }



    async execute(query) {

        const LOG_ID = '019292'
        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > execute)'})
            logger.debug(LOG_ID, {'query': `${query}`})
        }

        if (!this.db) {
            logger.error(LOG_ID, {'message': 'Unable to execute query, not connected to database'})
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
            logger.info(LOG_ID, {'message': 'Query executed successfully'})

        }

        catch (error) {
            logger.error(LOG_ID, {'message': `${error.message}`})
        }

    }



    async upload(query, values) {

        const LOG_ID = '624564'
        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > upload)'})
            logger.debug(LOG_ID, {'query': `${query}`, 'values': `${values}`})
        }
        
        if (!this.db) {
            logger.error(LOG_ID, {'message': 'Unable to upload, not connected to database'})
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

            logger.info(LOG_ID, {'message': 'Data uploaded to database succesfully'})
            return true
        }
    
        catch (error) {
            logger.error(LOG_ID, {'message': `${error.message}`})
        }
        
    }
    


    async download(query, optional_values=null) {
        
        const LOG_ID = '928482'
        if (DEBUG) {
            logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > download)'})
            logger.debug(LOG_ID, {'query': `${query}`, 'optional_values': `${optional_values}`})
        }

        if (!this.db) {
            logger.error(LOG_ID, {'message': 'Unable to upload, not connected to database'})
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
                logger.info(LOG_ID, {'message': 'Data succesfully retreived'})
                return data

            }
            
            catch (error) {
                logger.error(LOG_ID, {'message': 'Could not retreieve data from database'})
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
                logger.info(LOG_ID, {'message': 'Data succesfully retreived'})
                return data
            
            }

            catch (error) {
                logger.error(LOG_ID, {'message': 'Could not retreieve data from database'})
            }
            
        }

    }

}




module.exports = { SqliteDatabaseHandler }