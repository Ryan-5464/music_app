//import { TrackDataHandler } from "./rdr/trackDataHandler.js"
//import { TrackElement } from "./rdr/TrackElement.js"


class TrackList {

    constructor(channels) {
        this.channels = channels
        this.trackEventHandler = new TrackEventHandler()
    }

    loadContent() {
        const element = document.getElementById("track-list-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-sub-element")
        subElement.appendChild(this.addTrackListTitle())
        subElement.appendChild(this.addTrackList())
        this.addTracksToTrackList()
    }

    loadTracks(tracks) {
        this.removeSubElement()
        const element = document.getElementById("track-list-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-sub-element")
        subElement.appendChild(this.addTrackListTitle())
        subElement.appendChild(this.addTrackList())
        this.addTracks(tracks)
    }

    loadAllTracks() {
        this.removeSubElement()
        const element = document.getElementById("track-list-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-sub-element")
        subElement.appendChild(this.addTrackListTitle())
        subElement.appendChild(this.addTrackList())
        this.addTracksToTrackList()
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

    async addTracksToTrackList(page=1, limit=10) {
        const trackDataHandler = new TrackDataHandler()
        const tracks = await trackDataHandler.fetchAllTracks(page, limit)
        this.addTracks(tracks)
    }

    addTracks(tracks) {
        const trackListElement = document.getElementById("track-list")
        for (const track of tracks) {
            const trackElementFactory = new TrackElementFactory()
            const element = trackElementFactory.makeAllTracksElement(track)
            trackListElement.appendChild(element)
        }
        const rightSidebarController = new RightSidebarController(this.channels)
        rightSidebarController.addTrackEventListener()
    }

}