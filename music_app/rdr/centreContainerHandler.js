//import { TrackDataHandler } from "./rdr/trackDataHandler.js"
//import { TrackElement } from "./rdr/TrackElement.js"


class CentreContainerHandler {

    loadContent() {
        const centreContainerElement = document.getElementById("centre-container-element")
        centreContainerElement.insertAdjacentElement("afterbegin", this.addTrackList())
        centreContainerElement.appendChild(this.addDownloadBar())
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

    addDownloadBar() {
        const downloadBarElement = document.createElement("div")
        downloadBarElement.id = "download-bar-element"
        const input = document.createElement("input")
        input.id = "download-bar-input"
        const button = document.createElement("button")
        button.id = "download-bar-button"
        downloadBarElement.appendChild(input)
        downloadBarElement.appendChild(button)
        return downloadBarElement
    }

    async addTracksToTrackList(page=1, limit=10) {
        const trackDataHandler = new TrackDataHandler()
        const trackData = await trackDataHandler.fetchAllTracks(page, limit)
        console.log("trackdata", trackData)
        const trackListElement = document.getElementById("track-list-element")
        for (const track of trackData) {
            const trackElementFactory = new TrackElementFactory()
            const element = trackElementFactory.makeAllTracksElement(track)
            trackListElement.appendChild(element)
        }
    }

}