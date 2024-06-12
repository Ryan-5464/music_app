//import { LeftSidebarHandler } from "./leftSidebarHandler.js" 
//import { CentreContainerHandler } from "./centreContainerHandler.js"


class ContentLoader {

    loadContentDomLoaded() {
        new LeftSidebar().loadContent()
        new TrackList().loadContent()
        new TrackListFooter().loadContent()
        new Player().loadContent()
        this.addEventListeners()
    }

    addEventListeners() {
        const downloadBarEventHandler = new DownloadBarEventHandler()
        downloadBarEventHandler.addDownloadButtonEventListener()
    }
}


