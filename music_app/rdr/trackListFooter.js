class TrackListFooter {

    loadContent() {
        const element = document.getElementById("track-list-footer-element")
        element.appendChild(this.addSubElement())
        const subElement = document.getElementById("track-list-footer-sub-element")
        subElement.appendChild(this.addDownloadBar())
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

}