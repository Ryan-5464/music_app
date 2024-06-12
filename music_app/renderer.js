
//import { Body } from "./rdr/body.js"
//import { ContentLoader } from "./rdr/contentLoader.js"


const main = new Main()
const contentLoader = new ContentLoader()


document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("body")
    body.appendChild(main.makeElement())
    contentLoader.loadContentDomLoaded()



    const leftSidebarDownloadButton = document.getElementById("left-sidebar-download-button")
    const leftSidebarTagFilterButton = document.getElementById("left-sidebar-tag-filter-button")

    leftSidebarDownloadButton.addEventListener("click", () => {
        const trackListFooter = new TrackListFooter()
        const downloadBarEventHandler = new DownloadBarEventHandler()
        trackListFooter.loadDownloadBar()
        downloadBarEventHandler.addDownloadButtonEventListener()
    })

    leftSidebarTagFilterButton.addEventListener("click", () => {
        const trackListFooter = new TrackListFooter()
        const tagFilterEventHandler = new TagFilterEventHandler()
        trackListFooter.loadTagFilter()
        tagFilterEventHandler.addTagFilterEventListener()
        tagFilterEventHandler.addAnyButtonEventListener()
        tagFilterEventHandler.addAllButtonEventListener()
    })
})


