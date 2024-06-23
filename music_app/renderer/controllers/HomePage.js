class HomePage {



    create() {
        const container = this.createContainer()
        container.appendChild(this.addHomePageTitle())
        return container
    }



    createContainer() {
        const container = document.createElement("div")
        container.id = "home-page-container"
        return container
    }



    addHomePageTitle() {
        const element = document.createElement("div")
        element.id = "home-page-title"
        element.textContent = "MUSIC PLAYER"
        element.classList.add("fade-in-element")
        setTimeout(() => {
            element.classList.add("visible");
        }, 10);       
        return element
    }


}