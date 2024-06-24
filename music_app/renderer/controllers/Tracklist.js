class Tracklist {



    constructor(tracks) {
        this.tracks = [{track_id: "test1", duration_sec: 300, title: "test title 1"},{track_id: "test2", duration_sec: 200, title: "test title 2"}]
        // this.tracks = tracks
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
        container.classList.add("hide")
        return container
    }



    addTitle() {
        const title = document.createElement("div")
        title.id = "tracklist-title"
        title.classList.add("title")
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
        const container = document.createElement("div")
        container.classList.add("delete-button-container")
        const button = createButton(null, ["track-delete-button"], {"data-track-id": trackId}, "./images/delete-32.png", 18, 18)
        const confirm = createButton(null, ["track-delete-button", "hide"], {"data-track-id": trackId}, "./images/checkmark-32.png", 18, 18)
        const cancel = createButton(null, ["track-delete-button", "hide"], {"data-track-id": trackId}, "./images/delete-2-32.png", 18, 18)
        button.addEventListener("click", () => {
            button.classList.add("hide")
            confirm.classList.remove("hide")
            cancel.classList.remove("hide")
        })
        confirm.addEventListener("click", () => {
            console.log("CONFIRM DELETE NOT IMPLEMENTED")
        })
        cancel.addEventListener("click", () => {
            confirm.classList.add("hide")
            cancel.classList.add("hide")
            button.classList.remove("hide")
        })
        container.appendChild(button)
        container.appendChild(confirm)
        container.appendChild(cancel)
        return container
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


class TrackEvents {


    addEventListeners() {

    }

    confirmDeleteTrack() {
        const elements = document.getElementsByClassName("delete-button-container")
        for (const element of elements) {
            element.addEventListener("click", () => {
                element.innerHTML = ''
                const button = document.createElement("button")
                button.setAttribute("data-track-id", trackId)
                button.classList.add("track-delete-button")
                const icon = document.createElement("img")
                icon.src = "./images/delete-32.png"
                icon.style.cssText = "width: 18px; height: 18px;"
                button.appendChild(icon)
                container.appendChild(button)
            })
        }
    }


}


