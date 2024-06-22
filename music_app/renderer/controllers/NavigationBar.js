class NavigationBarHTML {


    addToParent(parent) {
        const navContainer = this.addContainer()
        navContainer.appendChild(this.addHomeButton())
        navContainer.appendChild(this.addDownloadButton())
        navContainer.appendChild(this.addTagButton())
        navContainer.appendChild(this.addSearchButton())
        navContainer.appendChild(this.addRestoreButton())
        parent.appendChild(navContainer)
    }



    addContainer() {
        const navContainer = new HTMLElement("div")
        
        const properties = {
            id: "nav-container",
        }
        navContainer.addProperties(properties)
        
        const classes = []
        navContainer.addClasses(classes)
        
        const attributes = {}
        navContainer.addAttributes(attributes)

        const styles = {
            "height": "100vh",
            "width": "40px",
            // "background-color": "var(--nav-background-color)",
        }
        navContainer.addStyles(styles)
        return navContainer.element
    }



    addHomeButton() {
        const homeButton = new HTMLElement("button")
        
        const properties = {
            id: "nav-home-button",
        }
        homeButton.addProperties(properties)
        
        const classes = [
            "nav-button"
        ]
        homeButton.addClasses(classes)
        
        const attributes = {}
        homeButton.addAttributes(attributes)

        const styles = {
            "background-color": "rgba(0,0,0,0)" 
        }
        homeButton.addStyles(styles)

        homeButton.addImage("./images/home-7-128.png", 32, 32)

        return homeButton.element
    }



    addDownloadButton() {
        const downloadButton = new HTMLElement("button")
        
        const properties = {
            id: "nav-download-button",
        }
        downloadButton.addProperties(properties)
        
        const classes = []
        downloadButton.addClasses(classes)
        
        const attributes = {}
        downloadButton.addAttributes(attributes)

        const styles = {}
        downloadButton.addStyles(styles)
        return downloadButton.element
    }



    addTagButton() {
        const tagButton = new HTMLElement("button")
        
        const properties = {
            id: "nav-home-button",
        }
        tagButton.addProperties(properties)
        
        const classes = []
        tagButton.addClasses(classes)
        
        const attributes = {}
        tagButton.addAttributes(attributes)

        const styles = {}
        tagButton.addStyles(styles)
        return tagButton.element
    }



    addSearchButton() {
        const searchButton = new HTMLElement("button")
        
        const properties = {
            id: "nav-home-button",
        }
        searchButton.addProperties(properties)
        
        const classes = []
        searchButton.addClasses(classes)
        
        const attributes = {}
        searchButton.addAttributes(attributes)

        const styles = {}
        searchButton.addStyles(styles)
        return searchButton.element
    }



    addRestoreButton() {
        const restoreButton = new HTMLElement("button")
        
        const properties = {
            id: "nav-home-button",
        }
        restoreButton.addProperties(properties)
        
        const classes = []
        restoreButton.addClasses(classes)
        
        const attributes = {}
        restoreButton.addAttributes(attributes)

        const styles = {}
        restoreButton.addStyles(styles)
        return restoreButton.element
    }



}
