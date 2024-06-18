class RightSidebar {

    constructor() {
        this.tagList = new TagList()
        this.rightSidebarEventHandler = new RightSidebarEventHandler()
    }

    loadSidebar(track) {
        console.log("load right sidebar")
        const rightSidebar = document.getElementById("right-sidebar-element")
        rightSidebar.innerHTML = ""
        const element = document.createElement("div")
        element.id = "tag-list-element"
        rightSidebar.appendChild(element)
        element.appendChild(this.addTagListTitle())
        const subElement = document.createElement("div")
        subElement.id = "tag-input-bar"
        subElement.appendChild(this.addAddTagInput())
        subElement.appendChild(this.addAddTagButton(track.track_id))
        element.appendChild(subElement)
        element.appendChild(this.tagList.loadTags(track))
    }

    addTagListTitle() {
        const element = document.createElement("div")
        element.id = "tag-list-title"
        element.classList.add("title")
        element.textContent = "Tag List"
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
        this.rightSidebarEventHandler.addAddTagEventListener(element)
        return element
    }

}