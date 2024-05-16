function fileHandler(operation, filePath) {

    if (operation === "delete") {
        deleteFile(filePath);
    }
}



async function deleteFile(filePath) {
    try {
        await fsp.unlink(filePath);
        console.log('File deleted successfully');
    }
    catch (error) {
        console.error(error.message);
    }
}


module.exports = { fileHandler };