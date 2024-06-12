class TrackListFooter {

    loadContent() {
        const element = document.getElementById("track-list-footer-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-footer-sub-element")
        subElement.appendChild(this.addDownloadBar())
    }

    loadDownloadBar() {
        this.removeSubElement()
        const element = document.getElementById("track-list-footer-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-footer-sub-element")
        subElement.appendChild(this.addDownloadBar())
    }

    loadTagFilter() {
        this.removeSubElement()
        const element = document.getElementById("track-list-footer-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-footer-sub-element")
        subElement.appendChild(this.addTagFilter())
    }

    loadSearchFilter() {
        this.removeSubElement()
        const element = document.getElementById("track-list-footer-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-footer-sub-element")
        subElement.appendChild(this.addSearchFilter())
    }

    addSubElement() {
        const element = document.createElement("div")
        element.id = "track-list-footer-sub-element"
        return element
    }

    removeSubElement() {
        const element = document.getElementById("track-list-footer-sub-element")
        if (!element) {
            return
        }
        element.remove()
    }

    addDownloadBar() {
        const downloadBar = new DownloadBar()
        const element = downloadBar.makeElement()
        return element
    }

    addTagFilter() {
        const tagFilter = new TagFilter()
        const element = tagFilter.makeElement()
        return element
    }

    addSearchFilter() {
        const searchFilter = new SearchFilter()
        const element = searchFilter.makeElement()
        return element
    }

}