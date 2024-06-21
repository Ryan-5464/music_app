class TrackListFooterController {

    constructor(channels) {
        this.channels = channels
        this.trackListController = new TrackListController(channels)
        this.handleDownload = this.handleDownload.bind(this)
        this.handleTagFilter = this.handleTagFilter.bind(this)
        this.handleSearchFilter = this.handleSearchFilter.bind(this)
    }

    addDownloadBarEventListeners() {
        const button = document.getElementById("download-bar-button")
        button.addEventListener("click", this.handleDownload)
    }

    async handleDownload() {
        const input = document.getElementById("download-bar-input")
        const downloadUrl = input.value
        const downloadMessage = await this.channels.downloadTrackChannel.send({url: downloadUrl})
        const downloadMessageElement = document.getElementById("download-message")
        downloadMessageElement.textContent = downloadMessage
        this.trackListController.renderAllTracks()
    }

    addTagFilterEventListeners() {
        const input = document.getElementById("tag-filter-input")
        input.addEventListener("input", this.handleTagFilter)
        this.addAnyButtonEventListener()
        this.addAllButtonEventListener()
    }

    async handleTagFilter() {
        const input = document.getElementById("tag-filter-input")
        let tagString = input.value
        // if (!tagString.includes(",")) {
        //     tagString = tagString + ","
        // }
        const tags = tagString.split(',').map(tag => tag.trim())
        const anyButton = document.getElementById("tag-filter-any-button")
        const anyButtonActive = anyButton.classList.contains("active")
        const tracks = await this.channels.tagFilterChannel.send({tags: tags, anyButtonActive: anyButtonActive})
        console.log("triggered")
        this.trackListController.renderTracks(tracks)
    }

    addAnyButtonEventListener() {
        const anyButton = document.getElementById("tag-filter-any-button")
        anyButton.addEventListener("click", async () => {
            console.log("any")
            const anyButton = document.getElementById("tag-filter-any-button")
            const allButton = document.getElementById("tag-filter-all-button")
            if (anyButton.classList.contains("active")) {
                return 
            }
            allButton.classList.remove("active")
            anyButton.classList.add("active")
            await this.handleTagFilter()
        })
    }

    addAllButtonEventListener() {
        const allButton = document.getElementById("tag-filter-all-button")
        allButton.addEventListener("click", async () => {
            console.log("all")
            const anyButton = document.getElementById("tag-filter-any-button")
            const allButton = document.getElementById("tag-filter-all-button")
            if (allButton.classList.contains("active")) {
                return 
            }
            anyButton.classList.remove("active")
            allButton.classList.add("active")
            await this.handleTagFilter()
        })
    }

    addSearchFilterEventListeners() {
        const input = document.getElementById("search-filter-input")
        input.addEventListener("input", this.handleSearchFilter)
    }

    async handleSearchFilter() {
        const input = document.getElementById("search-filter-input")
        const searchString = input.value
        const byTitleButton = document.getElementById("search-filter-bytitle-button")
        const byTitleButtonActive = byTitleButton.classList.contains("active")
        const tracks = await this.channels.searchFilterChannel.send({searchString: searchString, byTitleButtonActive: byTitleButtonActive})
        this.trackListController.renderTracks(tracks)
    }

    addByTitleButtonEventListener() {
        const byTitleButton = document.getElementById("search-filter-bytitle-button")
        byTitleButton.addEventListener("click", () => {
            const byTitleButton = document.getElementById("search-filter-bytitle-button")
            const byArtistButton = document.getElementById("search-filter-byartist-button")
            if (byTitleButton.classList.contains("active")) {
                return 
            }
            byArtistButton.classList.remove("active")
            byTitleButton.classList.add("active")
            this.handleSearchFilter()
        })
    }

    addByArtistButtonEventListener() {
        const byArtistButton = document.getElementById("search-filter-byartist-button")
        byArtistButton.addEventListener("click", () => {
            const byTitleButton = document.getElementById("search-filter-bytitle-button")
            const byArtistButton = document.getElementById("search-filter-byartist-button")
            if (byArtistButton.classList.contains("active")) {
                return 
            }
            byTitleButton.classList.remove("active")
            byArtistButton.classList.add("active")
            this.handleSearchFilter()
        })
    }
}

class TrackListFooterElements {

    constructor() {
        this.downloadBarElement = new DownloadBarElement()
        this.searchFilterElement = new SearchFilterElement()
        this.tagFilterElement = new TagFilterElement()
    }

    load() {
        this.loadDownloadBar()
    }    
    
    loadBlank() {
        const element = document.getElementById("track-list-footer-element")
        element.innerHTML = ""
    }
    
    loadDownloadBar() {
        const element = document.getElementById("track-list-footer-element")
        element.innerHTML = ""
        element.appendChild(this.createContainer())
        const container = document.getElementById("track-list-footer-sub-element")
        container.appendChild(this.downloadBarElement.create())
    }

    loadTagFilter() {
        const element = document.getElementById("track-list-footer-element")
        element.innerHTML = ""
        element.appendChild(this.createContainer())
        const container = document.getElementById("track-list-footer-sub-element")
        container.appendChild(this.tagFilterElement.create())
    }

    loadSearchFilter() {
        const element = document.getElementById("track-list-footer-element")
        element.innerHTML = ""
        element.appendChild(this.createContainer())
        const container = document.getElementById("track-list-footer-sub-element")
        container.appendChild(this.searchFilterElement.create())
    }

    createContainer() {
        const element = document.createElement("div")
        element.id = "track-list-footer-sub-element"
        return element
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
        element.appendChild(this.addSaveAsPlaylistButton())
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

    addSaveAsPlaylistButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-save-as-playlist-button"
        element.textContent = "Save as playlist"
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

