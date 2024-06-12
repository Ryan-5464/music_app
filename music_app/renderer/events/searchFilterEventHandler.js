
class SearchFilterEventHandler {

    constructor() {
        this.channel = new Channel("fetch-tracks-by-search--send", "fetch-tracks-by-search--receive")
        this.handleSearchFilter = this.handleSearchFilter.bind(this)
    }

    addSearchFilterEventListener() {
        const input = document.getElementById("search-filter-input")
        input.removeEventListener("input", this.handleSearchFilter)
        input.addEventListener("input", this.handleSearchFilter)
    }

    async handleSearchFilter() {
        const input = document.getElementById("search-filter-input")
        const searchString = input.value
        const byTitleButton = document.getElementById("search-filter-bytitle-button")
        const byTitleButtonActive = byTitleButton.classList.contains("active")
        const tracks = await this.channel.send({searchString: searchString, byTitleButtonActive: byTitleButtonActive})
        const trackList = new TrackList()
        trackList.loadTracks(tracks)
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