export class AddTagEvent {

    addListener() {
        const addTagButton = document.getElementById("add-tag-button")
        addTagButton.addEventListener("click", this.handleAddTagEvent)
    }

    async handleAddTagEvent(event, addTagChannel, getTagsChannel, tagListElement) {
        const tagInput = document.getElementById("add-tag-input")
        const tagName = tagInput.value
        const trackId = event.target.getAttribute("data-track-id")
        await addTagChannel.send({trackId: trackId, tag: tagName})
        const tags = await getTagsChannel.send({trackId: trackId})
        tagListElement.load(trackId, tags)
        // this.addListener() # possibly the event listener remains after replcing the taglist
    }
}