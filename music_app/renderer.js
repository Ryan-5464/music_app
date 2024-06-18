
//import { Body } from "./rdr/body.js"
//import { ContentLoader } from "./rdr/contentLoader.js"


const main = new Main()
const contentLoader = new ContentLoader()


document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("body")
    body.appendChild(main.makeElement())
    const channels = new Channels()
    contentLoader.loadContentDomLoaded(channels)


    const leftSidebarController = new LeftSidebarController()
    leftSidebarController.renderContent()


    const leftSidebarDownloadButton = document.getElementById("left-sidebar-download-button")
    const leftSidebarTagFilterButton = document.getElementById("left-sidebar-tag-filter-button")
    const leftSidebarSearchButton = document.getElementById("left-sidebar-search-button")
    const leftSidebarRecentlyDeletedButton = document.getElementById("left-sidebar-recently-deleted-button")




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

    leftSidebarSearchButton.addEventListener("click", () => {
        const trackListFooter = new TrackListFooter()
        const searchFilterEventHandler = new SearchFilterEventHandler()
        trackListFooter.loadSearchFilter()
        searchFilterEventHandler.addSearchFilterEventListener()
        searchFilterEventHandler.addByTitleButtonEventListener()
        searchFilterEventHandler.addByArtistButtonEventListener()
    })

    leftSidebarRecentlyDeletedButton.addEventListener("click", () => {

    })

    const playerEventHandler = new PlayerEventHandler()
    playerEventHandler.addUpdateProgressBarEventListener()
    playerEventHandler.addPlayButtonEventListener()
    playerEventHandler.addJumpToEventListener()

})


