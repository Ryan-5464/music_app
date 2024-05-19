// if debug
const sqlite3 = require('sqlite3').verbose();


class SQLiteDatabaseHandler {

    constructor () {
        this.db = null
    }

    async connect(db_path) {
    
        const connect_to_database = (db_path) => {
            return new Promise((resolve, reject) => {
                const db = new sqlite3.Database(db_path, (error) => {
                    if (error) {
                        console.error(error.message)
                        reject(error)
                    } else {
                        console.log("connected to database.")
                        resolve(db)
                    }
                })
            }) 
        }
        
        this.db = await connect_to_database(db_path)
        
    }

    async disconnect() {

        const close_db = async () => {
            this.db.close((error) => {
                if (error) {
                    console.error(error.message)
                } else {
                    console.log("Database closed successfully.")
                }
            })
        }

        await close_db()
    }

    async execute(query) {

        const execute_query = async (query) => {
            try{

                await new Promise((resolve, reject) => {
                    this.db.run(query, (error) => {
                        if (error) {
                            reject(error)
                        }
                        resolve()
                    })
                })
                console.log("Query executed successfully.")

            } catch (error) {
                console.error(error.message)
            }
        }

        await execute_query(query)

    }

    async upload(query, values) {

        const upload_data = async (query, values) => {
            try {

                const statement = await this.db.prepare(query);
                await new Promise((resolve, reject) => {
                    statement.run(values, (error) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve()
                        }
                    })
                    statement.finalize()
                })
                console.debug('Data inserted successfully.')
                return true

            } catch (error) {
                console.error(error.message)
                return false
            }
        }

        await upload_data(query, values)
    }
    

    async download(query, optional_values=null) {

        const execute_query = async (query, optional_values) => {
            try {

                if (optional_values !== null) {
                    const data = await new Promise((resolve, reject) => {
                        this.db.all(query, optional_values, (error, data) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(data)
                            }
                        })
                    })
                    console.log("Data retreived successfully.")
                    return data

                } else {

                    const data = await new Promise((resolve, reject) => {
                        this.db.all(query, (error, data) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(data)
                            }
                        })
                    })
                    console.log("Data retreived successfully.")
                    return data  

                }

            } catch (error) {
                console.error(error.message)
            }
        }

        return await execute_query(query, optional_values)
    
    }

}



async function test_database_connection_success() {
    const database = new SQLiteDatabase()
    await database.connect(":memory:")
    console.log("db1", database.db)
    console.log("test success")
}



async function test_database_connection_fail() {
    const database = new SQLiteDatabase()
    await database.connect("invalidpath/:memory:")
    console.log("db2", database.db)
    console.log("test fail")
}


async function test_database() {
    let query = `
        CREATE TABLE IF NOT EXISTS audioFiles (
            id INTEGER PRIMARY KEY,
            audioFileId TEXT NOT NULL,
            youtubeLink TEXT NOT NULL,
            durationSec INTEGER NOT NULL,
            localFilePath TEXT NOT NULL,
            fileSizeB INTEGER NOT NULL,
            alias TEXT NOT NULL
        )
    `;
    const database = new SQLiteDatabaseHandler()
    console.log('1', database.db)
    await database.connect(":memory:")
    console.log('2', database.db)
    await database.execute(query)
    console.log('3', database.db)
    query = `INSERT INTO audioFiles (audioFileId, youtubeLink, durationSec, localFilePath, fileSizeB, alias) VALUES (?, ?, ?, ?, ?, ?)`
    values = ['abcd', 'www.', '3', 'filepath', '5', 'hello']
    database.upload(query, values)
    console.log('4', database.db)
    query = `SELECT * FROM audioFiles`
    let result = await database.download(query)
    console.log("result 1", result)
    query = `SELECT * FROM audioFiles WHERE youtubeLink LIKE ?`
    result = await database.download(query, ["www."])
    console.log("result 2", result)
    result = await database.download(query, [".www."])
    console.log("result 3", result)
    await database.disconnect()
    console.log("test finished")
}



// test_database_connection_success()
// test_database_connection_fail()

test_database()

// const columns = Object.keys(data).join(', ');
// const placeholders = Object.keys(data).map(() => '?').join(', ');
// const values = Object.values(data);

// const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
// const stmt = await db.prepare(query);