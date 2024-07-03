function createButton(id=null, classes=[], attributes={}, imgSrc=null, width=null, height=null) {

    const button = document.createElement('button')

    if (id) {
        button.id = id
    }

    for (const cls of classes) {
        button.classList.add(cls)
    }

    const attriPairs = Object.entries(attributes)
    attriPairs.forEach(([key,value]) => {
        button.setAttribute(key, value)
    })

    if (imgSrc) {
        const icon = document.createElement("img")
        icon.src = imgSrc
        icon.style.cssText = `width: ${width}px; height: ${height}px;`
        icon.style.pointerEvents = "none"
        button.appendChild(icon)
    }

    return button
}



function createHorizontalLine(id) {
    const horizontalLine = document.createElement("div")
    horizontalLine.id = id
    horizontalLine.classList.add("glowing-horizontal-line")
    return horizontalLine
}



// function getActiveTrackId() {
//     const elements = document.getElementsByClassName("active-track")
//     const activeTrack = elements[0]
//     const activeTrackId = activeTrack.getAttribute("data-track-id")
//     return activeTrackId
// }