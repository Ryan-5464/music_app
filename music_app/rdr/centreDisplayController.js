//import { TrackListData } from "./TrackListData.js"
//import { Track } from "./track.js"
//import { TagFilter } from "./tagFilter.js"


class centreDisplayController {

    constructor() {
        this.trackListData = new TrackListData()
        this.tagFilter = new TagFilter()
    }

    async displayAllTracks() {
        const tracks = await this.trackListData.fetchAllTracks()
        let trackList = document.getElementById("track-list")
        if (trackList) {
            trackList.remove()
        }
        trackList = document.createElement("div")
        trackList.id = "track-list"
        for (const _track of tracks) {
            const track = new Track(_track)
            track.makeElement()
            trackList.appendChild(track.element)
        }
        const centreContainer = document.getElementById("centre-container")
        centreContainer.insertAdjacentElement('afterbegin', trackList)
    }

    displayTagFilter() {
        const centreContainer = document.getElementById("centre-container")
        this.tagFilter.makeElement()
        centreContainer.appendChild(this.tagFilter.element)
        const tagFilterInput = document.getElementById("tag-filter-input")
        tagFilterInput.addEventListener("input", () => {
            this.displayTracksbyTag()
        })
    }

    async displayTracksbyTag() {
        const tagFilterInput = document.getElementById("tag-filter-input")
        let tags = tagFilterInput.value
        tags = tags.split(',').map(tag => tag.trim())
        const tracks = await this.trackListData.fetchTracksByTag(tags)
        let trackList = document.getElementById("track-list")
        if (trackList) {
            trackList.remove()
        }
        trackList = document.createElement("div")
        trackList.id = "track-list"
        for (const _track of tracks) {
            const track = new Track(_track)
            track.makeElement()
            trackList.appendChild(track.element)
        }
        const centreContainer = document.getElementById("centre-container")
        centreContainer.insertAdjacentElement('afterbegin', trackList)      
    }

}



