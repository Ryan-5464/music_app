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
    
        async function connect_to_db (db_path) {

            const LOG_ID = '493049'

            if(DEBUG) {
                logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > connect > connect_to_db)'})
                logger.debug(LOG_ID, {'args': `{db_path: ${db_path}}`})
            }

 
            return new Promise( (resolve, reject) => {

                const db = new sqlite3.Database(db_path, (error) => {
    
                    if (error) {
                        logger.error(LOG_ID, {'message': error.message})
                        resolve(null)
                    }
    
                    logger.info(LOG_ID, {'message': 'Connected to database'})
                    resolve(db)
    
                })

            })

        }

        this.db = await connect_to_db(db_path)

    }



    async disconnect() {

        const close_db = async () => {

            const LOG_ID = '663634'
            if (DEBUG) {
                logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > disconnect > close_db)'})
            }

            return new Promise( (resolve, reject) => {

                this.db.close((error) => {
    
                    if (error) {
                        logger.error(LOG_ID, {'message': `${error.message}`})
                        resolve(false)
                    } 
    
                    else {
                        logger.info(LOG_ID, {'message': 'Database closed successfully'})
                        resolve(true)
                    }
    
                })

            })

        }

        return await close_db()

    }



    async execute(query) {

        const execute_query = async (query) => {

            const LOG_ID = '019292'
            if (DEBUG) {
                logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > execute > execute_query)'})
                logger.debug(LOG_ID, {'query': `${query}`})
            }

            return new Promise( (resolve, reject) => {

                this.db.run(query, (error) => {

                    if (error) {
                        logger.error(LOG_ID, {'message': `${error.message}`})
                        resolve(false)
                    }

                    else {
                        logger.info(LOG_ID, {'message': 'Query executed successfully'})
                        resolve(true)
                    }

                })

            })

        }

        return await execute_query(query)

    }



    async upload(query, values) {

        const upload_data = async (query, values) => {

            const LOG_ID = '624564'
            if (DEBUG) {
                logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > upload > upload_data)'})
                logger.debug(LOG_ID, {'query': `${query}`, 'values': `${values}`})
            }

            const statement = await this.db.prepare(query)

            return new Promise((resolve, reject) => {
                statement.run(values, (error) => {

                    if (error) {
                        logger.error(LOG_ID, {'message': `${error.message}`})
                        statement.finalize()
                        resolve(false)
                    } 

                    else {
                        logger.info(LOG_ID, {'message': 'Data uploaded to database succesfully'})
                        statement.finalize()
                        resolve(true)
                    }

                })
            })

        }

        return await upload_data(query, values)
    }
    


    async download(query, optional_values=null) {

        const execute_query = async (query, optional_values) => {

            const LOG_ID = '928482'
            if (DEBUG) {
                logger.debug(LOG_ID, {'origin': '(SqliteDatabaseHandler > download > execute_query)'})
                logger.debug(LOG_ID, {'query': `${query}`, 'optional_values': `${optional_values}`})
            }

            if (optional_values !== null) {

                return new Promise((resolve, reject) => {

                    this.db.all(query, optional_values, (error, data) => {

                        if (error) {
                            logger.error(LOG_ID, {'message': 'Could not retreieve data from database'})
                            resolve(null)
                        } 

                        else {
                            logger.info(LOG_ID, {'message': 'Data succesfully retreived'})
                            resolve(data)
                        }

                    })

                })

            } 
            
            else {

                return new Promise((resolve, reject) => {

                    this.db.all(query, (error, data) => {

                        if (error) {
                            logger.error(LOG_ID, {'message': 'Could not retreieve data from database'})
                            reject(null)
                        } 

                        else {
                            logger.info(LOG_ID, {'message': 'Data succesfully retreived'})
                            resolve(data)
                        }

                    })

                })

            }
        }

        return await execute_query(query, optional_values)
    
    }

}




module.exports = { SqliteDatabaseHandler }