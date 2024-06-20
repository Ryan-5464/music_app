
class Channels {

    constructor() {
        this.getTrackByIdChannel = new Channel("get-track-by-id--send", "get-track-by-id--receive")
        this.addTagChannel = new Channel("add-tag--send", "add-tag--receive")
        this.deleteTagChannel = new Channel("delete-tag--send", "delete-tag--receive")
        this.getTagsChannel = new Channel("get-tags--send", "get-tags--receive")
        this.downloadTrackChannel = new Channel("download-track--send", "download-track--receive")
        this.tagFilterChannel = new Channel("fetch-tracks-by-tag--send", "fetch-tracks-by-tag--receive")
        this.searchFilterChannel = new Channel("fetch-tracks-by-search--send", "fetch-tracks-by-search--receive")
    }
}