class Main {

    makeElement() {
        const element = document.createElement("div")
        element.id = "main-element"
        element.appendChild(this.addHeaderElement())
        element.appendChild(this.addLeftSidebarElement())
        element.appendChild(this.addTrackListElement())
        element.appendChild(this.addTrackListFooterElement())
        element.appendChild(this.addRightSidebarElement())
        element.appendChild(this.addFooterElement())
        return element
    }

    addHeaderElement() {
        const element = document.createElement("div")
        element.id = "header-element"
        return element
    }

    addLeftSidebarElement() {
        const element = document.createElement("div")
        element.id = "left-sidebar-element"
        return element
    }

    addTrackListElement() {
        const element = document.createElement("div")
        element.id = "track-list-element"
        return element
    }

    addTrackListFooterElement() {
        const element = document.createElement("div")
        element.id = "track-list-footer-element"
        return element
    }

    addRightSidebarElement() {
        const element = document.createElement("div")
        element.id = "right-sidebar-element"
        return element
    }

    addFooterElement() {
        const element = document.createElement("div")
        element.id = "footer-element"
        return element
    }

}