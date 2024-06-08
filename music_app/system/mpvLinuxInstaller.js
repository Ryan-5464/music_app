const { exec } = require('child_process')
const path = require('node:path')
const { UserPermissions } = require("./setUserPermissions.js")
const config = require("../config.json") 


class MpvLinuxInstaller {

        constructor (dialog) {
            this.scriptPath = path.join(__dirname, 'mpvLinux.sh')
            this.dialog = dialog
            this.userPermissions = new UserPermissions()
        }

        async installMpv() {
            if (config.USER_PERMISSIONS === false) {
                await this.userPermitInstall()
            }
            config = require('../config.json')
            if (config.USER_PERMISSIONS === true) {
                this.executeInstallScript()
            }
            else {
                console.log("User needs to give permission to install mpv")
                process.exit()
            }
        }

        async userPermitInstall() {
            const userResponse = this.dialog.showMessageBoxSync({
                type: 'question',
                buttons: ['Cancel', 'OK'],
                title: 'Install mpv',
                message: 'The application needs to install mpv. This requires administrator privileges. Do you want to continue?',
            })
            if (userResponse === 1) {
                await this.userPermissions.setUserPermissions(true)
            }
        }

        executeInstallScript() {
            exec(`bash ${this.scriptPath}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing script: ${error.message}`);
                    return
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`)
                    return
                }
                console.log(`stdout: ${stdout}`)
            })
        }

}


module.exports = { MpvLinuxInstaller }