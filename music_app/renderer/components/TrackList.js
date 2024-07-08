import { dataController } from "../../renderer.js"
import { createTrackElement, createDeleteButtonContainer } from "./Track.js"
import { createTrackTagsListElement } from "./TrackTagsList.js"




export function createTrackListElement() {

    const container = createContainer()
    container.appendChild(createTitle())
    container.appendChild(createTrackList())
    return container
}





export function updateTrackList() {

    const trackList = document.getElementById("tracklist")
    trackList.remove()
    const container = document.getElementById("tracklist-container")
    container.appendChild(createTrackList())
}





function createContainer() {

    const container = document.createElement("div")
    container.id = "tracklist-container"
    container.classList.add("visible", "show-hide-element-container")
    return container
}





function createTitle() {

    const title = document.createElement("div")
    title.id = "tracklist-title"
    title.classList.add("title")
    title.textContent = "Playlist"
    return title
}





function createTrackList() {

    const trackList = document.createElement("div")
    trackList.id = "tracklist"
    addTracksToTrackList(trackList)
    addTrackListEventListener(trackList)
    return trackList
}





function addTracksToTrackList(trackList) {

    for (const track of dataController.trackData) {
        trackList.appendChild(createTrackElement(track))
    }
}





function addTrackListEventListener(trackList) {

    trackList.addEventListener("click", 
        async (event) => {

            if (event.target.tagName !== "BUTTON") {
                return
            }

            if (event.target.classList.contains("track-tag-button")) {
                return await handleTrackTagsListButton(event)
            }
            if (event.target.classList.contains("track-play-button")) {
                return await handleTrackPlayButton(event)
            }
            if (event.target.classList.contains("track-delete-button")) {
                return handleTrackDeleteButton(event)
            }
            if (event.target.classList.contains("confirm-delete-button")) {
                return await handleTrackConfirmButton(event)
            }
            if (event.target.classList.contains("cancel-delete-button")) {
                return await handleTrackCancelButton(event)
            }
        }
    )
}





function handleTrackTagsListButton(event) {

    const trackId = event.target.getAttribute("data-track-id")
    // if (closeOpenTrackTagList(trackId)) {
    //     return
    // }
    closeOpenTrackTagLists()
    openTrackTagList(trackId)
}





// function closeOpenTrackTagList(trackId) {

//     const tagListContainer = document.getElementById(`taglist-container-${trackId}`)
//     if (tagListContainer) {
//         tagListContainer.remove()
//         const track = document.getElementById(`track-${trackId}`)
//         track.classList.remove("track-open-taglist")
//         return true
//     }
//     return false
// }





function closeOpenTrackTagLists() {

    const tagListContainers = document.getElementsByClassName("taglist-container")
    for (const container of tagListContainers) {
        container.parentElement.classList.remove("track-open-taglist")
        container.remove()
    }
}





async function openTrackTagList(trackId) {
    const track = document.getElementById(`track-${trackId}`)
    const taglist = await createTrackTagsListElement(trackId)
    track.classList.add("track-open-taglist")
    track.appendChild(taglist)
}





function handleTrackPlayButton(event) {

    const button = event.target
    const trackId = button.getAttribute("data-track-id")
    if (button.classList.contains("now-playing")) {
        replayCurrentlyPlayingTrack(trackId)
    } else {
        button.classList.add("now-playing")
        button.parentElement.parentElement.classList.add("track-now-playing")
        playTrack(trackId)
    }
}





async function replayCurrentlyPlayingTrack(trackId) {
    
    const audioElement = document.getElementById("audio-element")
    audioElement.src = await dataController.fetchAudioSource(trackId) 
    audioElement.play() 
    const pauseButton = document.getElementById("player-pause-button")
    pauseButton.children[0].src = "./images/pause-32.png"
}





async function playTrack(trackId) {

    const audioElement = document.getElementById("audio-element")
    audioElement.src = await dataController.fetchAudioSource(trackId) 
    audioElement.play()
    const playButtons = document.getElementsByClassName("track-play-button")
    for (const playButton of playButtons) {
        playButton.classList.remove("now-playing")
        playButton.parentElement.parentElement.classList.remove("track-now-playing")
    }
    const pauseButton = document.getElementById("player-pause-button")
    pauseButton.children[0].src = "./images/pause-32.png"
}





function handleTrackDeleteButton(event) {

    const trackId = button.getAttribute("data-track-id")
    const confirm = createButton(`confirm-delete-button-${trackId}`, ["track-button", "confirm-delete-button"], {"data-track-id": trackId}, "./images/checkmark-32.png", 18, 18)
    const cancel = createButton(`cancel-delete-button-${trackId}`, ["track-button", "cancel-delete-button"], {"data-track-id": trackId}, "./images/delete-2-32.png", 18, 18)
    const deleteButtonContainer = document.getElementById(`delete-button-container-${trackId}`)
    deleteButtonContainer.appendChild(confirm)
    deleteButtonContainer.appendChild(cancel)
    const button = event.target
    button.remove()
}





async function handleTrackConfirmButton(event) {

    const confirm = event.target
    const trackId = confirm.getAttribute("data-track-id")
    await dataController.deleteTrack(trackId)
    await dataController.updateTrackDataNoFilter()
    const track = document.getElementById(`track-${trackId}`)
    track.remove()
}





function handleTrackCancelButton(event) {

    const cancel = event.target
    const trackId = cancel.getAttribute("data-track-id")
    const trackInfoContainer = document.getElementById(`track-info-container-${trackId}`)
    const deleteButtonContainer = document.getElementById(`delete-button-container-${trackId}`)
    deleteButtonContainer.remove()
    trackInfoContainer.appendChild(createDeleteButtonContainer(trackId))
}
