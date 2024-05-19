const { DatabaseInitializer } = require("../handlers/DatabaseInitializer.js")
const DB_FILEPATH = "./test_database/test_database.sqlite"



async function test_initialize_database(db_filepath) {
    console.log("test started")
    const database_initializer = new DatabaseInitializer()
    await database_initializer.initialize_database(db_filepath)
    console.log("test finished")
}

test_initialize_database(DB_FILEPATH)


