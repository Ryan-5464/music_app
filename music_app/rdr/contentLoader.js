//import { LeftSidebarHandler } from "./leftSidebarHandler.js" 
//import { CentreContainerHandler } from "./centreContainerHandler.js"


class ContentLoader {

    loadContentDomLoaded() {
        new LeftSidebarHandler().loadContent()
        new CentreContainerHandler().loadContent()
    }
}