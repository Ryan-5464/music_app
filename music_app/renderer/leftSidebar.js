class LeftSidebar {

    loadContent() {
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
        button.textContent = "Download"
        return button
    }

    addPlaylistsButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-playlists-button"
        button.textContent = "Playlists"
        return button
    }

    addTagFilterButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-tag-filter-button"
        button.textContent = "Tag Filter"
        return button
    }

    addSearchButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-search-button"
        button.textContent = "Search"
        return button
    }

    addRecentlyDeletedButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-recently-deleted-button"
        button.textContent = "Recently Deleted"
        return button
    }

}



