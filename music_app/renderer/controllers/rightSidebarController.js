import { TagListElement } from "../elements/tagListElement"
import { RightSidebarFunctions } from "../functions/rightSidebarFunctions"



export class RightSidebarController {

    constructor(channels) {
        this.channels = channels 
        this.rightSidebarElements = new RightSidebarElements()
        this.rightSidebarFunctions = new RightSidebarFunctions()
        this.rightSidebarEvents = new this.rightSidebarEvents()
    }

    async renderContent() {
        const trackId = this.rightSidebarFunctions.getActiveTrackId()
        const tags = await this.rightSidebarFunctions.getTags(trackId, this.channels.getTagsChannel)
        this.rightSidebarElements.load(trackId, tags)
    }

    addEventListeners() {
        this.addAddTagButtonEventListener()
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
        const addTagInput = document.getElementById("add-tag-input")
        const tagName = addTagInput.value
        const element = document.getElementById.apply("add-tag-button")
        const trackId = element.getAttribute("data-track-id")
        await this.channels.addTagChannel.send({trackId: trackId, tagName: tagName})
        this.renderContent()
    }

    async handleDeleteTag(event) {
        if (!event.target.classList.contains("delete-tag-button")) {
            return
        }
        const trackId = event.target.getAttribute("data-track-id")
        const tagName = event.target.getAttribute("data-tag-name")
        await this.channels.deleteTagChannel.send({trackId: trackId, tagName: tagName})
        this.renderContent()
    }

    addTrackEventListener() {
        const trackList = document.getElementById("track-list")
        trackList.addEventListener("click", (event) => {
            if (!event.target.classList.contains("track")) {
                return
            }
            this.renderContent()
        })
    }

}