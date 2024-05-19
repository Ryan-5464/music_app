const { SqliteDatabaseHandler } = require("../handlers/SqliteDatabaseHandler")

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
    const database = new SqliteDatabaseHandler()
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

test_database()