class TrackEventHandler {

    addTrackEventListeners() {
        const trackElements = document.getElementsByClassName("track")
        for (const trackElement of trackElements) {
            trackElement.addEventListener("click", this.toggleActive())
        }
    }

    toggleActive(event) {
        const trackElements = document.getElementsByClassName("track")
        for (const trackElement of trackElements) {
            if (trackElement.classList.contains("active-track")) {
                trackElement.classList.remove("active-track")
            }
        }
        event.target.classList.add("active-track")
    }
}