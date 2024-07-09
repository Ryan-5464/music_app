




export function createAudioPlayerElement() {

    const container = createContainer()
    container.appendChild(createAudioElement())
    container.appendChild(createProgressBar())
    container.appendChild(createPlayerButtonsContainer())
    container.appendChild(createDurationTextContainer())
    return
}





function createContainer() {

    const container = document.createElement("div")
    container.id = "player-container"
    container.classList.add("visible", "show-hide-element-container")
    return container
}





function createAudioElement() {

    const audio = document.createElement("audio")
    audio.id = "audio-element"
    addHandlePlayTrackEventListener()
    addHandleUpdateTrackProgressEventListener()
    addHandleEndOfTrackEventListener()
    return audio
}




function createPlayerButtonsContainer() {

    const container = document.createElement("div")
    container.id = "player-button-container"
    container.classList.add("frosted-glass")
    container.appendChild(createPreviousButton())
    container.appendChild(createPauseButton())
    container.appendChild(createStopButton())
    container.appendChild(createNextButton())
    container.appendChild(createRepeatButton())
    container.appendChild(createShuffleButton())
    container.appendChild(createVolumeSlider())
    container.appendChild(createNowPlayingTickerTextContainer())
    return container
}





function createPreviousButton() {
    const button = createButton("player-previous-button", ["player-button"], {}, "./images/previous-32.png", 24, 24) 
    addHandlePlayButtonEventListener(button)
    return button
}





function createPauseButton() {
    const button = createButton("player-pause-button", ["player-button"], {}, "./images/play-32.png", 24, 24) 
    addHandlePauseButtonEventListener(button)
    return button
}





function createNextButton() {
    const button = createButton("player-next-button", ["player-button"], {}, "./images/next-32.png", 24, 24) 
    addHandleNextButtonEventListener(button)
    return button
}





function createStopButton() {
    const button = createButton("player-stop-button", ["player-button"], {}, "./images/stop-32.png", 24, 24) 
    addHandleStopButtonEventListener(button)
    return button
}





function createRepeatButton() {
    const button = createButton("player-repeat-button", ["player-button"], {}, "./images/repeat-32.png", 24, 24) 
    addToggleRepeatButtonEventListener(button)
    return button
}





function createShuffleButton() {
    const button = createButton("player-shuffle-button", ["player-button"], {}, "./images/shuffle-32.png", 24, 24) 
    addToggleShuffleButtonEventListener(button)
    return button
}





function createVolumeSlider() {
    const input = document.createElement("input")
    input.id = "player-volume-slider"
    input.type = "range"
    input.min = "0"
    input.max = "1"
    input.step = "0.01"
    input.value = "1"
    input.addEventListener("input", () => {
        const audioElement = document.getElementById("audio-element")
        audioElement.volume = input.value
    })
    return input
}





function createProgressBar() {
    const element = document.createElement("div")
    element.id = "player-progress-bar"
    element.addEventListener("click", (event) => {
        const audioElement = document.getElementById("audio-element")
        const rect = element.getBoundingClientRect()
        const offsetX = event.clientX - rect.left
        const newTime = (offsetX / rect.width) * audioElement.duration
        audioElement.currentTime = newTime
    })
    const subElement = document.createElement("div")
    subElement.id = "player-current-progress"
    element.appendChild(subElement)
    return element
}





function createNowPlayingTickerTextContainer() {
    const container = document.createElement("div")
    container.id = "player-ticker"
    for (let i = 0; i < 4; i++) {
        container.appendChild(createNowPlayingTickerText())
    }
    return container
}





function createNowPlayingTickerText() {

    const text = document.createElement("div")
    text.classList.add("ticker-text")
    return text
}





function createDurationTextContainer() {
    const container = document.createElement("div")
    container.id = "player-duration-text"
    return container
}





function addHandlePlayTrackEventListener() {

}





function addHandleUpdateTrackProgressEventListener() {

}





function addHandleEndOfTrackEventListener() {

}





function addHandlePreviousButtonEventListener() {

}





function addHandlePauseButtonEventListener() {

}





function addHandleNextButtonEventListener() {

}





function addHandleStopButtonEventListener() {

}





function addToggleRepeatButtonEventListener() {

}





function addToggleShuffleButtonEventListener() {

}
