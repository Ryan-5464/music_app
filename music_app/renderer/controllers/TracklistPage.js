class TracklistPage {



    constructor(tracks) {
        this.tracks = tracks
    }



    create() {
        const container = this.addContainer()
        container.appendChild(this.addTitle())
        container.appendChild(this.addTracklist())
        return container
    }



    addContainer() {
        const container = document.createElement("div")
        container.id = "tracklist-container"
        return container
    }



    addTitle() {
        const title = document.createElement("div")
        title.id = "tracklist-title"
        title.textContent = "Now Playing"
        return title
    }



    addTracklist() {
        const tracklist = document.createElement("div")
        tracklist.id = "tracklist"
        const trackElement = new TrackElement()
        for (const track of this.tracks) {
            tracklist.appendChild(trackElement.create(track))
        }
        return tracklist       
    }


}




class TrackElement {
    

    create(track) {
        const element = document.createElement("div")
        element.setAttribute("data-track-id", track.track_id)
        element.classList.add("track")
        element.appendChild(this.addTrackTitle(track.title))
        element.appendChild(this.addTrackDuration(track.duration_sec))
        element.appendChild(this.addDeleteButton(track.track_id))
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