import { Tracklist } from "./Tracklist.js"



export class DownloadBar {



    constructor (channels, dataController) {
        this.channels = channels
        this.dataController = dataController
        this.tracklist = new Tracklist(dataController)
    }



    create() {
        const container = this.addContainer()
        container.appendChild(this.addInputBox())
        container.appendChild(this.addDownloadButton())
        container.appendChild(this.addDownloadMessage())
        return container
    }



    addContainer() {
        const container = document.createElement("div")
        container.id = "download-container"
        container.classList.add("download-container-display")
        return container
    }



    addInputBox() {
        const input = document.createElement("input")
        input.id = "download-bar-input"
        input.classList.add("input-bar")
        input.placeholder = "Enter a valid Youtube URL."
        return input
    }
        


    addDownloadButton() {        
        const button = createButton("download-bar-button", [], {}, "./images/download-2-32.png", 24, 24)
        button.addEventListener("click", async () => {
            const input = document.getElementById("download-bar-input")
            const downloadUrl = input.value
            const downloadMessageElement = document.getElementById("download-bar-message")
            console.log("download-bar-message", downloadMessageElement)
            downloadMessageElement.textContent = "Downloading Track"
            const downloadMessage = await this.channels.downloadTrackChannel.send({url: downloadUrl})
            downloadMessageElement.textContent = downloadMessage
            await this.dataController.updateTrackDataNoFilter()
            this.tracklist.reloadTracklist()
        })
        return button
        }
       
        

    addDownloadMessage() {
        const element = document.createElement("div")
        element.id = "download-bar-message"
        element.classList.add("message")
        element.textContent = "Test"
        return element
    }
   


}

