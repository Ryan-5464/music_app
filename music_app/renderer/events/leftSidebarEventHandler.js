class LeftSidebarEventHandler {

    addLeftSidebarEventListeners() {
        const menuElements = document.getElementsByClassName("menu-button")
        for (const menuElement of menuElements) {
            menuElement.addEventListener("click", this.toggleActive)
        }
    }

    toggleActive(event) {
        const menuElements = document.getElementsByClassName("menu-button")
        for (const menuElement of menuElements) {
            if (menuElement.classList.contains("active-menu")) {
                menuElement.classList.remove("active-menu")
            }
        }
        event.target.classList.add("active-menu")
    }
}