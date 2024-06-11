//import { LeftSidebarHandler } from "./leftSidebarHandler.js" 
//import { CentreContainerHandler } from "./centreContainerHandler.js"


class ContentLoader {

    loadContentDomLoaded() {
        new LeftSidebar().loadContent()
        new TrackList().loadContent()
    }
}