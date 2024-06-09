class Track {

    constructor () {

    }

    makeElement() {

    }

}


class TrackPlayButton {

    constructor () {

    }

    makeElement() {
        const container = this.createContainer()
    }

    createContainer(trackId) {
        const button = document.createElement("button")
        button.setAttribute("data-track-id", trackId)
        button.classList.add("play-track-button")
    }
}