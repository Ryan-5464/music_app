// if debug
const sqlite3 = require('sqlite3').verbose();


class SQLiteDatabase {

    constructor () {
        this.db = null
    }

    async connect(db_path) {
    
        function connect_to_database(db_path) {
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

    // disconnect() {
    //     this.db.close((error) => {
    //         if (error) {
    //             console.error(error.message)
    //         } else {
    //             console.log("Database closed successfully.")
    //         }
    //     })
    // }

    execute(query) {

        async function execute_query(query) {
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

        execute_query(query)

    }

    upload(query, values) {

        async function upload_data(query, values) {
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
            
            } catch (error) {
                console.error(error.message)
            }
        }

        upload_data(query, values)
    }
    

    download(query) {

        async function execute_query(query) {
            try {

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

            } catch (error) {
                console.error(error.message)
            }
        }

        return execute_query(query)
        
    }

}



async function test_database_connection_success() {
    const database = new SQLiteDatabase()
    await database.connect(":memory:")
    console.log("db1", database.db)
    console.log("test success")
}



function test_database_connection_fail() {
    const database = new SQLiteDatabase()
    database.connect("invalidpath/:memory:")
    console.log(database.db)
    console.log("test fail")
}



test_database_connection_success()
// test_database_connection_fail()



// const columns = Object.keys(data).join(', ');
// const placeholders = Object.keys(data).map(() => '?').join(', ');
// const values = Object.values(data);

// const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
// const stmt = await db.prepare(query);