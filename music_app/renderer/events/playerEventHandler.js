class PlayerEventHandler {

    constructor() {
        this.channel = new Channel("play-track--send", "play-track--receive")
        this.handlePlayTrack = this.handlePlayTrack.bind(this)
        this.handleCurrentProgress = this.handleCurrentProgress.bind(this)
    }

    addUpdateProgressBarEventListener() {
        const audioElement = document.getElementById("audio-element")
        audioElement.addEventListener("timeupdate", this.handleCurrentProgress)
    }

    addPlayButtonEventListener() {
        const element = document.getElementById("player-play-button")
        element.addEventListener("click", this.handlePlayTrack)
    }

    addJumpToEventListener() {
        const progressBar = document.getElementById("progress-bar")
        progressBar.addEventListener("click", this.handleJumpTo)
    }

    handleJumpTo(event) {
        const audioElement = document.getElementById("audio-element")
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
        const elements = document.getElementsByClassName("active-track")
        const element = elements[0]
        const trackId = element.getAttribute("data-track-id")
        const audioElement = document.getElementById("audio-element")
        const source = await this.channel.send({trackId: trackId})
        console.log("source", source)
        audioElement.src = source
        audioElement.play()
    }
}