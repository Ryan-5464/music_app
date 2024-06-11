import { Channel } from "diagnostics_channel"
import { TagsFilter } from "./tagFilter.js"
import { TrackList } from "./trackList.js"
import { TrackListData } from "./trackListData.js"



export class MiddleContainer {
    
    constructor() {
        this.element = null
        this.trackListData = new TrackListData()
        this.playTrackChannel = new Channel("play-track--send", "play-track--receive")
        this.deleteTrackChannel = new Channel("delete-track--send", "delete-track--receive")
    }

    makeElement() {
        const div = document.createElement("div")
        div.id = "middle-container"
        div.addEventListener("input", this.addTrackListListener)
        div.addEventListener("click", this.addPlayTrackListener)
        div.addEventListener("click", this.addDeleteTrackListener)
        this.element = div
    }

    async addTrackListListener(event) {

        if (event.target.id !== "tags-filter-input") {
            return
        }

        const trackListData = await this.trackListData.fetchTracksByTag()

        const trackList = new TrackList()
        trackList.makeElement()
        trackList.addTracks(trackListData)

    }

    addTagsFilter() {
        const tagsFilter = new TagsFilter()
        tagsFilter.makeElement()
        tagsFilter.addFilterInput()
    }

    async addPlayTrackListener(event) {

        if ( event.target.tagName !== "BUTTON") {
            return
        }
        if ( !event.target.classList.contains('play-track-button')) {
            return
        }
        const trackId = event.target.id
        const trackSource = await this.trackSource(trackId)
        const audioElement = document.getElementById("myAudio")
        audioElement.src = trackSource
        audioElement.play()

    }

    async trackSource(trackId) {
        const trackSource = this.playTrackChannel.send({trackId: trackId})
        return trackSource
    }

    async addDeleteTrackListener(event) {

        if (event.target.tagName !== "BUTTON") {
            return
        }
        if ( !event.target.classList.contains('delete-track-button')) {
            return
        }
        const trackId = event.target.id
        await this.deleteTrackChannel.send({trackId: trackId})

        const trackListData = await this.trackListData.fetchTracksByTag()

        document.getElementById("track-list").remove()
        const trackList = new TrackList()
        trackList.makeElement()
        trackList.addTracks(trackListData)
    }

}