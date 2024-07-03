import { Tracklist } from  "./renderer/components/Track.js"
import { DownloadBar } from "./renderer/components/DownloadBar.js"
import { Player } from "./renderer/components/Player.js"
import { TagFilterElement } from "./renderer/components/TagFilter.js"
import { DataController } from "./renderer/data/DataController.js"
import { ShowHideButtons } from "./renderer/components/ShowHideButtons.js"
import { Channels } from "./renderer/data/Channels.js"




export const channels = new Channels()
export const dataController = new DataController(channels)


document.addEventListener("DOMContentLoaded", async () => {

    await dataController.updateTrackDataNoFilter()
    
    const body = document.getElementById("body")

    body.appendChild(ShowHideButtons.create())
    
    body.appendChild(Tracklist.create())

    body.appendChild(TagFilterElement.create())

    const downloadBar = new DownloadBar(channels, dataController)
    body.appendChild(downloadBar.create())



    const player = new Player()
    body.appendChild(player.create())

})


