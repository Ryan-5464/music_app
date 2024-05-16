const sqlite3 = require('sqlite3').verbose();


function connect_to_database(db_path) {
    
    function database(db_path) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(db_path, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(db)
                }
            })
        }) 
    }
    
    async function connect(db_path) {
        try {
            const db = await database(db_path)
            console.log("connected to database.")
            return db
        } catch (error) {
            console.error(error.message)
            process.exit(1)
        }
    }
    
    connect(db_path)
    
}



function test_database_connection_success() {
    connect_to_database(":memory:")
    console.log("hi")
}



function test_database_connection_fail() {
    connect_to_database("invalidpath/:memory:")
    console.log("hi")
}



test_database_connection_fail()
test_database_connection_success()
