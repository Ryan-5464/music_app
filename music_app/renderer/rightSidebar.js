class RightSidebar {

    constructor() {
        this.tagList = new TagList()
    }

    loadSidebar(track) {
        console.log("load right sidebar")
        const rightSidebar = document.getElementById("right-sidebar-element")
        rightSidebar.innerHTML = ""
        const subElement = document.createElement("div")
        subElement.id = "tag-input-bar"
        subElement.appendChild(this.addAddTagInput())
        subElement.appendChild(this.addAddTagButton())
        rightSidebar.appendChild(subElement)
        rightSidebar.appendChild(this.tagList.loadTags(track))
    }

    addAddTagInput() {
        const element = document.createElement("div")
        element.id = "add-tag-input"
        return element
    }

    addAddTagButton() {
        const element = document.createElement("div")
        element.id = "add-tag-button"
        element.classList.add("right-rounded-button")
        return element
    }

}