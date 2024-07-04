const fs = require('fs')
const dataurl = require('dataurl')



async function fetchTrackSource(filePath) {
    console.log("filepath", filePath);
    try {
        const data = await new Promise((resolve, reject) => {
            fs.readFile(filePath, (error, data) => {
                if (error) {
                    return reject(error);
                }
                resolve(data);
            });
        });
        const result = dataurl.convert({ data, mimetype: 'audio/mp3' });
        return result;
    } catch (error) {
        console.log(error.message);
        throw error; // Rethrow the error if you want to handle it outside the function
    }
}


module.exports = { fetchTrackSource }