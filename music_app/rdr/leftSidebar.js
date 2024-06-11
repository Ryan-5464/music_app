import { CentreDisplayController } from "./centreDisplayController.js"



export class LeftSidebar {

    constructor() {
        this.centreDisplayController = new CentreDisplayController()
    }

    createElement() {
        const div = document.createElement("div")
        div.id = "left-sidebar"
        div.appendChild(this.addPlaylistsButton())
        div.appendChild(this.addAllTracksButton())
        div.appendChild(this.addTagFilterButton())
        return div
    }

    addAllTracksButton() {
        const button = document.createElement("button")
        button.id = "all-tracks-button"
        button.addEventListener("click", () => {
            this.centreDisplayController.displayAllTracks()
        })
        return button
    }

    addTagFilterButton() {
        const button = document.createElement("button")
        button.id = "tag-filter-button"
        button.addEventListener("click", () => {
            this.centreDisplayController.displayAllTracks()
            this.centreDisplayController.displayTagFilter()
        })
        return button
    }

}