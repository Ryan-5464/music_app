class Player {



    create() {
        const container = this.addContainer()
        container.appendChild(this.addAudioElement())
        container.appendChild(this.addProgressBar())
        container.appendChild(this.addPlayerButtonsContainer())
        return container
    }

    addContainer() {
        const container = document.createElement("div")
        container.id = "player-container"
        return container
    }

    addPlayerButtonsContainer() {
        const container = document.createElement("div")
        container.id = "player-button-container"
        container.classList.add("frosted-glass")
        container.appendChild(this.addPreviousButton())
        container.appendChild(this.addPlayPauseButtonContainer())
        container.appendChild(this.addStopButton())
        container.appendChild(this.addNextButton())
        container.appendChild(this.addRepeatButton())
        container.appendChild(this.addShuffleButton())
        container.appendChild(this.addVolumeSlider())
        return container
    }

    addAudioElement() {
        const element = document.createElement("audio")
        element.id = "audio-element"
        element.addEventListener("timeupdate", () => {
            const progressPercent = (element.currentTime / element.duration) * 100
            const currentProgress = document.getElementById("player-current-progress")
            currentProgress.style.width = `${progressPercent}%`
        })
        return element
    }

    addPlayPauseButtonContainer() {
        const container = document.createElement("div")
        container.id = "player-play-pause-container"
        container.appendChild(this.addPlayButton())
        container.appendChild(this.addPauseButton())
        return container
    }

    addPreviousButton() {
        const button = createButton("player-previous-button", ["player-button"], {}, "./images/previous-32.png", 24, 24) 
        return button
    }

    addPlayButton() {
        const button = createButton("player-play-button", ["player-button"], {}, "./images/play-32.png", 24, 24) 
        return button
    }

    addPauseButton() {
        const button = createButton("player-pause-button", ["player-button", "hide"], {}, "./images/pause-32.png", 24, 24) 
        return button
    }

    addNextButton() {
        const button = createButton("player-next-button", ["player-button"], {}, "./images/next-32.png", 24, 24) 
        return button
    }

    addStopButton() {
        const button = createButton("player-stop-button", ["player-button"], {}, "./images/stop-32.png", 24, 24) 
        return button
    }

    addRepeatButton() {
        const button = createButton("player-repeat-button", ["player-button"], {}, "./images/repeat-32.png", 24, 24) 
        return button
    }

    addShuffleButton() {
        const button = createButton("player-shuffle-button", ["player-button"], {}, "./images/shuffle-32.png", 24, 24) 
        return button
    }

    addVolumeSlider() {
        const element = document.createElement("input")
        element.id = "player-volume-slider"
        element.type = "range"
        element.min = "0"
        element.max = "1"
        element.step = "0.01"
        element.value = "1"
        return element
    }
    
    addProgressBar() {
        const element = document.createElement("div")
        element.id = "player-progress-bar"
        element.addEventListener("click", (event) => {
            const audioElement = document.getElementById("audio-element")
            const rect = element.getBoundingClientRect()
            const offsetX = event.clientX - rect.left
            const newTime = (offsetX / rect.width) * audioElement.duration
            audioElement.currentTime = newTime
        })
        const subElement = document.createElement("div")
        subElement.id = "player-current-progress"
        element.appendChild(subElement)
        return element
    }

    

}