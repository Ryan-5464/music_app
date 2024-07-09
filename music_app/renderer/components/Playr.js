import { dataController } from "../../renderer.js"
import { channels } from "../../renderer.js"



export class Player {



    create() {
        const container = this.addContainer()
        container.appendChild(this.addAudioElement())
        container.appendChild(this.addProgressBar())
        container.appendChild(this.addPlayerButtonsContainer())
        container.appendChild(this.addDurationText())
        return container
    }

    addContainer() {
        const container = document.createElement("div")
        container.id = "player-container"
        container.classList.add("visible", "show-hide-element-container")
        return container
    }

    addPlayerButtonsContainer() {
        const container = document.createElement("div")
        container.id = "player-button-container"
        container.classList.add("frosted-glass")
        container.appendChild(this.addPreviousButton())
        container.appendChild(this.addPauseButton())
        container.appendChild(this.addStopButton())
        container.appendChild(this.addNextButton())
        container.appendChild(this.addRepeatButton())
        container.appendChild(this.addShuffleButton())
        container.appendChild(this.addVolumeSlider())
        container.appendChild(this.addPlayerText())
        return container
    }

    addAudioElement() {
        const element = document.createElement("audio")
        element.id = "audio-element"

        element.addEventListener("play", () => {
            const elements = document.getElementsByClassName("ticker-text")
            const nowPlaying = document.getElementsByClassName("track-now-playing")[0]
            const trackTitle = nowPlaying.children[0].children[1].textContent
            for (const element of elements) {
                element.textContent = trackTitle 
            }
        })

        element.addEventListener("timeupdate", () => {
            const progressPercent = (element.currentTime / element.duration) * 100
            const currentProgress = document.getElementById("player-current-progress")
            currentProgress.style.width = `${progressPercent}%`
            const durationText = document.getElementById("player-duration-text")
            const track = document.getElementsByClassName("track-now-playing")[0]
            const duration = track.children[0].children[3].textContent
            durationText.textContent = `${format(element.currentTime)} / ${duration}`
        })
        
        element.addEventListener("ended", async () => {
            const repeatButton = document.getElementById("player-repeat-button")
            const shuffleButton = document.getElementById("player-shuffle-button")
            if (repeatButton.classList.contains("active")) {
                await PlayerEvents.handleRepeatTrack()
            }
            else if (shuffleButton.classList.contains("active")) {
                await PlayerEvents.handleShuffleTrack()
            } 
            else {
                await PlayerEvents.handlePlayNextTrack()
            }
        })
        return element
    }

    addPreviousButton() {
        const button = createButton("player-previous-button", ["player-button"], {}, "./images/previous-32.png", 24, 24) 
        button.addEventListener("click", PlayerEvents.handlePreviousButton) 
        return button
    }

    addPauseButton() {
        const button = createButton("player-pause-button", ["player-button"], {}, "./images/play-32.png", 24, 24) 
        button.addEventListener("click", PlayerEvents.handlePauseButton)
        return button
    }

    addNextButton() {
        const button = createButton("player-next-button", ["player-button"], {}, "./images/next-32.png", 24, 24) 
        button.addEventListener("click", PlayerEvents.handleNextButton)
        return button
    }

    addStopButton() {
        const button = createButton("player-stop-button", ["player-button"], {}, "./images/stop-32.png", 24, 24) 
        button.addEventListener("click", PlayerEvents.handleStopButton)
        return button
    }

    addRepeatButton() {
        const button = createButton("player-repeat-button", ["player-button"], {}, "./images/repeat-32.png", 24, 24) 
        button.addEventListener("click", toggleRepeatButton)
        return button
    }

    addShuffleButton() {
        const button = createButton("player-shuffle-button", ["player-button"], {}, "./images/shuffle-32.png", 24, 24) 
        button.addEventListener("click", toggleShuffleButton)
        return button
    }

    addVolumeSlider() {
        const element = document.createElement("input")
        element.id = "player-volume-slider"
        element.type = "range"
        element.min = "0"
        element.max = "1"
        element.step = "0.01"
        element.value = "1"
        element.addEventListener("input", () => {
            const audioElement = document.getElementById("audio-element")
            audioElement.volume = element.value
        })
        return element
    }
    
