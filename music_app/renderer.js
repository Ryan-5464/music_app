


document.addEventListener("DOMContentLoaded", () => {
    // const channels = new Channels()
    
    const body = document.getElementById("body")
    const navBar = new NavBar()
    body.appendChild(navBar.create())
    
    const homePage = new HomePage()
    body.appendChild(homePage.create())

    const tracklist = new Tracklist()
    body.appendChild(tracklist.create())

    const player = new Player()
    body.appendChild(player.create())

})


