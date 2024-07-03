


export class DataController {



    constructor(channels) {
        this.channels = channels
        this.trackData = []
        this.tagData = []
    }


    
    async updateTrackDataNoFilter(page=1, limit=100000) {
        this.trackData = await this.channels.fetchAllTracksChannel.send({page: page, limit: limit})
    }



    async updateTrackDataByTags(tags, anyButtonActive) {
        this.trackData = await this.channels.tagFilterChannel.send({tags: tags, anyButtonActive: anyButtonActive})
    }



    async updateTrackDataBySearch(searchString) {
        this.trackData = await this.channels.searchFilterChannel.send({searchString: searchString})
    }


    async updateTagData(trackId) {
        this.tagData = await this.channels.getTagsChannel.send({trackId: trackId})
    }



    async deleteTrack(trackId) {
        await this.channels.deleteTrackChannel.send({trackId: trackId})
    }



    async fetchAudioSource(trackId) {
        const source = await this.channels.playTrackChannel.send({trackId: trackId})
        return source
    }



}