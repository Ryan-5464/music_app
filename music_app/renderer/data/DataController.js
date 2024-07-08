


export class DataController {



    constructor(channels) {
        this.channels = channels
        this.trackData = []
        this.trackTagsData = []
        this.tagsListData = []
    }



    async downloadAudio(url) {
        const successMsg = await this.channels.downloadTrackChannel.send({url: url})
        return successMsg
    }



    async deleteTag(tagName, trackId) {
        await this.channels.deleteTagChannel.send({trackId: trackId, tagName: tagName})
    }



    async addTag(tagName, trackId) {
        await this.channels.addTagChannel.send({trackId: trackId, tagName: tagName})
    }


    
    async updateTrackDataNoFilter(page=1, limit=100000) {
        this.trackData = await this.channels.fetchAllTracksChannel.send({page: page, limit: limit})
    }



    async updateTrackDataByTags(tags, anyButtonActive) {
        this.trackData = await this.channels.tagFilterChannel.send({tags: tags, anyButtonActive: anyButtonActive})
    }



    async renameTrack(trackId, newName) {
        return await this.channels.renameTrackChannel.send({trackId: trackId, newName: newName})
    }



    async updateTrackDataBySearch(searchString) {
        this.trackData = await this.channels.searchFilterChannel.send({searchString: searchString})
    }


    async updateTrackTagsData(trackId) {
        this.trackTagsData = await this.channels.getTagsChannel.send({trackId: trackId})
    }

    async updateTagsListData() {
        this.tagsListData = await this.channels.getAllTagsChannel.send({})
    }

    async deleteTrack(trackId) {
        await this.channels.deleteTrackChannel.send({trackId: trackId})
    }



    async fetchAudioSource(trackId) {
        const source = await this.channels.playTrackChannel.send({trackId: trackId})
        return source
    }



    retreiveTrackData(trackId) {
        const track = this.trackData.find(t => t.track_id === trackId)
        return track
    }


}