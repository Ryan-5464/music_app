export class Track {

    constructor (trackData) {
        this.trackData = trackData
        this.element = null
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

    addPlayButton() {
        const playButton = new TrackPlayButton()
        playButton.makeElement(this.trackData.trackId)
        return playButton.element
    }

    addTrackTitle() {
        const trackTitle = new TrackTitle()
        trackTitle.makeElement(this.trackData.title)
        return trackTitle.element
    }

    addTrackDuration() {
        const trackDuration = new TrackDuration()
        trackDuration.makeElement(this.trackData.duration)
        return trackDuration.element
    }

    addDeleteButton() {
        const deleteButton = new DeleteButton()
        deleteButton.makeElement(this.trackData.trackId)
        return deleteButton.element
    }

}


class TrackPlayButton {

    constructor() {
        this.element = null
    }
    
    makeElement(trackId) {
        const button = document.createElement("button")
        button.setAttribute("data-track-id", trackId)
        button.classList.add("play-track-button")
        this.element = button
    }
    
}

class TrackTitle {

    constructor() {
        this.element = null
    }
    
    makeElement(trackTitle) {
        const div = document.createElement("div")
        div.classList.add("track-title")
        div.textContent = trackTitle
        this.element = div
    }
    
}

class TrackDuration {

    constructor() {
        this.element = null
    }
    
    makeElement(trackDuration) {
        const div = document.createElement("div")
        div.classList.add("track-duration")
        div.textContent(trackDuration)
        this.element = div
    }

}

class DeleteButton {
    
    constructor() {
        this.element = null
    }

    makeElement(trackId) {
        const button = document.createElement("button")
        button.setAttribute("data-track-id", trackId)
        button.classList.add("delete-track-button")
        this.element = button
    }
}



const track = new Track(track).makeElement().addPlayButton().addTrackTitle().addTrackDuration()