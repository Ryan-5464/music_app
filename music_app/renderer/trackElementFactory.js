class TrackElementFactory {

    makeAllTracksElement(trackData) {
        const element = document.createElement("div")
        element.setAttribute("data-track-id", trackData.trackId)
        element.classList.add("track")
        element.appendChild(this.addPlayButton(trackData.trackId))
        element.appendChild(this.addTrackTitle(trackData.title))
        element.appendChild(this.addTrackDuration(trackData.duration))
        return element
    }

    makeElement() {
        const div = document.createElement("div")
        div.setAttribute("data-track-id", this.trackData.trackId)
        div.classList.add("track")
        div.appendChild(this.addPlayButton())
        div.appendChild(this.addTrackTitle())
        div.appendChild(this.addTrackDuration())
        div.appendChild(this.addDeleteButton())
        this.element = div
    }

    addPlayButton(trackId) {
        const playButton = new PlayButton()
        playButton.makeElement(trackId)
        return playButton.element
    }

    addTrackTitle(title) {
        const trackTitle = new TrackTitle()
        trackTitle.makeElement(title)
        return trackTitle.element
    }

    addTrackDuration(duration) {
        const trackDuration = new TrackDuration()
        trackDuration.makeElement(duration)
        return trackDuration.element
    }

    addDeleteButton(trackId) {
        const deleteButton = new DeleteButton()
        deleteButton.makeElement(trackId)
        return deleteButton.element
    }

}


class PlayButton {

    constructor() {
        this.element = null
    }

    makeElement(trackId) {
        const element = document.createElement("button")
        element.setAttribute("data-track-id", trackId)
        element.classList.add("play-track-button")
        element.textContent = "Play"
        this.element = element
    }
    
}

class TrackTitle {

    constructor() {
        this.element = null
    }
    
    makeElement(trackTitle) {
        const element = document.createElement("div")
        element.classList.add("track-title")
        element.textContent = trackTitle
        this.element = element
    }
    
}

class TrackDuration {

    constructor() {
        this.element = null
    }
    
    makeElement(trackDuration) {
        const element = document.createElement("div")
        element.classList.add("track-duration")
        element.textContent = trackDuration
        this.element = element
    }

}

class DeleteButton {
    
    constructor() {
        this.element = null
    }

    makeElement(trackId) {
        const element = document.createElement("button")
        element.setAttribute("data-track-id", trackId)
        element.classList.add("delete-track-button")
        element.textContent = "Del"
        this.element = element
    }
}


