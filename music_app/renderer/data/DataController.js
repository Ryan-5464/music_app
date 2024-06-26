
class DataController {



    constructor(channels) {
        this.channels = channels
        this.trackData = []
    }


    
    async updateTrackDataNoFilter(page=1, limit=100000) {
        this.trackData = await this.channels.fetchAllTracksChannel.send({page: page, limit: limit})
    }



    async deleteTrack(trackId) {
        await this.channels.deleteTrackChannel.send({trackId: trackId})
    }



    async fetchAudioSource(trackId) {
        const source = await this.channels.playTrackChannel.send({trackId: trackId})
        return source
    }



}