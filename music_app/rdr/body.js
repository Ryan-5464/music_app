class Main {

    makeElement() {
        const mainElement = document.createElement("div")
        mainElement.id = "main-element"
        mainElement.appendChild(this.addHeaderElement())
        mainElement.appendChild(this.addLeftSidebarElement())
        mainElement.appendChild(this.addCentreContainerElement())
        mainElement.appendChild(this.addRightSidebarElement())
        mainElement.appendChild(this.addFooterElement())
        return mainElement
    }

    addHeaderElement() {
        const headerElement = document.createElement("div")
        headerElement.id = "header-element"
        return headerElement
    }

    addLeftSidebarElement() {
        const leftSidebarElement = document.createElement("div")
        leftSidebarElement.id = "left-sidebar-element"
        return leftSidebarElement
    }

    addCentreContainerElement() {
        const centreContainerElement = document.createElement("div")
        centreContainerElement.id = "centre-container-element"
        return centreContainerElement
    }

    addRightSidebarElement() {
        const rightSidebarElement = document.createElement("div")
        rightSidebarElement.id = "right-sidebar-element"
        return rightSidebarElement
    }

    addFooterElement() {
        const footerElement = document.createElement("div")
        footerElement.id = "footer-element"
        return footerElement
    }

}