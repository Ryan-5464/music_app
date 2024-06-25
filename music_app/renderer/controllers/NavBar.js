class NavBar {


    create() {
        const container = this.addContainer()
        container.appendChild(this.addHomeButton())
        container.appendChild(this.addTrackListButton())
        container.appendChild(this.addDownloadButton())
        container.appendChild(this.addTagButton())
        container.appendChild(this.addSearchButton())
        container.appendChild(this.addRestoreButton())
        container.appendChild(this.addPlayerButton())
        return container
    }



    addContainer() {
        const container = document.createElement("div")
        container.id = "nav-container"
        return container
    }



    addNavButton(name, iconPath) {
        const button = document.createElement("button")
        button.id = `nav-${name}-button`
        button.classList.add("nav-button")
        const icon = document.createElement("img")
        icon.src = iconPath
        icon.style.cssText = "width: 24px; height: 24px;"
        button.appendChild(icon)
        return button
    }



    addHomeButton() {
        const button = this.addNavButton("home", "./images/home-7-128.png")
        button.addEventListener("click", () => {
            const element = document.getElementById("content-container")
            element.innerHTML = ''
            const homePage = new HomePage()
            element.appendChild(homePage.create())
        })
        return button
    }



    addTrackListButton() {
        const button = this.addNavButton("tracklist", "./images/list-2-32.png")
        button.addEventListener("click", () => {
            const homePageTitle = document.getElementById("home-page-title")
            const playerContainer = document.getElementById("player-container")
            const tracklistContainer = document.getElementById("tracklist-container")

            if (homePageTitle.classList.contains("home-title-display")) {
                homePageTitle.classList.remove("home-title-display")
                homePageTitle.classList.add("home-title-hide")
            }
            
            if (button.classList.contains("nav-active-button")) {
                button.classList.remove("nav-active-button")
                tracklistContainer.classList.remove("tracklist-display")
                tracklistContainer.classList.add("tracklist-hide")
            } else {
                button.classList.add("nav-active-button")
                tracklistContainer.classList.remove("tracklist-hide")
                tracklistContainer.classList.add("tracklist-display")
                playerContainer.classList.add("player-display")
                playerContainer.classList.remove("player-hide")
            }
        })
        return button
    }



    addDownloadButton() {
        return this.addNavButton("download", "./images/download-2-32.png")
    }



    addTagButton() {
        return this.addNavButton("tag", "./images/tag-5-32.png")
    }



    addSearchButton() {
        return this.addNavButton("search", "./images/search-4-32.png")
    }



    addRestoreButton() {
        return this.addNavButton("restore", "./images/recycle-sign-32.png")
    }



    addPlayerButton() {
        const button = this.addNavButton("player", "./images/play-32.png")
        button.addEventListener("click", () => {
            const playerContainer = document.getElementById("player-container")
            if (button.classList.contains("nav-active-button")) {
                playerContainer.classList.remove("player-display")
                playerContainer.classList.add("player-hide")
                button.classList.remove("nav-active-button")
            } else {
                playerContainer.classList.add("player-display")
                playerContainer.classList.remove("player-hide")
                button.classList.add("nav-active-button")
            }
        })
        return button
    }

}




class NavBarEvents {



    showHideTracklist() {
        const button = document.getElementById("nav-tracklist-button")
        button.addEventListener("click", () => {
            const button = document.getElementById("nav-tracklist-button")
            const tracklistContainer = document.getElementById("tracklist-container")
            if (button.classList.contains("nav-active-button")) {
                button.classList.remove("nav-active-button")
                tracklistContainer.classList.add("hidden")
                tracklistContainer.classList.remove("slide-fade-in")
            } else {
                button.classList.add("nav-active-button")
                tracklistContainer.classList.remove("hidden")
                tracklistContainer.classList.add("slide-fade-in")
            }

        })
    }



}