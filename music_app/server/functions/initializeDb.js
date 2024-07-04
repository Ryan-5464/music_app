const { DbInitializer } = require("../handlers/DbInitializer.js")



async function intializeDb(dbFilepath) {
    
    await DbInitializer.initializeDb(dbFilepath)
    
}


module.exports = { intializeDb }