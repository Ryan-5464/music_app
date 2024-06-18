export class Tags {

    async getTags(trackId, getTagsChannel) {
        const tags = await getTagsChannel.send({trackId: trackId})
        return tags
    }
}