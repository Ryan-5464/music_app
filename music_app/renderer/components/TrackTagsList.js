import { dataController } from "../../renderer.js"
import { createTrackTagElement } from "./Tag.js"
import { addTagsToTagsList } from "./TagsList.js"





export function createTrackTagsListElement(trackId) {

    const container = createContainer(trackId)
    container.appendChild(createSaveTagInputBox(trackId))
    for (const tag of dataContr)
    return container
}





function createContainer(trackId) {

    const container = document.createElement("div")
    container.id = `taglist-container-${trackId}`
    container.classList.add("taglist-container")
    return container
}





function createSaveTagInputBox(trackId) {
    const input = document.createElement("input")
    input.id = "save-tag-input"
    input.classList.add("input-bar")
    input.placeholder = "Enter tag name..."
    addSaveTagInputBoxEventListener(input, trackId)
    return input
}





function addSaveTagInputBoxEventListener(input, trackId) {

    input.addEventListener('keypress', 
        async (event) => {

            if (event.key === 'Enter') {
                const tagName = input.value
                if (tagName === '') {
                    return
                }

                await dataController.addTag(tagName, trackId)
                const trackTagsList = input.parentElement
                trackTagsList.appendChild(createTrackTagElement(tagName, trackId))
                updateTagsList()
            }
        }
    )
}

