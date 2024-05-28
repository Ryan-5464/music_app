async function request_data(channel_send_name, channel_receive_name, data_to_send) {

    try {

        await window.electronAPI.channelSend(channel_send_name, data_to_send)
        
        const received_data = await new Promise((resolve, reject) => {
        
            window.electronAPI.channelReceive(channel_receive_name, (received_data, error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(received_data)
                }
        
            })
        }) 
        
        console.log("Data retrieved successfully")
        return received_data
    
    }

    catch (error) {
        console.error(error.message);
    }

}


