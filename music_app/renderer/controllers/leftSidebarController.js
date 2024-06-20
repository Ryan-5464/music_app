class LeftSidebarController {

    constructor(channels) {
        this.channels = channels
        this.leftSidebarElements = new LeftSidebarElements()
        this.leftSidebarFunctions = new LeftSidebarFunctions()
        this.leftSidebarEvents = new LeftSidebarEvents()
        this.trackListFooterElements = new TrackListFooterElements()
        this.trackListFooterController = new TrackListFooterController(channels)
        this.handleDownloadButton = this.handleDownloadButton.bind(this)
        this.handlePlaylistsButton = this.handlePlaylistsButton.bind(this)
        this.handleTagFilterButton = this.handleTagFilterButton.bind(this)
        this.handleSearchButton = this.handleSearchButton.bind(this)
        this.handleRecentlyDeletedButton = this.handleRecentlyDeletedButton.bind(this)
    }

    renderContent() {
        this.leftSidebarElements.load()
        this.addEventListeners()
    }

    addEventListeners() {
        console.log("hello")
        this.leftSidebarEvents.addToggleActiveMenuEventListeners()
        this.addDownloadButtonListener()
        this.addPlaylistsButtonListener()
        this.addTagFilterButtonListener()
        this.addSearchButtonListener()
        this.addRecentlyDeletedButtonListener()
    }

    addDownloadButtonListener() {
        const downloadButton = document.getElementById("left-sidebar-download-button")
        downloadButton.addEventListener("click", this.handleDownloadButton)
    }

    handleDownloadButton() {
        this.trackListFooterElements.loadDownloadBar()
        this.trackListFooterController.addDownloadBarEventListeners()
    }

    addPlaylistsButtonListener() {
        // Not implemented
    }

    handlePlaylistsButton() {
        //Not implemented
    }

    addTagFilterButtonListener() {
        const tagFilterButton = document.getElementById("left-sidebar-tag-filter-button")
        tagFilterButton.addEventListener("click", this.handleTagFilterButton)
    }

    handleTagFilterButton() {
        this.trackListFooterElements.loadTagFilter()
        this.trackListFooterController.addTagFilterEventListeners()
    }

    addSearchButtonListener() {
        const searchFilterButton = document.getElementById("left-sidebar-search-button")
        searchFilterButton.addEventListener("click", this.handleSearchButton)
    }

    handleSearchButton() {
        this.trackListFooterElements.loadSearchFilter()
        this.trackListFooterController.addSearchFilterEventListeners()
    }

    addRecentlyDeletedButtonListener() {
        // Not implemented
    }

    handleRecentlyDeletedButton() {
        // Not implemented
    }
}

class LeftSidebarEvents {
  
    addToggleActiveMenuEventListeners() {
        const menuElements = document.getElementsByClassName("menu-button")
        for (const menuElement of menuElements) {
            menuElement.addEventListener("click", this.handleToggleActiveMenu)
        }
    }

    handleToggleActiveMenu(event) {
        const menuElements = document.getElementsByClassName("menu-button")
        for (const menuElement of menuElements) {
            if (menuElement.classList.contains("active-menu")) {
                menuElement.classList.remove("active-menu")
            }
        }
        event.target.classList.add("active-menu")
    }

}

class LeftSidebarElements {

    load() {
        const element = document.getElementById("left-sidebar-element")
        element.appendChild(this.addDownloadButton())
        element.appendChild(this.addPlaylistsButton())
        element.appendChild(this.addTagFilterButton())
        element.appendChild(this.addSearchButton())
        element.appendChild(this.addRecentlyDeletedButton())
    }

    addDownloadButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-download-button"
        button.classList.add("menu-button")
        button.textContent = "Download"
        return button
    }

    addPlaylistsButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-playlists-button"
        button.classList.add("menu-button")
        button.textContent = "Playlists"
        return button
    }

    addTagFilterButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-tag-filter-button"
        button.classList.add("menu-button")
        button.textContent = "Tag Filter"
        return button
    }

    addSearchButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-search-button"
        button.classList.add("menu-button")
        button.textContent = "Search"
        return button
    }

    addRecentlyDeletedButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-recently-deleted-button"
        button.classList.add("menu-button")
        button.textContent = "Recently Deleted"
        return button
    }

}

class LeftSidebarFunctions {

}