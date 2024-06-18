export class DeleteTagEvent {

    addListener() {
        const tagList = document.getElementById("tag-list")
        tagList.addEventListener("click", this.handleDeleteTagEvent)
    }

    async handleDeleteTagEvent(event, deleteTagChannel, getTagsChannel, tagListElement) {
        if (event.target.tagName !== 'BUTTON') {
            return
        }
        if (event.target.id === "add-tag-button") {
            return
        }
        const tagName = event.target.getAttribute("data-tag-name")
        const trackId = event.target.getAttribute("data-track-id")
        await deleteTagChannel.send({trackId: trackId, tag: tagName})
        const tags = await getTagsChannel.send({trackId: trackId})
        tagListElement.load(trackId, tags)
        // this.addListener() # possibly the event listener remains after replcing the taglist
    }
}