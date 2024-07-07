import { dataController } from "../../renderer.js"





export function createTagsListElement() {

    const container = createContainer()
    container.appendChild(createTitle())
    container.appendChild(createTagsList())
    return container
}





export function addTagsListEventListeners() {

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



// dataController.taglistData

function createTagsList() {
    const taglist = document.createElement("div")
    taglist.id = "tags-list"
    return taglist
}





function addTagsToTagsList(tags) {
    for (const tag of tags) {
        tags.appendChild(TagElement.create(tag.tag))
    }
}







export class ExistingTagsList {

    static create() {
        const container = ExistingTagsList._addContainer()
        container.appendChild(ExistingTagsList._addTitle())
        container.appendChild(ExistingTagsList._addTaglist())
        return container
    }

    static _addContainer() {
        const container = document.createElement("div")
        container.id = "existing-tags-list-container"
        container.classList.add("visible", "show-hide-element-container")
        return container
    }

    static _addTitle() {
        const title = document.createElement("div")
        title.id = "existing-tags-title"
        title.classList.add("title")
        title.textContent = "Tags"
        return title
    }

    static _addTaglist() {
        const taglist = document.createElement("div")
        taglist.id = "existing-tags-list"
        for (const tag of dataController.taglistData) {
            taglist.appendChild(TagElement.create(tag.tag))
        }
        return taglist
    }

    static addTagToTaglist() {
        const taglist = document.getElementById("existing-tags-list") 
        taglist.innerHTML = ''
        for (const tag in dataController.taglistData) {
            taglist.appendChild(TagElement.create(tag.tag))
        }  
    }

}

class TagElement {

    static create(tagName) {
        const container = this._addContainer()
        container.appendChild(this._addTagName(tagName))
        return container 
    }

    static _addContainer() {
        const container =  document.createElement("div")
        container.classList.add("tag")
        return container
    }

    static _addTagName(tagName) {
        const element = document.createElement("div")
        element.classList.add("tag-name")
        element.textContent = tagName
        return element
    }

}