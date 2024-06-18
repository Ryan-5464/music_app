
class TrackEventHandler {

    constructor() {
        this.channel = new Channel("fetch-track-by-trackid--send", "fetch-track-by-trackid--receive")
        this.toggleActive = this.toggleActive.bind(this)
    }

    addTrackEventListeners() {
        const trackElements = document.getElementsByClassName("track")
        for (const trackElement of trackElements) {
            trackElement.addEventListener("click", this.toggleActive)
        }
    }

    async toggleActive(event) {
        const trackElements = document.getElementsByClassName("track")
        for (const trackElement of trackElements) {
            if (trackElement.classList.contains("active-track")) {
                trackElement.classList.remove("active-track")
            }
        }
        event.target.classList.add("active-track")
    }
}