class DownloadBar {

    makeElement() {
        const element = document.createElement("div")
        element.id = "download-bar-element"
        element.appendChild(this.addInputBox())
        element.appendChild(this.addDownloadButton())
        element.appendChild(this.addDownloadMessage())
        return element
    }

    addInputBox() {
        const input = document.createElement("input")
        input.id = "download-bar-input"
        input.placeholder = "Enter a valid Youtube URL."
        return input
    }
        
    addDownloadButton() {
        const button = document.createElement("button")
        button.id = "download-bar-button"
        button.textContent = "Download"
        return button
        }
        
        addDownloadMessage() {
            const element = document.createElement("div")
            element.id = "download-message"
            return element
        }
            
}
            
            

