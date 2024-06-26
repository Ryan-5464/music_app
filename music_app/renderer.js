


document.addEventListener("DOMContentLoaded", async () => {

    const channels = new Channels()
    const dataController = new DataController(channels)
    await dataController.updateTrackDataNoFilter()
    
    const body = document.getElementById("body")
    const navBar = new NavBar()
    body.appendChild(navBar.create())
    
    const homePage = new HomePage()
    body.appendChild(homePage.create())

    const tracklist = new Tracklist(dataController)
    body.appendChild(tracklist.create())

    const downloadBar = new DownloadBar(channels, dataController)
    body.appendChild(downloadBar.create())

    const player = new Player()
    body.appendChild(player.create())

})


