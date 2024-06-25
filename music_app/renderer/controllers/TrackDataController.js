class TrackDataController {



    constructor(channels) {
        this.channels = channels
        this.trackData = this.updateTrackData()
    }


    
    updateTrackData() {
        this.TrackData = this.channels.fetchAllTracksChannel.send({page: 1, limit: 10000})
    }



}