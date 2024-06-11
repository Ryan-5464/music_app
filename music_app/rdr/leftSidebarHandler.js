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
        return button
    }

    addPlaylistsButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-playlists-button"
        return button
    }

    addTagFilterButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-tag-filter-button"
        return button
    }

    addAllTracksButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-all-tracks-button"
        return button
    }

    addRecentlyDeletedButton() {
        const button = document.createElement("button")
        button.id = "left-sidebar-recently-deleted-button"
        return button
    }

}



