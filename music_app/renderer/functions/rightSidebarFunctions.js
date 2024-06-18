class RightSidebarFunctions {

    constructor() {

    }

    getActiveTrackId() {
        const elements = document.getElementsByClassName("active-track")
        const activeTrack = elements[0]
        const activeTrackId = activeTrack.getAttribute("data-track-id")
        return activeTrackId
    }

    async getTags(trackId, getTagsChannel) {
        const tags = await getTagsChannel.send({trackId: trackId})
        return tags
    }

}