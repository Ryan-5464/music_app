import { dataController } from "../../renderer.js"
import { channels } from "../../renderer.js"



export class Player {



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
        container.classList.add("player-display")
        return container
    }

    addPlayerButtonsContainer() {
        const container = document.createElement("div")
        container.id = "player-button-container"
        container.classList.add("frosted-glass")
        container.appendChild(this.addPreviousButton())
        container.appendChild(this.addPauseButton())
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

    addPreviousButton() {
        const button = createButton("player-previous-button", ["player-button"], {}, "./images/previous-32.png", 24, 24) 
        button.addEventListener("click", PlayerEvents.handlePreviousButton) 
        return button
    }

    addPauseButton() {
        const button = createButton("player-pause-button", ["player-button"], {}, "./images/play-32.png", 24, 24) 
        button.addEventListener("click", () => {
            const audioElement = document.getElementById("audio-element")
            const pauseButton = document.getElementById("player-pause-button")
            if (audioElement.paused) {
                console.log("unpaused")
                pauseButton.children[0].src = "./images/pause-32.png"
                audioElement.play()
            }
            else {
                console.log("paused")
                 pauseButton.children[0].src = "./images/play-32.png"
                audioElement.pause()
            }
        })
        return button
    }

    addNextButton() {
        const button = createButton("player-next-button", ["player-button"], {}, "./images/next-32.png", 24, 24) 
        button.addEventListener("click", PlayerEvents.handleNextButton)
        return button
    }

    addStopButton() {
        const button = createButton("player-stop-button", ["player-button"], {}, "./images/stop-32.png", 24, 24) 
        button.addEventListener("click", () => {
            const audioElement = document.getElementById("audio-element")
            audioElement.pause()
            audioElement.currentTime = 0
        })
        return button
    }

    addRepeatButton() {
        const button = createButton("player-repeat-button", ["player-button"], {}, "./images/repeat-32.png", 24, 24) 
        button.addEventListener("click", PlayerEvents.handleRepeatButton)
        return button
    }

    addShuffleButton() {
        const button = createButton("player-shuffle-button", ["player-button"], {}, "./images/shuffle-32.png", 24, 24) 
        button.addEventListener("click", PlayerEvents.handleShuffleButton)
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



class PlayerEvents {

    static async handlePreviousButton() {
        const tracks = document.getElementsByClassName("track")
        let i = 0
        for (const track of tracks) {
            if (track.classList.contains("track-now-playing")) {
                track.classList.remove("track-now-playing")
                break
            }
            i = i + 1
        }
        let track = null
        if (i === 0) {
            tracks[tracks.length - 1].classList.add("track-now-playing")
            track = tracks[tracks.length - 1]
        } 
        else {
            tracks[i-1].classList.add("track-now-playing")
            track = tracks[i-1]
        }
        const trackId = track.getAttribute("data-track-id")
        const audioSource = await PlayerEvents.getAudioSource(trackId)
        await PlayerEvents.stopTrack()
        await PlayerEvents.playTrack(audioSource)
    }

    static async handleNextButton() {
        const tracks = document.getElementsByClassName("track")
        let i = 0
        for (const track of tracks) {
            i = i + 1
            if (track.classList.contains("track-now-playing")) {
                track.classList.remove("track-now-playing")
                break
            }
        }
        let track = null
        if (i === tracks.length) {
            tracks[0].classList.add("track-now-playing")
            track = tracks[0]
        } 
        else {
            tracks[i].classList.add("track-now-playing")
            track = tracks[i]
        }
        const trackId = track.getAttribute("data-track-id")
        const audioSource = await PlayerEvents.getAudioSource(trackId)
        await PlayerEvents.stopTrack()
        await PlayerEvents.playTrack(audioSource)
    }

    static handleRepeatButton() {
        const repeatElement = document.getElementById("player-repeat-button")
        const shuffleElement = document.getElementById("player-shuffle-button")
        if (repeatElement.classList.contains("active")) {
            repeatElement.classList.remove("active")
            return
        }
        if (shuffleElement.classList.contains("active")) {
            shuffleElement.classList.remove("active")
        }
        repeatElement.classList.add("active")
    }

    static handleShuffleButton() {
        const element = document.getElementById("player-shuffle-button")
        const repeatElement = document.getElementById("player-repeat-button")
        if (element.classList.contains("active")) {
            element.classList.remove("active")
            return
        }
        if (repeatElement.classList.contains("active")) {
            repeatElement.classList.remove("active")
        }
        element.classList.add("active")
    }

    static async getAudioSource(trackId) {
        const source = await channels.playTrackChannel.send({trackId: trackId})
        return source
    }

    static async playTrack(source) {
        const audioElement = document.getElementById("audio-element")
        audioElement.src = source
        await audioElement.play()
    }

    static async stopTrack() {
        const audioElement = document.getElementById("audio-element")
        await audioElement.pause()
        audioElement.currentTime = 0
    }
}