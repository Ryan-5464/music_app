const { exec } = require('child_process');

const filePath = '/mnt/c/Users/YourUsername/Music/your_audio_file.mp3';



class AudioPlayer {

    playAudioFile(audioFilePath) {
        exec(`mpv ${audioFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`)
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


module.exports = { AudioPlayer }