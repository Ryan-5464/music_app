class RightSidebarController {

    constructor(channels) {
        this.channels = channels 
        this.rightSidebarElements = new RightSidebarElements()
        this.rightSidebarFunctions = new RightSidebarFunctions()
        this.handleAddTag = this.handleAddTag.bind(this)
        this.handleDeleteTag = this.handleDeleteTag.bind(this)
    }

    async renderContent() {
        const trackId = this.rightSidebarFunctions.getActiveTrackId()
        const tags = await this.rightSidebarFunctions.getTags(trackId, this.channels.getTagsChannel)
        this.rightSidebarElements.load(trackId, tags)
    }

    addTrackEventListener() {
        const trackList = document.getElementById("track-list")
        trackList.addEventListener("click", async (event) => {
            if (!event.target.classList.contains("track")) {
                return
            }
            await this.renderContent()
            this.addEventListeners()
        })
    }

    addEventListeners() {
        this.addAddTagButtonEventListener()
        this.addDeleteTagEventListener()
    }

    addAddTagButtonEventListener() {
        const element = document.getElementById("add-tag-button")
        element.addEventListener("click", this.handleAddTag)
    }

    addDeleteTagEventListener() {
        const element = document.getElementById("tag-list")
        element.addEventListener("click", this.handleDeleteTag)
    }

    async handleAddTag() {
        console.log("trig")
        const addTagInput = document.getElementById("add-tag-input")
        const tagName = addTagInput.value
        const element = document.getElementById("add-tag-button")
        const trackId = element.getAttribute("data-track-id")
        await this.channels.addTagChannel.send({trackId: trackId, tagName: tagName})
        console.log("complete")
        await this.renderContent()
        this.addEventListeners()
    }

    async handleDeleteTag(event) {
        console.log("trig")
        if (!event.target.classList.contains("delete-tag-button")) {
            return
        }
        const trackId = event.target.getAttribute("data-track-id")
        const tagName = event.target.getAttribute("data-tag-name")
        console.log(trackId, tagName)
        await this.channels.deleteTagChannel.send({trackId: trackId, tagName: tagName})
        console.log("complete")
        await this.renderContent()
        this.addEventListeners()
    }

}


class RightSidebarElements {

    constructor() {
        this.tagListTitleElement = new TagListTitleElement()
        this.tagBarElement = new TagBarElement()
        this.tagListElement = new TagListElement()
    }

    load(trackId, tags) {
        const element = document.getElementById("right-sidebar-element")
        element.innerHTML = ""
        const container = this.createContainer()
        container.appendChild(this.tagListTitleElement.create())
        container.appendChild(this.tagBarElement.create(trackId))
        container.appendChild(this.tagListElement.create(trackId, tags))
        element.appendChild(container)
    }

    createContainer() {
        const element = document.createElement("div")
        element.id = "tag-content-container"
        return element
    }

}

class TagListTitleElement {

    create() {
        const element = document.createElement("div")
        element.id = "tag-list-title"
        element.classList.add("title")
        element.textContent = "Tag List"
        return element
    }
}

class TagBarElement {

    create(trackId) {
        const element = document.createElement("div")
        element.id = "tag-bar-element"
        element.appendChild(this.addAddTagInput())
        element.appendChild(this.addAddTagButton(trackId))
        return element
    }

    addAddTagInput() {
        const element = document.createElement("input")
        element.id = "add-tag-input"
        element.placeholder = "Enter tag name..."
        return element
    }

    addAddTagButton(trackId) {
        const element = document.createElement("div")
        element.id = "add-tag-button"
        element.setAttribute("data-track-id", trackId)
        element.classList.add("circle-button")
        element.textContent = "+"
        return element
    }


}

class TagListElement {

    create(trackId, tags) {
        const element = document.createElement("div")
        element.id = "tag-list"
        for (const tag of tags) {
            element.appendChild(this.addTag(tag.tag, trackId))
        }
        return element 
    }

    addTag(tagName, trackId) {
        const element = document.createElement("div")
        element.setAttribute("data-track-id", trackId)
        element.classList.add("tag")
        element.appendChild(this.addTagName(tagName))
        element.appendChild(this.addDeleteButton(trackId, tagName))
        return element
    }
    
    addTagName(tagName) {
        const element = document.createElement("div")
        element.classList.add("tag-name")
        element.textContent = tagName
        return element
    }

    addDeleteButton(trackId, tagName) {
        const element = document.createElement("button")
        element.setAttribute("data-track-id", trackId)
        element.setAttribute("data-tag-name", tagName)
        element.classList.add("delete-tag-button")
        element.textContent = "-"
        return element
    }
}

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