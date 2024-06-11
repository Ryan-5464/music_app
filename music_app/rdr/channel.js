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