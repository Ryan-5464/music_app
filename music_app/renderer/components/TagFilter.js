import { Tracklist } from "./Track.js"
import { dataController } from "../../renderer.js"



export class TagFilterElement {

    static create() {
        const container = TagFilterElement._addContainer()
        container.appendChild(TagFilterElement._addFilterInput())
        container.appendChild(TagFilterElement._addAnyButton())
        container.appendChild(TagFilterElement._addAllButton())
        // container.appendChild(TagFilterElement.addSaveAsPlaylistButton())
        return container
    }

    static _addContainer() {
        const container = document.createElement("div")
        container.id = "tag-filter-container"
        container.classList.add("hidden", "element-container")
        return container
    }

    static _addFilterInput() {
        const element = document.createElement("input")
        element.id = "tag-filter-input"
        element.classList.add("input-bar")
        element.classList.add("input-box")
        element.placeholder = "Spaces are allowed. Seperate tags by comma."
        element.addEventListener("input", TagFilterEvents.handleTagFilter)
        return element
    }

    static _addAnyButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-any-button"
        element.classList.add("toggle-button-active", "toggle-button")
        element.textContent = "Any of"
        element.addEventListener("click", TagFilterEvents.handleAnyButton)
        return element
    }

    static _addAllButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-all-button"
        element.classList.add("toggle-button")
        element.textContent = "All of"
        element.addEventListener("click", TagFilterEvents.handleAllButton)
        return element
    }

    // static addSaveAsPlaylistButton() {
    //     const element = document.createElement("button")
    //     element.id = "tag-filter-save-as-playlist-button"
    //     element.textContent = "Save as playlist"
    //     return element
    // }

}


class TagFilterEvents {


    static async handleTagFilter() {
        await dataController.updateTrackDataByTags(parseTagFilterInput(), isAnyButtonActive())
        Tracklist.reloadTracklist()
    }

    static async handleAnyButton() {
        toggleAnyButton()
        await dataController.updateTrackDataByTags(parseTagFilterInput(), isAnyButtonActive())
        Tracklist.reloadTracklist()
    }

    static async handleAllButton() {
        toggleAllButton()
        await dataController.updateTrackDataByTags(parseTagFilterInput(), isAnyButtonActive())
        Tracklist.reloadTracklist()
    }
}

function parseTagFilterInput() {
    const input = document.getElementById("tag-filter-input")
    let tagString = input.value
    if (!tagString.includes(",")) {
        tagString = tagString + ","
    }
    let tags = tagString.split(',').map(tag => tag.trim()) 
    tags = tags.filter(element => element !== "")
    console.log(tags)
    return tags  
}

function isAnyButtonActive() {
    const anyButton = document.getElementById("tag-filter-any-button")
    return  anyButton.classList.contains("toggle-button-active", "toggle-button")
}

function toggleAnyButton() {
    const anyButton = document.getElementById("tag-filter-any-button")
    const allButton = document.getElementById("tag-filter-all-button")
    if (anyButton.classList.contains("toggle-button-active")) {
        return 
    }
    allButton.classList.remove("toggle-button-active")
    anyButton.classList.add("toggle-button-active")
}

function toggleAllButton() {
    const anyButton = document.getElementById("tag-filter-any-button")
    const allButton = document.getElementById("tag-filter-all-button")
    if (allButton.classList.contains("toggle-button-active")) {
        return 
    }
    anyButton.classList.remove("toggle-button-active")
    allButton.classList.add("toggle-button-active")
}