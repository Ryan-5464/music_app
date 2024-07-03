
export class Channels {

    constructor() {
        this.getTrackByIdChannel = new Channel("get-track-by-id--send", "get-track-by-id--receive")
        this.addTagChannel = new Channel("add-tag--send", "add-tag--receive")
        this.deleteTagChannel = new Channel("delete-tag--send", "delete-tag--receive")
        this.getTagsChannel = new Channel("get-tags--send", "get-tags--receive")
        this.downloadTrackChannel = new Channel("download-track--send", "download-track--receive")
        this.tagFilterChannel = new Channel("fetch-tracks-by-tag--send", "fetch-tracks-by-tag--receive")
        this.searchFilterChannel = new Channel("fetch-tracks-by-search--send", "fetch-tracks-by-search--receive")
        this.fetchAllTracksChannel = new Channel("fetch-all-tracks--send", "fetch-all-tracks--receive")
        this.playTrackChannel = new Channel("play-track--send", "play-track--receive")
        this.deleteTrackChannel = new Channel("delete-track--send", "delete-track--receive")
    }
}





class Channel {
    constructor(channel_send, channel_receive) {
        this.channel_send = channel_send;
        this.channel_receive = channel_receive;
        this.listener = null;
    }

    async send(sent_data) {

        try {
            await window.electronAPI.channelSend(this.channel_send, sent_data);
            const received_data = await new Promise((resolve, reject) => {
                this.listener = (received_data, error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(received_data)
                    }
                };
                window.electronAPI.channelReceive(this.channel_receive, this.listener);
            })
            this.close()
            return received_data
        } catch (error) {
            console.error(error.message)
        }
    }

    close() {
        if (this.listener) {
            window.electronAPI.removeListener(this.channel_receive, this.listener)
            this.listener = null
        }
    }
}