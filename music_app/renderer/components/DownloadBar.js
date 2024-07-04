import { Tracklist } from "./Track.js"
import { dataController } from "../../renderer.js"
import { channels } from "../../renderer.js"



export class DownloadBar {


    static create() {
        const container = DownloadBar._addContainer()
        container.appendChild(DownloadBar._addInputBox())
        container.appendChild(DownloadBar._addDownloadButton())
        container.appendChild(DownloadBar._addDownloadMessage())
        return container
    }



    static _addContainer() {
        const container = document.createElement("div")
        container.id = "download-container"
        container.classList.add("visible", "element-container")
        return container
    }



    static _addInputBox() {
        const input = document.createElement("input")
        input.id = "download-bar-input"
        input.classList.add("input-bar")
        input.placeholder = "Enter a valid Youtube URL."
        return input
    }
        


    static _addDownloadButton() {        
        const button = createButton("download-bar-button", [], {}, "./images/download-2-32.png", 24, 24)
        button.addEventListener("click", async () => {
            const input = document.getElementById("download-bar-input")
            const downloadUrl = input.value
            const downloadMessageElement = document.getElementById("download-bar-message")
            console.log("download-bar-message", downloadMessageElement)
            downloadMessageElement.textContent = "Downloading Track"
            const downloadMessage = await channels.downloadTrackChannel.send({url: downloadUrl})
            downloadMessageElement.textContent = downloadMessage
            timeoutText("download-bar-message", 5000)
            await dataController.updateTrackDataNoFilter()
            Tracklist.reloadTracklist()
        })
        return button
        }
       
        

    static _addDownloadMessage() {
        const element = document.createElement("div")
        element.id = "download-bar-message"
        element.classList.add("message")
        element.textContent = ""
        return element
    }
   


}

