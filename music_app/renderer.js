import { Tracklist } from  "./renderer/components/Track.js"
import { DownloadBar } from "./renderer/elements/DownloadBar.js"
import { Player } from "./renderer/elements/Player.js"


export const channels = new Channels()
export const dataController = new DataController(channels)


document.addEventListener("DOMContentLoaded", async () => {

    await dataController.updateTrackDataNoFilter()
    
    const body = document.getElementById("body")
    const navBar = new NavBar()
    body.appendChild(navBar.create())
    
    body.appendChild(Tracklist.create())

    const downloadBar = new DownloadBar(channels, dataController)
    body.appendChild(downloadBar.create())

    const player = new Player()
    body.appendChild(player.create())

})


