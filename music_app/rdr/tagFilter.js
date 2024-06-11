import { Channel } from "./channel.js";



export class TagFilter {

    constructor() {
        this.channel = new Channel("fetch-tracks-by-tag--send", "fetch-track-by-tags--receive")
        this.element = null
    }

    makeElement() {
        const div = document.createElement("div")
        div.id = "tags-filter"
        div.appendChild(this.addFilterInput())
        this.element = div
    }

    addFilterInput() {
        const input = document.createElement("input")
        input.id = "tag-filter-input"
        input.classList.add("input-box")
        return input
    }

}