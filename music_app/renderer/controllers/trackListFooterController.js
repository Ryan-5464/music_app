class TrackListFooterController {

}

class TrackListFooterElements {

    constructor() {
        this.downloadBarElement = new DownloadBarElement()
        this.searchFilterElement = new SearchFilterElement()
        this.tagFilterElement = new TagFilterElement()
    }

    load() {
    }

    createContainer() {
    }
}

class DownloadBarElement {

    create() {
        const element = document.createElement("div")
        element.id = "download-bar-element"
        element.appendChild(this.addInputBox())
        element.appendChild(this.addDownloadButton())
        element.appendChild(this.addDownloadMessage())
        return element
    }

    addInputBox() {
        const input = document.createElement("input")
        input.id = "download-bar-input"
        input.classList.add("input-bar")
        input.placeholder = "Enter a valid Youtube URL."
        return input
    }
        
    addDownloadButton() {
        const button = document.createElement("button")
        button.id = "download-bar-button"
        button.textContent = "Download"
        return button
        }
        
    addDownloadMessage() {
        const element = document.createElement("div")
        element.id = "download-message"
        element.classList.add("message")
        element.textContent = ""
        return element
    }
   
}

class SearchFilterElement {

    create() {
        const element = document.createElement("div")
        element.id = "search-filter"
        element.appendChild(this.addFilterInput())
        element.appendChild(this.addByTitleButton())
        element.appendChild(this.addByArtistButton())
        element.appendChild(this.addSearchFilterText())
        return element
    }

    addFilterInput() {
        const element = document.createElement("input")
        element.id = "search-filter-input"
        element.classList.add("input-bar")
        element.classList.add("input-box")
        return element
    }

    addByTitleButton() {
        const element = document.createElement("button")
        element.id = "search-filter-bytitle-button"
        element.textContent = "By Title"
        element.classList.add("active")
        return element
    }

    addByArtistButton() {
        const element = document.createElement("button")
        element.id = "search-filter-byartist-button"
        element.textContent = "By Artist"
        return element
    }

    addSearchFilterText() {
        const element = document.createElement("div")
        element.id = "search-filter-text"
        element.classList.add("message")
        element.textContent = "."
        return element
    }

}

class TagFilterElement {

    create() {
        const element = document.createElement("div")
        element.id = "tag-filter"
        element.appendChild(this.addFilterInput())
        element.appendChild(this.addAnyButton())
        element.appendChild(this.addAllButton())
        element.appendChild(this.addTagFilterText())
        return element
    }

    addFilterInput() {
        const element = document.createElement("input")
        element.id = "tag-filter-input"
        element.classList.add("input-bar")
        element.classList.add("input-box")
        return element
    }

    addAnyButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-any-button"
        element.classList.add("active")
        element.textContent = "Any of"
        return element
    }

    addAllButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-all-button"
        element.textContent = "All of"
        return element
    }

    addTagFilterText() {
        const element = document.createElement("div")
        element.id = "tag-filter-text"
        element.classList.add("message")
        element.textContent = "Spaces are allowed. Seperate tags by comma."
        return element
    }

}

