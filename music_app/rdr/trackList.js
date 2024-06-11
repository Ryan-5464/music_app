import { Track } from "./track.js"



export class TrackList {

    constructor () {
        this.element = null
    }

    makeElement() {
        const div = document.createElement("div")
        div.id = "track-list"
        this.element = div
    }

    addTracks(trackListData) {
        for (const trackData of trackListData) {
            const track = new Track(trackData)
            track.addPlayButton()
            track.addTrackTitle()
            track.addTrackDuration()
            track.addDeleteButton()
            this.trackList.appendChild(track.element)
        }
    }

}