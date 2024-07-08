import { Player } from "./renderer/components/Player.js"
import { DataController } from "./renderer/data/DataController.js"
import { ShowHideButtons } from "./renderer/components/ShowHideButtons.js"
import { Channels } from "./renderer/data/Channels.js"

import { createDownloadBarElement, addDownloadBarEventListeners } from "./renderer/components/DownloadBar.js"
import { createSearchFilterElement, addSearchFilterEventListeners } from "./renderer/components/SearchFilter.js"
import { createTagFilterElement, addTagFilterEventListeners } from "./renderer/components/TagFilter.js"
import { createTagsListElement, updateTagsList } from "./renderer/components/TagsList.js"
import { createTrackListElement } from "./renderer/components/TrackList.js"




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



    await dataController.updateTrackDataNoFilter() // need this??



    const body = document.getElementById("body")
    body.appendChild(ShowHideButtons.create())
    body.appendChild(createTrackListElement())
    body.appendChild(createSearchFilterElement())
    body.appendChild(createTagFilterElement())
    body.appendChild(createDownloadBarElement())
    const player = new Player()
    body.appendChild(player.create())
    body.appendChild(createTagsListElement())



    addDownloadBarEventListeners()
    addSearchFilterEventListeners()
    addTagFilterEventListeners()



    updateTagsList()
})


