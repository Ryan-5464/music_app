class LeftSidebarHandler {

    loadContent() {
        const leftSidebarElement = document.getElementById("left-sidebar-element")
        leftSidebarElement.appendChild(this.addDownloadButton())
        leftSidebarElement.appendChild(this.addPlaylistsButton())
        leftSidebarElement.appendChild(this.addTagFilterButton())
        leftSidebarElement.appendChild(this.addAllTracksButton())
        leftSidebarElement.appendChild(this.addRecentlyDeletedButton())
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

    addAllTracksButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-all-tracks-button"
        button.textContent = "All Tracks"
        return button
    }

    addRecentlyDeletedButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-recently-deleted-button"
        button.textContent = "Delete Tracks"
        return button
    }

}



