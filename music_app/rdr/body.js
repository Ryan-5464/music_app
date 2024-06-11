class Body {

    makeElement() {
        const bodyElement = document.createElement("div")
        bodyElement.id = "body-element"
        bodyElement.appendChild(this.addHeaderElement())
        bodyElement.appendChild(this.addLeftSidebarElement())
        bodyElement.appendChild(this.addCentreContainerElement())
        bodyElement.appendChild(this.addRightSidebarElement())
        bodyElement.appendChild(this.addFooterElement())
        return bodyElement
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