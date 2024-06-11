//import { TrackDataHandler } from "./trackDataHandler.js"
//import { TrackElement } from "./TrackElement.js"


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

    addTracksToTrackList(page=1, limit=10) {
        const trackDataHandler = new TrackDataHandler()
        const trackData = trackDataHandler.fetchTracks(page, limit)
        const trackListElement = document.getElementById("track-list-element")
        for (track of trackData) {
            const trackElement = new TrackElement()
            const element = trackElement.makeAllTracksElement(track)
            trackListElement.appendChild(element)
        }
    }

}