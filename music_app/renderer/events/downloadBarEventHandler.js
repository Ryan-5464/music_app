class DownloadBarEventHandler {

    constructor () {
        this.channel = new Channel("download-track--send", "download-track--receive")
        this.handleDownload = this.handleDownload.bind(this)
    }

    addDownloadButtonEventListener() {
        const button = document.getElementById("download-bar-button")
        console.log("button1", button)
        button.removeEventListener("click", this.handleDownload)
        button.addEventListener("click", this.handleDownload)
    }

    async handleDownload() {
        const input = document.getElementById("download-bar-input")
        const downloadUrl = input.value
        console.log("downloadUrl", downloadUrl)
        const downloadMessage = await this.channel.send({url: downloadUrl})
        const downloadMessageElement = document.getElementById("download-message")
        downloadMessageElement.textContent = downloadMessage
    }

}