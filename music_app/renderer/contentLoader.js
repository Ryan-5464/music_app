//import { LeftSidebarHandler } from "./leftSidebarHandler.js" 
//import { CentreContainerHandler } from "./centreContainerHandler.js"


class ContentLoader {

    loadContentDomLoaded(channels) {
        new LeftSidebar().loadContent()
        new TrackList(channels).loadContent()
        new TrackListFooter().loadContent()
        new Player().loadContent()
        this.addEventListeners()
    }

    addEventListeners() {
        const downloadBarEventHandler = new DownloadBarEventHandler()
        downloadBarEventHandler.addDownloadButtonEventListener()
    }
}


