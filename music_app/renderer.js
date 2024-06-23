


document.addEventListener("DOMContentLoaded", () => {
    // const channels = new Channels()
    
    const body = document.getElementById("body")
    const navBar = new NavBar()
    body.appendChild(navBar.create())
    
    const contentContainer = document.createElement("div")
    contentContainer.id = "content-container"
    body.appendChild(contentContainer)

    const homePage = new HomePage()
    contentContainer.appendChild(homePage.create())

    const player = new Player()
    contentContainer.appendChild(player.create())

})


