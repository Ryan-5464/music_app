import { Tracklist } from "./Track.js"
import { dataController } from "../../renderer.js"



export class SearchFilterElement {

    static create() {
        const container = SearchFilterElement._addContainer()
        container.appendChild(SearchFilterElement._addFilterInput())
        return container
    }

    static _addContainer() {
        const container = document.createElement("div")
        container.id = "search-filter-container"
        container.classList.add("hidden", "element-container")
        return container
    }

    static _addFilterInput() {
        const element = document.createElement("input")
        element.id = "search-filter-input"
        element.classList.add("input-bar")
        element.classList.add("input-box")
        element.placeholder = "Enter song title..."
        element.addEventListener("input", SearchFilterEvents.handleSearchFilter)
        return element
    }

}


class SearchFilterEvents {


    static async handleSearchFilter() {
        const input = document.getElementById("search-filter-input")
        const searchString = input.value
        await dataController.updateTrackDataBySearch(searchString)
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
    return  anyButton.classList.contains("active")
}

function toggleAnyButton() {
    const anyButton = document.getElementById("tag-filter-any-button")
    const allButton = document.getElementById("tag-filter-all-button")
    if (anyButton.classList.contains("active")) {
        return 
    }
    allButton.classList.remove("active")
    anyButton.classList.add("active")
}

function toggleAllButton() {
    const anyButton = document.getElementById("tag-filter-any-button")
    const allButton = document.getElementById("tag-filter-all-button")
    if (allButton.classList.contains("active")) {
        return 
    }
    anyButton.classList.remove("active")
    allButton.classList.add("active")
}