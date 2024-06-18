class RightSidebarEventHandler {

    constructor() {
        this.addChannel = new Channel("create-tag-send", "create-tag-receive")
        this.delChannel = new Channel("delete-tag-send", "delete-tag-receive")
        this.trackChannel = new Channel("fetch-track-by-trackid--send", "fetch-track-by-trackid--receive")
        this.handleAddTag = this.handleAddTag.bind(this)
        this.handleDeleteTag = this.handleDeleteTag.bind(this)
        this.rightSidebar = new RightSidebar()
    }

    addAddTagEventListener(element) {
        element.addEventListener("click", this.handleAddTag)
    }

    addDeleteTagEventListener(element) {
        element.addEventListener("click", this.handleDeleteTag)
    }

    async handleAddTag(event) {
        const trackId = event.target.getAttribute("data-track-id")
        const input = document.getElementById("add-tag-input")
        const tagName = input.value
        await this.addChannel.send({trackId: trackId, tag: tagName})
        const track = await this.trackChannel.send({trackId: trackId})
        this.rightSidebar.loadSidebar(track)
    }

    async handleDeleteTag(event) {
        const trackId = event.target.getAttribute("data-track-id")
        const parent = event.target.parentElement
        const tagName = parent.children[0].textContent
        await this.delChannel.send({trackId: trackId, tag: tagName})
        const track = await this.trackChannel.send({trackId: trackId})
        this.rightSidebar.loadSidebar(track)
    }
}