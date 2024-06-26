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
        button.appendChild(icon)
    }

    return button
}