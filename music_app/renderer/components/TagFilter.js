import { Tracklist } from "./Track.js"
import { dataController } from "../../renderer.js"





export function createTagFilterElement() {

    const container = createContainer()
    container.appendChild(createInputBox())
    container.appendChild(createAnyButton())
    container.appendChild(createAllButton())
    return container
}





export function addTagFilterEventListeners() {

    addTagFilterInputEventListener()
    addAnyButtonEventListener()
    addAllButtonEventListener()
}





function createContainer() {

    const container = document.createElement("div")
    container.id = "tag-filter-container"
    container.classList.add("hidden", "show-hide-element-container")
    return container
}





function createInputBox() {

    const input = document.createElement("input")
    input.id = "tag-filter-input-box"
    input.placeholder = "Enter tag name. Seperate tags by comma..." 
    return input
}





function createAnyButton() {

    const btn = document.createElement("button")
    btn.id = "tag-filter-any-button"
    btn.classList.add("toggle-button-active", "toggle-button")
    btn.textContent = "Any of"
    return btn
}





function createAllButton() {

    const btn = document.createElement("button")
    btn.id = "tag-filter-all-button"
    btn.classList.add("toggle-button")
    btn.textContent = "All of"
    return btn
}





// function createSaveAsPlaylistButton() {
//     const btn = document.createElement("button")
//     btn.id = "tag-filter-save-as-playlist-button"
//     btn.textContent = "Save as playlist"
//     return btn
// }





function addTagFilterInputEventListener() {

    const input = document.getElementById("tag-filter-input-box")
    const anyBtn = document.getElementById("tag-filter-any-button")
    input.addEventListener("input", 
        async () => {

            await dataController.updateTrackDataByTags(parseTagFilterInput(input), isAnyButtonActive(anyBtn))
            Tracklist.reloadTracklist()
        }
    )
}





function addAnyButtonEventListener() {

    const input = document.getElementById("tag-filter-input-box")
    const anyBtn = document.getElementById("tag-filter-any-button")
    const allBtn = document.getElementById("tag-filter-all-button")
    const btn = document.getElementById("tag-filter-any-button")
    btn.addEventListener("click", 
        async () => {

            toggleAnyButton(anyBtn, allBtn)
            await dataController.updateTrackDataByTags(parseTagFilterInput(input), isAnyButtonActive(anyBtn))
            Tracklist.reloadTracklist()
        }
    )
}





function addAllButtonEventListener() {

    const input = document.getElementById("tag-filter-input-box")
    const anyBtn = document.getElementById("tag-filter-any-button")
    const allBtn = document.getElementById("tag-filter-all-button")
    const btn = document.getElementById("tag-filter-all-button")
    btn.addEventListener("click", 
        async () => {

            toggleAllButton(anyBtn, allBtn)
            await dataController.updateTrackDataByTags(parseTagFilterInput(input), isAnyButtonActive(anyBtn))
            Tracklist.reloadTracklist()
        }
    )
}





function parseTagFilterInput(input) {

    let tagString = input.value
    if (!tagString.includes(",")) {
        tagString = tagString + ","
    }
    let tags = tagString.split(',').map(tag => tag.trim()) 
    tags = tags.filter(element => element !== "")
    return tags  
}





function isAnyButtonActive(btn) {

    return  btn.classList.contains("toggle-button-active", "toggle-button")
}





function toggleAnyButton(anyBtn, allBtn) {

    if (anyBtn.classList.contains("toggle-button-active")) {
        return 
    }
    allBtn.classList.remove("toggle-button-active")
    anyBtn.classList.add("toggle-button-active")
}





function toggleAllButton(anyBtn, allBtn) {

    if (allBtn.classList.contains("toggle-button-active")) {
        return 
    }
    anyBtn.classList.remove("toggle-button-active")
    allBtn.classList.add("toggle-button-active")
}