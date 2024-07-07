import { Tracklist } from "./Track.js"
import { dataController } from "../../renderer.js"





export function createSearchFilterElement() {

    const container = createContainer()
    container.appendChild(createInputBox())
    return container
}





export function addSearchFilterEventListeners() {

    addSearchFilterInputBoxEventListener()
}





function createContainer() {

    const container = document.createElement("div")
    container.id = "search-filter-container"
    container.classList.add("hidden", "show-hide-element-container")
    return container
}





function createInputBox() {

    const input = document.createElement("input")
    input.id = "search-filter-input-box"
    input.placeholder = "Enter track title..."
    return input
}





function addSearchFilterInputBoxEventListener() {

    const input = document.getElementById("search-filter-input-box")
    input.addEventListener("input", 
        async () => {
            
            await dataController.updateTrackDataBySearch(input.value)
            Tracklist.reloadTracklist()
        }
    )
}

