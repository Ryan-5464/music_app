import { Tracklist } from  "./renderer/components/Track.js"
import { Player } from "./renderer/components/Player.js"
import { createTagFilterElement, addTagFilterEventListeners } from "./renderer/components/TagFilter.js"
import { DataController } from "./renderer/data/DataController.js"
import { ShowHideButtons } from "./renderer/components/ShowHideButtons.js"
import { Channels } from "./renderer/data/Channels.js"
import { ExistingTagsList } from "./renderer/components/ExistingTagsList.js"

import { createDownloadBarElement, addDownloadBarEventListeners } from "./renderer/components/DownloadBar.js"
import { createSearchFilterElement, addSearchFilterEventListeners } from "./renderer/components/SearchFilter.js"



export const channels = new Channels()
export const dataController = new DataController(channels)


document.addEventListener("DOMContentLoaded", async () => {



    const minimizeButton = document.getElementById("minimize")
    const closeButton =  document.getElementById("close")
    console.log("output", minimizeButton, closeButton)

    minimizeButton.addEventListener('click', () => {
        console.log("trig")
        window.electron.minimize()
    })
    closeButton.addEventListener('click', () => {
        console.log("trig")
        window.electron.close()
    })



    await dataController.updateTrackDataNoFilter()
    await dataController.updateTaglistData()



    const body = document.getElementById("body")
    body.appendChild(ShowHideButtons.create())
    body.appendChild(Tracklist.create())
    body.appendChild(createSearchFilterElement())
    body.appendChild(createTagFilterElement())
    body.appendChild(createDownloadBarElement())
    const player = new Player()
    body.appendChild(player.create())
    body.appendChild(ExistingTagsList.create())



    addDownloadBarEventListeners()
    addSearchFilterEventListeners()
    addTagFilterEventListeners()
})


