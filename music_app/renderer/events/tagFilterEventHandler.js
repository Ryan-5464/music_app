class TagFilterEventHandler {

    constructor() {
        this.channel = new Channel("fetch-tracks-by-tag--send", "fetch-tracks-by-tag--receive")
        this.handleTagFilter = this.handleTagFilter.bind(this)
    }

    addTagFilterEventListener() {
        const input = document.getElementById("tag-filter-input")
        input.removeEventListener("input", this.handleTagFilter)
        input.addEventListener("input", this.handleTagFilter)
    }

    async handleTagFilter() {
        const input = document.getElementById("tag-filter-input")
        const tagString = input.value
        const tags = tagString.split(',').map(tag => tag.trim())
        const anyButton = document.getElementById("tag-filter-any-button")
        const anyButtonActive = anyButton.classList.contains("active")
        const tracks = await this.channel.send({tags: tags, anyButtonActive: anyButtonActive})
        const trackList = new TrackList()
        trackList.loadTracks(tracks)
    }

    addAnyButtonEventListener() {
        const anyButton = document.getElementById("tag-filter-any-button")
        anyButton.addEventListener("click", () => {
            const anyButton = document.getElementById("tag-filter-any-button")
            const allButton = document.getElementById("tag-filter-all-button")
            if (anyButton.classList.contains("active")) {
                return 
            }
            allButton.classList.remove("active")
            anyButton.classList.add("active")
            this.handleTagFilter()
        })
    }

    addAllButtonEventListener() {
        const allButton = document.getElementById("tag-filter-all-button")
        allButton.addEventListener("click", () => {
            const anyButton = document.getElementById("tag-filter-any-button")
            const allButton = document.getElementById("tag-filter-all-button")
            if (allButton.classList.contains("active")) {
                return 
            }
            anyButton.classList.remove("active")
            allButton.classList.add("active")
            this.handleTagFilter()
        })
    }

}