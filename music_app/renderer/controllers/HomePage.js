class HomePage {



    create() {
        return this.addHomePageTitle()
    }



    addHomePageTitle() {
        const element = document.createElement("div")
        element.id = "home-page-title"
        element.textContent = "MUSIC PLAYER"
        element.classList.add("home-title-display")
        return element
    }


}