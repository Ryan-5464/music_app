class TrackListController {

    constructor(channels) {
        this.channels = channels
        this.rightSidebarController = new RightSidebarController(channels)
        this.trackListElements = new TrackListElements(this.rightSidebarController)
    }

    async renderAllTracks() {
        const tracks = await this.channels.getAllTracksChannel.send({page: 1, limit: 10000})
        this.trackListElements.loadTrackList(tracks)
        this.addTrackEventListeners()
    }

    async renderTracks(tracks) {
        this.trackListElements.loadTrackList(tracks)
        this.addTrackEventListeners()
    }

    addTrackEventListeners() {
        const trackElements = document.getElementsByClassName("track")
        for (const trackElement of trackElements) {
            trackElement.addEventListener("click", this.toggleActive)
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

class TrackListElements {

    constructor(rightSidebarController) {
        this.trackElement = new TrackElement()
        this.rightSidebarController = rightSidebarController
    }

    loadTrackList(tracks) {
        this.removeSubElement()
        const element = document.getElementById("track-list-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-sub-element")
        subElement.appendChild(this.addTrackListTitle())
        subElement.appendChild(this.addTrackList())
        this.addTracks(tracks)
    }

    addSubElement() {
        const element = document.createElement("div")
        element.id = "track-list-sub-element"
        return element
    }

    removeSubElement() {
        const element = document.getElementById("track-list-sub-element")
        if (!element) {
            return
        }
        element.remove() 
    }

    addTrackListTitle() {
        const element = document.createElement("div")
        element.id = "track-list-title"
        element.classList.add("title")
        element.textContent = "Track List"
        return element
    }

    addTrackList() {
        const element = document.createElement("div")
        element.id = "track-list"
        return element
    }

    addTracks(tracks) {
        const trackListElement = document.getElementById("track-list")
        for (const track of tracks) {
            const element = this.trackElement.create(track)
            trackListElement.appendChild(element)
        }
        this.rightSidebarController.addTrackEventListener()
    }

}

class TrackElement {

    create(track) {
        const element = document.createElement("div")
        element.setAttribute("data-track-id", track.track_id)
        element.classList.add("track")
        element.appendChild(this.addTrackTitle(track.title))
        element.appendChild(this.addTrackDuration(track.duration_sec))
        return element
    }

    addTrackTitle(title) {
        const element = document.createElement("div")
        element.classList.add("track-title")
        element.textContent = title
        element.style.pointerEvents = 'none'
        return element
    }

    addTrackDuration(duration) {
        const trackDuration = new TrackDuration()
        trackDuration.makeElement(duration)
        return trackDuration.element
    }

    addDeleteButton(trackId) {
        const element = document.createElement("button")
        element.setAttribute("data-track-id", trackId)
        element.classList.add("delete-track-button")
        element.textContent = "Del"
        return element
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




class TrackListFunctions {

}