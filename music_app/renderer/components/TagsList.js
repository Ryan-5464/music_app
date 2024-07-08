import { createTagElement } from "./Tag.js"





export function createTagsListElement() {

    const container = createContainer()
    container.appendChild(createTitle())
    container.appendChild(createTagsList())
    return container
}





export function addTagsToTagsList(tags) {

    const tagsList = document.getElementById("tags-list") 
    tagsList.innerHTML = ''
    for (const tag of tags) {
        tagsList.appendChild(createTagElement(tag.tag))
    }
}





function createContainer() {

    const container = document.createElement("div")
    container.id = "tags-list-container"
    container.classList.add("visible", "show-hide-element-container")
    return container
}





function createTitle() {

    const title = document.createElement("div")
    title.id = "tags-list-title"
    title.textContent = "Tags"
    return title
}





function createTagsList() {

    const taglist = document.createElement("div")
    taglist.id = "tags-list"
    return taglist
}





