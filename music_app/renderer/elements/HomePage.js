class HomePage {



    create() {
        const container = this._addContainer()
        container.appendChild(this._addHomePageTitle())
        container.appendChild(this._addEnterButton())
        return container
    }



    static _addContainer() {
        const container = document.createElement("div")
        container.id = "home-page-container"
        return container
    }



    static _addHomePageTitle() {
        const element = document.createElement("div")
        element.id = "home-page-title"
        element.textContent = "MUSIC PLAYER"
        element.classList.add("home-title-display")
        return element
    }

    static _addEnterButton() {
        const button = document.createElement("button")
        button.id = "home-enter-button"
        button.textContent = "Enter"
        button.addEventListener("click", () => {

        })
    }


}