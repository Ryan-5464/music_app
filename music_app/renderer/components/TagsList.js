import { dataController } from "../../renderer.js"
import { createTagElement } from "./Tag.js"





export function createTagsListElement() {

    const container = createContainer()
    container.appendChild(createTitle())
    container.appendChild(createTagsList())
    return container
}





export async function updateTagsList() {

    const tagsList = document.getElementById("tags-list") 
    tagsList.innerHTML = ''
    await dataController.updateTagsListData() 
    for (const tag of dataController.tagsListData) {
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





