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





function format(duration) {
    let x = {hours: 0, minutes: 0, seconds: 0, remainingDuration: duration}
    if (duration > 3600) {
        let x = hours(x)
        x = minutes(x)
        x = seconds(x)
        return `${x.hours}:${x.minutes}:${x.seconds}`
    } else {
        x = minutes(x)
        x = seconds(x)
        return `${x.minutes}:${x.seconds}`
    }
}

function hours(x) {
    x.hours = Math.floor(x.remainingDuration / 3600)
    x.remainingDuration = x.remainingDuration - (3600 * x.hours)
    if (x.hours < 10) {
        x.hours = `0${x.hours}`
    } else {
        x.hours = `${x.hours}`
    }
    return x
}

function minutes(x) {
    x.minutes = Math.floor(x.remainingDuration / 60)
    x.remainingDuration = x.remainingDuration - (60 * x.minutes)
    if (x.minutes < 10) {
        x.minutes = `0${x.minutes}`
    } else {
        x.minutes = `${x.minutes}`
    }
    return x
}

function seconds(x) {
    x.seconds = x.remainingDuration
    if (x.seconds < 10) {
        x.seconds = `0${Math.floor(x.seconds)}`
    } else {
        x.seconds = `${Math.floor(x.seconds)}`
    }
    return x
}