    addProgressBar() {
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


    addPlayerText() {
        const element = document.createElement("div")
        element.id = "player-ticker"
        const textOne = document.createElement("div")
        const textTwo = document.createElement("div")
        const textThree = document.createElement("div")
        const textFour = document.createElement("div")
        textOne.classList.add("ticker-text")
        textTwo.classList.add("ticker-text")
        textThree.classList.add("ticker-text")
        textFour.classList.add("ticker-text")
        textOne.textContent = ""
        textTwo.textContent = ""
        textThree.textContent = ""
        textFour.textContent = ""
        element.appendChild(textOne)
        element.appendChild(textTwo)
        element.appendChild(textThree)
        element.appendChild(textFour)
        return element
    }

    addDurationText() {
        const container = document.createElement("div")
        container.id = "player-duration-text"
        return container
    }

    

}



class PlayerEvents {

    static async handlePlayNextTrack() {
        const repeatButton = document.getElementById("player-repeat-button")
        const shuffleButton = document.getElementById("player-shuffle-button")
        if (repeatButton.classList.contains("active")) {
            const audioElement = document.getElementById("audio-element")
            await audioElement.play()
            return
        }
        if (shuffleButton.classList.contains("active")) {
            const trackId = handleShuffle()
            await playTrack(trackId)
            return
        }
        const trackId = nextTrack()
        await playTrack(trackId)
    }

    static async handlePauseButton() {
        const audioElement = document.getElementById("audio-element")
        if (audioElement.paused) {
            addPauseIcon()
            await audioElement.play()
        }
        else {
            addPlayIcon()
            await audioElement.pause()
        }
    }

    static async handleStopButton() {
        await stopTrack()
        addPlayIcon()
    }

    static async handleRepeatTrack() {
        const audioElement = document.getElementById("audio-element")
        await audioElement.play()
    }

    static async handleShuffleTrack() {
        handleShuffle()
        const tracks = document.getElementsByClassName("track-now-playing")
        const trackId = tracks[0].getAttribute("data-track-id")
        await playTrack(trackId)
    }

    static async handlePreviousButton() {
        const repeatButton = document.getElementById("player-repeat-button")
        const shuffleButton = document.getElementById("player-shuffle-button")
        addPauseIcon()
        if (repeatButton.classList.contains("active")) {
            const audioElement = document.getElementById("audio-element")
            await audioElement.play()
            return
        }
        if (shuffleButton.classList.contains("active")) {
            const trackId = handleShuffle()
            await playTrack(trackId)
            return
        } 
        const trackId = previousTrack()
        await playTrack(trackId)
    }

    static async handleNextButton() {
        const repeatButton = document.getElementById("player-repeat-button")
        const shuffleButton = document.getElementById("player-shuffle-button")
        addPauseIcon()
        if (repeatButton.classList.contains("active")) {
            const audioElement = document.getElementById("audio-element")
            await audioElement.play()
            return
        }
        if (shuffleButton.classList.contains("active")) {
            const trackId = handleShuffle()
            await playTrack(trackId)
            return
        }
        const trackId = nextTrack()
        await playTrack(trackId)
    }

}





function toggleRepeatButton() {
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





function toggleShuffleButton() {
    const element = document.getElementById("player-shuffle-button")
    const repeatElement = document.getElementById("player-repeat-button")
    if (element.classList.contains("active")) {
        element.classList.remove("active")
        return
    }
    if (repeatElement.classList.contains("active")) {
        repeatElement.classList.remove("active")
    }
    element.classList.add("active")
}





async function playTrack(trackId) {
    const source = await channels.playTrackChannel.send({trackId: trackId})
    await stopTrack()
    const audioElement = document.getElementById("audio-element")
    audioElement.src = source
    await audioElement.play()
}





async function stopTrack() {
    const audioElement = document.getElementById("audio-element")
    await audioElement.pause()
    audioElement.currentTime = 0 
}





function handleShuffle() {
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





function nextTrack() {
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





function previousTrack() {
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





function addPauseIcon() {
    const pauseButton = document.getElementById("player-pause-button")
    pauseButton.children[0].src = "./images/pause-32.png"
}





function addPlayIcon() {
    const pauseButton = document.getElementById("player-pause-button")
    pauseButton.children[0].src = "./images/play-32.png"   
}




function getRandomInt(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}