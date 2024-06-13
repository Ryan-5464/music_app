class Main {

    makeElement() {
        const element = document.createElement("div")
        element.id = "main-element"
        const mainSubElement = document.createElement("div")
        mainSubElement.id = "main-sub-element"
        const mainSubElement2 = document.createElement("div")
        mainSubElement2.id = "main-sub-element-2"
        element.appendChild(this.addHeaderElement())
        element.appendChild(mainSubElement)
        mainSubElement.appendChild(this.addLeftSidebarElement())
        mainSubElement.appendChild(mainSubElement2)
        mainSubElement2.appendChild(this.addTrackListElement())
        mainSubElement2.appendChild(this.addTrackListFooterElement())
        mainSubElement.appendChild(this.addRightSidebarElement())
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
        element.classList.add("frosted-glass")
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