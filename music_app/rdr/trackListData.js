import { Channel } from "./Channel.js";




export class TrackListData {
    
    constructor () {
        this.fetchByTagChannel = new Channel("fetch-tracks-by-tag--send", "fetch-tracks-by-tag--receive")
        this.fetchAllChannel = new Channel("fetch-all-tracks--send", "fetch-all-tracks--receive")
    }

    async fetchTracksByTag() {
        const input = document.getElementById("tags-filter-input")
        const tags = input.value.split(',').map(tag => tag.trim())
        const anyButton = document.getElementById("tags-filter-any-button")
        const anyButtonActive = anyButton.classList.contains("active")
        const trackByTag = await this.fetchByTagChannel({tags: tags, anyButtonActive: anyButtonActive})
        return trackByTag
    }

    async fetchAllTracks() {
        const allTracks = await this.fetchAllChannel.send({})
        return allTracks
    }

}