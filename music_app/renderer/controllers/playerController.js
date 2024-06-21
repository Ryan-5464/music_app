class PlayerController {

    constructor(channels) {
        this.channels = channels
        this.playerElements = new PlayerElements()
        this.playerFunctions = new PlayerFunctions()
        this.handlePlayTrack = this.handlePlayTrack.bind(this)
        this.handleCurrentProgress = this.handleCurrentProgress.bind(this)
        this.handleNextTrack = this.handleNextTrack.bind(this)
        this.handleRepeatTrack = this.handleRepeatTrack.bind(this)
        this.handleShuffleTrack = this.handleShuffleTrack.bind(this)
        this.handlePlayNextTrack = this.handlePlayNextTrack.bind(this)
    }

    renderContent() {
        this.playerElements.load()
        this.addPlayerEventListeners()
    }

    addPlayerEventListeners() {
        this.addUpdateProgressBarEventListener()
        this.addPlayButtonEventListener()
        this.addPauseButtonEventListener()
        this.addStopButtonEventListener()
        this.addJumpToEventListener()    
        this.addNextTrackEventListener()
        this.addActiveToggleEventListenerToPlayerRepeatButton()
        this.addActiveToggleEventListenerToPlayerShuffleButton()
    }

    addUpdateProgressBarEventListener() {
        const audioElement = document.getElementById("audio-element")
        audioElement.addEventListener("timeupdate", this.handleCurrentProgress)
    }

    addPlayButtonEventListener() {
        const element = document.getElementById("player-play-button")
        element.addEventListener("click", this.handlePlayTrack)
    }

    addPauseButtonEventListener() {
        const element = document.getElementById("player-pause-button")
        element.addEventListener("click", this.handlePauseTrack)
    }

    addStopButtonEventListener() {
        const element = document.getElementById("player-stop-button")
        element.addEventListener("click", this.handlePauseTrack)
    }

    addJumpToEventListener() {
        const progressBar = document.getElementById("progress-bar")
        progressBar.addEventListener("click", this.handleJumpTo)
    }

    addNextTrackEventListener() {
        const audioElement = document.getElementById("audio-element")
        audioElement.addEventListener("ended", this.handleNextTrack)
    }

    handleNextTrack() {
        const repeatButton = document.getElementById("player-repeat-button")
        const shuffleButton = document.getElementById("player-shuffle-button")
        if (repeatButton.classList.contains("active")) {
            this.handleRepeatTrack()
            return
        }
        else if (shuffleButton.classList.contains("active")) {
            this.handleShuffleTrack()
            return
        } 
        else {
            this.handlePlayNextTrack()
        }
    }

    handleRepeatTrack() {
        const audioElement = document.getElementById("audio-element")
        audioElement.play()
    }

    handleShuffleTrack() {
        const tracks = document.getElementsByClassName("track")
        for (const track of tracks) {
            if (track.classList.contains("active-track")) {
                track.classList.remove("active-track")
            }        
        }
        const shuffleInt = this.playerFunctions.getRandomInt(0, tracks.length-1)
        console.log("shuffleInt", shuffleInt)
        tracks[shuffleInt].classList.add("active-track")
        this.handlePlayTrack()
    }

    handlePlayNextTrack() {
        const tracks = document.getElementsByClassName("track")
        let i = 0
        for (const track of tracks) {
            i = i + 1
            if (track.classList.contains("active-track")) {
                track.classList.remove("active-track")
                break
            }
        }
        if (i === tracks.length) {
            tracks[0].classList.add("active-track")
        } 
        else {
            tracks[i].classList.add("active-track")
        }
        this.handlePlayTrack()
    }


    handleJumpTo(event) {
        const audioElement = document.getElementById("audio-element")
        const progressBar = document.getElementById("progress-bar")
        const rect = progressBar.getBoundingClientRect()
        const offsetX = event.clientX - rect.left
        const newTime = (offsetX / rect.width) * audioElement.duration
        audioElement.currentTime = newTime
    }

    handleCurrentProgress() {
        const audioElement = document.getElementById("audio-element")
        const progressPercent = (audioElement.currentTime / audioElement.duration) * 100
        const currentProgress = document.getElementById("current-progress")
        currentProgress.style.width = `${progressPercent}%`
    }

    async handlePlayTrack() {
        let elements = document.getElementsByClassName("active-track")
        if (elements.length === 0) {
           elements = document.getElementsByClassName("track")
           elements[0].classList.add("active-track") 
        }
        const element = elements[0]
        const trackId = element.getAttribute("data-track-id")
        const audioElement = document.getElementById("audio-element")
        const source = await this.channels.playTrackChannel.send({trackId: trackId})
        audioElement.src = source
        audioElement.play()
    }

    handlePauseTrack() {
        const audioElement = document.getElementById("audio-element")
        if (audioElement.paused) {
            console.log("unpaused")
            audioElement.play()
        }
        else {
            console.log("paused")
            audioElement.pause()
        }
    }

    handleStopTrack() {
        const audioElement = document.getElementById("audio-element")
        audioElement.pause()
        audioElement.currentTime = 0
    }

    addActiveToggleEventListenerToPlayerRepeatButton() {
        const element = document.getElementById("player-repeat-button")
        element.addEventListener("click", this.handleToggleActiveRepeatButton)
    }

    addActiveToggleEventListenerToPlayerShuffleButton() {
        const element = document.getElementById("player-shuffle-button")
        element.addEventListener("click", this.handleToggleActiveShuffleButton)
    }

    handleToggleActiveRepeatButton() {
        const element = document.getElementById("player-repeat-button")
        const shuffleElement = document.getElementById("player-shuffle-button")
        if (element.classList.contains("active")) {
            element.classList.remove("active")
            return
        }
        if (shuffleElement.classList.contains("active")) {
            shuffleElement.classList.remove("active")
        }
        element.classList.add("active")
    }

    handleToggleActiveShuffleButton() {
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


}

class PlayerElements {

    load() {
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


class PlayerFunctions {

    getRandomInt(x, y) {
        return Math.floor(Math.random() * (y - x + 1)) + x;
    }
}