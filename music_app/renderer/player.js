class Player {

    loadContent() {
        const element = document.getElementById("footer-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("footer-sub-element")
        subElement.appendChild(this.addAudioElement())
        subElement.appendChild(this.addPlayButton())
        subElement.appendChild(this.addPauseButton())
        subElement.appendChild(this.addStopButton())
        subElement.appendChild(this.addRepeatButton())
        subElement.appendChild(this.addShuffleButton())
        subElement.appendChild(this.addProgressBar())
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
        element.id = "player-play-button"
        element.textContent = "Play"
        element.classList.add("left-rounded-button")
        return element
    }

    addPauseButton() {
        const element = document.createElement("button")
        element.id = "player-pause-button"
        element.textContent = "Pause"
        element.classList.add("square-button")
        return element
    }

    addStopButton() {
        const element = document.createElement("button")
        element.id = "player-stop-button"
        element.textContent = "Stop"
        element.classList.add("square-button")
        return element
    }

    addRepeatButton() {
        const element = document.createElement("button")
        element.id = "player-repeat-button"
        element.textContent = "Repeat"
        element.classList.add("square-button")
        return element
    }

    addShuffleButton() {
        const element = document.createElement("button")
        element.id = "player-shuffle-button"
        element.textContent = "Shuffle"
        element.classList.add("right-rounded-button")
        return element
    }
    
    addProgressBar() {
        const element = document.createElement("div")
        element.id = "progress-bar"
        const subElement = document.createElement("div")
        subElement.id = "current-progress"
        element.appendChild(subElement)
        return element
    }


}