class Player {

    loadContent() {
        const element = document.getElementById("footer-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("footer-sub-element")
        subElement.appendChild(this.addAudioElement())
        subElement.appendChild(this.addPlayButton())
        subElement.appendChild(this.addPauseButton())
        subElement.appendChild(this.addStopButton())
    }

    addSubElement() {
        const element = document.createElement("div")
        element.id = "footer-sub-element"
        return element
    }

    removeSubElement() {
        const element = document.getElementById("footer-sub-element")
        if (!element) {
            return
        }
        element.remove() 
    }

    addAudioElement() {
        const element = document.createElement("audio")
        element.id = "audio-element"
        return element
    }

    addPlayButton() {
        const element = document.createElement("button")
        element.classList.add("player-play-button")
        element.textContent = "Play"
        return element
    }

    addPauseButton() {
        const element = document.createElement("button")
        element.classList.add("player-pause-button")
        element.textContent = "Pause"
        return element
    }

    addStopButton() {
        const element = document.createElement("button")
        element.classList.add("player-stop-button")
        element.textContent = "Stop"
        return element
    }


}