class TrackElementFactory {

    makeAllTracksElement(trackData) {
        const element = document.createElement("div")
        element.setAttribute("data-track-id", trackData.track_id)
        element.classList.add("track")
        element.appendChild(this.addTrackTitle(trackData.title))
        element.appendChild(this.addTrackDuration(trackData.duration_sec))
        return element
    }

    makeElement() {
        const div = document.createElement("div")
        div.setAttribute("data-track-id", this.trackData.track_id)
        div.classList.add("track")
        div.appendChild(this.addPlayButton())
        div.appendChild(this.addTrackTitle())
        div.appendChild(this.addTrackDuration())
        div.appendChild(this.addDeleteButton())
        this.element = div
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


class TrackTitle {

    constructor() {
        this.element = null
    }
    
    makeElement(trackTitle) {
        const element = document.createElement("div")
        element.classList.add("track-title")
        element.textContent = trackTitle
        element.style.pointerEvents = 'none'
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
        element.textContent = this.format(trackDuration)
        element.style.pointerEvents = 'none'
        this.element = element
    }

    format(trackDuration) {
        let x = {hours: 0, minutes: 0, seconds: 0, remainingDuration: trackDuration}
        if (trackDuration > 3600) {
            let x = this.hours(x)
            x = this.minutes(x)
            x = this.seconds(x)
            return `${x.hours}:${x.minutes}:${x.seconds}`
        } else {
            x = this.minutes(x)
            x = this.seconds(x)
            return `${x.minutes}:${x.seconds}`
        }
    }

    hours(x) {
        x.hours = Math.floor(x.remainingDuration / 3600)
        x.remainingDuration = x.remainingDuration - (3600 * x.hours)
        if (x.hours < 10) {
            x.hours = `0${x.hours}`
        } else {
            x.hours = `${x.hours}`
        }
        return x
    }

    minutes(x) {
        x.minutes = Math.floor(x.remainingDuration / 60)
        x.remainingDuration = x.remainingDuration - (60 * x.minutes)
        if (x.minutes < 10) {
            x.minutes = `0${x.minutes}`
        } else {
            x.minutes = `${x.minutes}`
        }
        return x
    }

    seconds(x) {
        x.seconds = x.remainingDuration
        if (x.seconds < 10) {
            x.seconds = `0${x.seconds}`
        } else {
            x.seconds = `${x.seconds}`
        }
        return x
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


