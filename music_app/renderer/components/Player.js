import { dataController } from "../../renderer.js"





export function createAudioPlayerElement() {

    const container = createContainer()
    container.appendChild(createAudioElement())
    container.appendChild(createProgressBarContainer())
    container.appendChild(createPlayerButtonsContainer())
    container.appendChild(createDurationTextContainer())
    return container
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
    addHandlePlayTrackEventListener(audio)
    addHandleUpdateTrackProgressEventListener(audio)
    addHandleEndOfTrackEventListener(audio)
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
    addHandlePreviousButtonEventListener(button)
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
    addHandleVolumeSliderEventListener(input)
    return input
}





function createProgressBarContainer() {

    const container = document.createElement("div")
    container.id = "player-progress-bar"
    container.appendChild(createCurrentProgressBar())
    addHandleCurrentProgressBarEventListener(container)
    return container
}





function createCurrentProgressBar() {

    const container = document.createElement("div")
    container.id = "player-current-progress"
    return container
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





function addHandlePlayTrackEventListener(audio) {

    audio.addEventListener("play", 
        () => {

            const elements = document.getElementsByClassName("ticker-text")
            const nowPlaying = document.getElementsByClassName("track-now-playing")[0]
            const trackTitle = nowPlaying.children[0].children[1].textContent
            for (const element of elements) {
                element.textContent = trackTitle 
            }
        }
    )
}





function addHandleUpdateTrackProgressEventListener(audio) {

    audio.addEventListener("timeupdate", 
        () => {

            const progressPercent = (audio.currentTime / audio.duration) * 100
            const currentProgress = document.getElementById("player-current-progress")
            currentProgress.style.width = `${progressPercent}%`
            const durationText = document.getElementById("player-duration-text")
            const track = document.getElementsByClassName("track-now-playing")[0]
            const duration = track.children[0].children[3].textContent
            durationText.textContent = `${format(audio.currentTime)} / ${duration}`
        }
    )
}





function addHandleEndOfTrackEventListener(audio) {

    audio.addEventListener("ended", 
        async () => {

            const shuffleButton = document.getElementById("player-shuffle-button")
            const repeatButton = document.getElementById("player-repeat-button")
            swapToPauseIcon()
            if (repeatButton.classList.contains("active")) {
                const audioElement = document.getElementById("audio-element")
                await audioElement.pause()
                audioElement.currentTime = 0 
                await audioElement.play()
                return
            }
            if (shuffleButton.classList.contains("active")) {
                const trackId = getRandomTrackId()
                await playTrack(trackId)
                return
            }
            const trackId = getNextTrackId()
            await playTrack(trackId)
        }
    )
}





function addHandlePreviousButtonEventListener(button) {

    button.addEventListener("click", 
        async () => {

            const shuffleButton = document.getElementById("player-shuffle-button")
            const repeatButton = document.getElementById("player-repeat-button")
            swapToPauseIcon()
            if (repeatButton.classList.contains("active")) {
                const audioElement = document.getElementById("audio-element")
                await audioElement.pause()
                audioElement.currentTime = 0 
                await audioElement.play()
                return
            }
            if (shuffleButton.classList.contains("active")) {
                const trackId = getRandomTrackId()
                await playTrack(trackId)
                return
            }
            const trackId = getPreviousTrackId()
            await playTrack(trackId)
        }
    )
}





function addHandlePauseButtonEventListener(button) {

    button.addEventListener("click", 
        async () => {

            const audioElement = document.getElementById("audio-element")
            if (audioElement.paused) {
                swapToPauseIcon()
                await audioElement.play()
            }
            else {
                swapToPlayIcon()
                await audioElement.pause()
            }
        }
    )
}





async function addHandleNextButtonEventListener(button) {

    button.addEventListener("click", 
        async () => {
            
            const shuffleButton = document.getElementById("player-shuffle-button")
            const repeatButton = document.getElementById("player-repeat-button")
            swapToPauseIcon()
            if (repeatButton.classList.contains("active")) {
                const audioElement = document.getElementById("audio-element")
                await audioElement.pause()
                audioElement.currentTime = 0 
                await audioElement.play()
                return
            }
            if (shuffleButton.classList.contains("active")) {
                const trackId = getRandomTrackId()
                await playTrack(trackId)
                return
            }
            const trackId = getNextTrackId()
            await playTrack(trackId)
        }
    )
}





async function addHandleStopButtonEventListener(button) {

    button.addEventListener("click", 
        async () => {

            await stopTrack()
            swapToPlayIcon()
        }
    )
}





function addToggleRepeatButtonEventListener(button) {

    button.addEventListener("click", 
        () => {

            const repeatElement = document.getElementById("player-repeat-button")
            const shuffleElement = document.getElementById("player-shuffle-button")
            if (repeatElement.classList.contains("active")) {
                repeatElement.classList.remove("active")
                return
            }
            if (shuffleElement.classList.contains("active")) {
                shuffleElement.classList.remove("active")
            }
            repeatElement.classList.add("active")
        }
    )
}





function addToggleShuffleButtonEventListener(button) {

    button.addEventListener("click", 
        () => {

            const shuffleElement = document.getElementById("player-shuffle-button")
            const repeatElement = document.getElementById("player-repeat-button")
            if (shuffleElement.classList.contains("active")) {
                shuffleElement.classList.remove("active")
                return
            }
            if (repeatElement.classList.contains("active")) {
                repeatElement.classList.remove("active")
            }
            shuffleElement.classList.add("active")
        }
    )
}





function addHandleVolumeSliderEventListener(input) {

    input.addEventListener("input", 
        () => {

            const audioElement = document.getElementById("audio-element")
            audioElement.volume = input.value
        }
    )
}





function addHandleCurrentProgressBarEventListener(container) {
    
    container.addEventListener("click", 
        (event) => {
        
            const audioElement = document.getElementById("audio-element")
            const rect = container.getBoundingClientRect()
            const offsetX = event.clientX - rect.left
            const newTime = (offsetX / rect.width) * audioElement.duration
            audioElement.currentTime = newTime
        }
    )
}





// async function getRandomTrackIdTrack() {

//     getRandomTrackId()
//     const tracks = document.getElementsByClassName("track-now-playing")
//     const trackId = tracks[0].getAttribute("data-track-id")
//     await playTrack(trackId)
// }






async function playTrack(trackId) {

    const source = await dataController.fetchAudioSource(trackId)
    const audioElement = document.getElementById("audio-element")
    await audioElement.pause()
    audioElement.currentTime = 0 
    audioElement.src = source
    await audioElement.play()
} 





async function stopTrack() {
    const audioElement = document.getElementById("audio-element")
    await audioElement.pause()
    audioElement.currentTime = 0 
}





function getPreviousTrackId() {
    const tracks = document.getElementsByClassName("track")
    let i = 0
    for (const track of tracks) {
        if (track.classList.contains("track-now-playing")) {
            track.classList.remove("track-now-playing")
            break
        }
        i = i + 1
    }
    let track = null
    if (i === 0) {
        tracks[tracks.length - 1].classList.add("track-now-playing")
        track = tracks[tracks.length - 1]
    } 
    else {
        tracks[i-1].classList.add("track-now-playing")
        track = tracks[i-1]
    }
    const trackId = track.getAttribute("data-track-id")
    return trackId
}





function getNextTrackId() {
    const tracks = document.getElementsByClassName("track")
    let i = 0
    for (const track of tracks) {
        i = i + 1
        if (track.classList.contains("track-now-playing")) {
            track.classList.remove("track-now-playing")
            break
        }
    }
    let track = null
    if (i === tracks.length) {
        tracks[0].classList.add("track-now-playing")
        track = tracks[0]
    } 
    else {
        tracks[i].classList.add("track-now-playing")
        track = tracks[i]
    }
    const trackId = track.getAttribute("data-track-id")
    return trackId
}





function getRandomTrackId() {
    const tracks = document.getElementsByClassName("track")
    for (const track of tracks) {
        if (track.classList.contains("track-now-playing")) {
            track.classList.remove("track-now-playing")
        }        
    }
    const shuffleIdx = getRandomInt(0, tracks.length-1)
    const track = tracks[shuffleIdx]
    track.classList.add("track-now-playing")
    const trackId = track.getAttribute("data-track-id")
    return trackId
}





function swapToPauseIcon() {
    const pauseButton = document.getElementById("player-pause-button")
    pauseButton.children[0].src = "./images/pause-32.png"
}





function swapToPlayIcon() {
    const pauseButton = document.getElementById("player-pause-button")
    pauseButton.children[0].src = "./images/play-32.png"   
}





function getRandomInt(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}