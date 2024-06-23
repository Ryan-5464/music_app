class NavBar {


    create() {
        const container = this.addContainer()
        container.appendChild(this.addHomeButton())
        container.appendChild(this.addTrackListButton())
        container.appendChild(this.addDownloadButton())
        container.appendChild(this.addTagButton())
        container.appendChild(this.addSearchButton())
        container.appendChild(this.addRestoreButton())
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
            const element = document.getElementById("content-container")
            element.innerHTML = ''
            const tracks = [{track_id: "test1", duration_sec: 300, title: "test title 1"},{track_id: "test2", duration_sec: 200, title: "test title 2"}]
            const tracklistPage = new TracklistPage(tracks)
            element.appendChild(tracklistPage.create())
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