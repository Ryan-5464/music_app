import { dataController } from "../../renderer.js"
import { updateTrackList } from "./TrackList.js"





export function createDownloadBarElement() {

    const container = createContainer()
    container.appendChild(createInputBox())
    container.appendChild(createDownloadButton())
    container.appendChild(createDownloadMessage())
    return container 
}





export function addDownloadBarEventListeners() {

    addDownloadButtonEventListener()
}





function createContainer() {

    const container = document.createElement("div")
    container.id = "download-bar-container"
    container.classList.add("visible", "show-hide-element-container")
    return container
}





function createInputBox() {

    const input = document.createElement("input")
    input.id = "download-bar-input-box"
    input.placeholder = "Enter a valid Youtube URL."
    return input
}





function createDownloadButton() {

    return createButton("download-bar-button", [], {}, "./images/download-2-32.png", 24, 24)
}





function createDownloadMessage() {

    const element = document.createElement("div")
    element.id = "download-bar-message"
    element.textContent = ""
    return element
}





function addDownloadButtonEventListener() {

    const btn = document.getElementById("download-bar-button")
    btn.addEventListener("click", 
        async () => {

            const input = document.getElementById("download-bar-input-box")
            const msg = document.getElementById("download-bar-message")
            msg.textContent = "Downloading Track..."
            msg.textContent = await dataController.downloadAudio(input.value)
            hideMessageTimer(msg, 5000)
            await dataController.updateTrackDataNoFilter()
            updateTrackList()
        }
    )
}





function hideMessageTimer(element, delay) {
    setTimeout(() => {
        element.textContent = ''
    }, delay)
}
