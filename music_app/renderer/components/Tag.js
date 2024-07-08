import { dataController } from "../../renderer.js"





export function createTagElement(tagName) {

    const container = createContainer()
    container.appendChild(createTagName(tagName))
    return container
}





export function createTrackTagElement(tagName, trackId) {

    const container = createContainer()
    container.setAttribute("data-track-id", trackId)
    container.appendChild(createTagName(tagName))
    container.appendChild(createDeleteButton(tagName, trackId))
    return container
}





function createContainer() {
    
    const container = document.createElement("div")
    container.classList.add("tag")
    return container
}





function createTagName(_tagName) {

    const tagName = document.createElement("div")
    tagName.classList.add("tag-name")
    tagName.textContent = _tagName
    return tagName
}





function createDeleteButton(tagName, trackId) {

    const button = createButton(null, ["delete-tag-button"], {"data-track-id": trackId, "data-tag-name": tagName}, "./images/delete-32.png", 14, 14)
    addDeleteButtonEventListener(button, tagName, trackId)
    return button    
}





function addDeleteButtonEventListener(button, tagName, trackId) {

    button.addEventListener("click", 
        async () => {
            await dataController.deleteTag(tagName, trackId)
            button.parentElement.remove()
        }
    )
}



