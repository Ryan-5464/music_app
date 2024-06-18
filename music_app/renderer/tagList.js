class TagList {

    constructor() {
        this.rightSidebarEventHandler = new RightSidebarEventHandler()
    }

    loadTags(track) {
        const element = document.createElement("div")
        element.id = "tag-list"
        for (const tagName in track.tags) {
            element.appendChild(this.createTag(tagName, track.track_id))
        }
        return element        
    }

    createTag(tagName, trackId) {
        const element = document.createElement("div")
        element.setAttribute("data-track-id", trackId)
        element.classList.add("tag")
        element.appendChild(this.addTagName(tagName))
        element.appendChild(this.addDeleteButton(trackId))
        return element
    }

    addTagName(tagName) {
        const element = document.createElement("div")
        element.classList.add("tag-name")
        element.textContent = tagName
        return element
    }

    addDeleteButton(trackId) {
        const element = document.createElement("button")
        element.setAttribute("data-track-id", trackId)
        element.textContent = "Del"
        element.classList.add("right-rounded-button")
        this.rightSidebarEventHandler.addDeleteTagEventListener(element)
        return element
    }
}