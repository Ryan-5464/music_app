export class RightSidebarElements {

    constructor() {
        this.tagListTitleElement = new TagListTitleElement()
        this.tagBarElement = new TagBarElement()
        this.tagListElement = new TagListElement()
    }

    load(trackId, tags) {
        const element = document.getElementById("right-sidebar-element")
        element.innerHTML = ""
        const container = this.createContainer()
        container.appendChild(this.tagListTitleElement.create())
        container.appendChild(this.tagBarElement.create(trackId))
        container.appendChild(this.tagListElement.create(trackId, tags))
        element.appendChild(container)
    }

    createContainer() {
        const element = document.createElement("div")
        element.id = "tag-content-container"
        return element
    }

}

class TagListTitleElement {

    create() {
        const element = document.createElement("div")
        element.id = "tag-list-title"
        element.classList.add("title")
        element.textContent = "Tag List"
        return element
    }
}

class TagBarElement {

    create(trackId) {
        const element = document.createElement("div")
        element.id = "tag-bar-element"
        element.appendChild(this.addAddTagInput())
        element.appendChild(this.addAddTagButton(trackId))
        return element
    }

    addAddTagInput() {
        const element = document.createElement("input")
        element.id = "add-tag-input"
        element.placeholder = "Enter tag name..."
        return element
    }

    addAddTagButton(trackId) {
        const element = document.createElement("div")
        element.id = "add-tag-button"
        element.setAttribute("data-track-id", trackId)
        element.classList.add("right-rounded-button")
        element.textContent = "Add"
        return element
    }


}

class TagListElement {

    create(trackId, tags) {
        const element = document.createElement("div")
        element.id = "tag-list"
        for (const tag in tags) {
            element.appendChild(this.addTag(tag, trackId))
        }
        return element 
    }

    addTag(tagName, trackId) {
        const element = document.createElement("div")
        element.setAttribute("data-track-id", trackId)
        element.classList.add("tag")
        element.appendChild(this.addTagName(tagName))
        element.appendChild(this.addDeleteButton(trackId, tagName))
        return element
    }
    
    addTagName(tagName) {
        const element = document.createElement("div")
        element.classList.add("tag-name")
        element.textContent = tagName
        return element
    }

    addDeleteButton(trackId, tagName) {
        const element = document.createElement("button")
        element.setAttribute("data-track-id", trackId)
        element.setAttribute("data-tag-name", tagName)
        element.classList.add("delete-tag-button")
        element.textContent = "Del"
        element.classList.add("right-rounded-button")
        return element
    }
}