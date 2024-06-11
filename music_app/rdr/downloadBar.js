class DownloadBar {

    makeElement() {
        const element = document.createElement("div")
        element.id = "download-bar-element"
        element.appendChild(this.addInputBox())
        element.appendChild(this.addDownloadButton())
        return element
    }

    addInputBox() {
        const input = document.createElement("input")
        input.id = "download-bar-input"
        input.placeholder = "Enter URL"
        return input
    }
        
    addDownloadButton() {
        const button = document.createElement("button")
        button.id = "download-bar-button"
        button.textContent = "Download"
        return button
    }
}