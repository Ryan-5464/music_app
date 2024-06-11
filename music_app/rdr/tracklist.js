//import { TrackDataHandler } from "./rdr/trackDataHandler.js"
//import { TrackElement } from "./rdr/TrackElement.js"


class TrackList {

    loadContent() {
        const element = document.getElementById("centre-container-element")
        element.insertAdjacentElement("afterbegin", this.addTrackList())
        const footerContainer = this.addFooterContainer()
        footerContainer.appendChild(this.addDownloadBar())
        element.appendChild(footerContainer)
        this.addTracksToTrackList()
    }

    addTrackList() {
        const trackListElement = document.createElement("div")
        trackListElement.id = "track-list-element"
        return trackListElement
    }

    removeTrackList() {
        const trackListElement = document.getElementById("track-list-element")
        if (!trackListElement) {
            return
        }
        trackListElement.remove()
    }

    async addTracksToTrackList(page=1, limit=10) {
        const trackDataHandler = new TrackDataHandler()
        const trackData = await trackDataHandler.fetchAllTracks(page, limit)
        const trackListElement = document.getElementById("track-list-element")
        for (const track of trackData) {
            const trackElementFactory = new TrackElementFactory()
            const element = trackElementFactory.makeAllTracksElement(track)
            trackListElement.appendChild(element)
        }
    }

}