// Path to your config file
const fs = require('fs').promises;
const path = require('node:path')



class UserPermissions {

    constructor () {
        this.configFilePath = path.join(__dirname, '../config.json')
    }

    async setUserPermissions(permit) {
        const configJson = await this.readConfigFile()
        if (configJson) {
            configJson.USER_PERMISSIONS = permit 
        }
        await this.writeConfigFile(configJson)
    }

    async readConfigFile() {
        try {
            const configFileContent = await fs.readFile(this.configFilePath, 'utf8');
            return JSON.parse(configFileContent);
        } catch (error) {
            console.error('Error reading config file:', error);
            return null;
        }
    }

    async writeConfigFile(data) {
        try {
            await fs.writeFile(this.configFilePath, JSON.stringify(data, null, 4), 'utf8');
            console.log('Config file updated successfully.');
        } catch (error) {
            console.error('Error writing to config file:', error);
        }
    }
}



module.exports = { UserPermissions }