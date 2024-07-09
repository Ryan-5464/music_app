import { dataController } from "../../renderer.js"





export function createTrackElement(track) {

    const container = createTrackContainer(track.track_id)
    const subContainer = createTrackSubContainer(track.track_id)
    subContainer.appendChild(createPlayButton(track.track_id))
    subContainer.appendChild(createTitle(track.title))
    subContainer.appendChild(createTitleRenameButton(track.track_id))
    subContainer.appendChild(createDuration(track.duration_sec))
    subContainer.appendChild(createTagsButton(track.track_id))
    subContainer.appendChild(createDeleteButtonContainer(track.track_id))
    container.appendChild(subContainer)
    return container
}





function createContainer(containerId) {
    
    const container = document.createElement("div")
    container.id = containerId
    return container
}





function createTrackContainer(trackId) {

    const container = createContainer(`track-${trackId}`)
    container.setAttribute("data-track-id", trackId)
    container.classList.add("track")
    return container
}





function createTrackSubContainer(trackId) {

    const container = createContainer(`track-info-container-${trackId}`)
    container.classList.add("track-info-container")
    return container
}





function createPlayButton(trackId) {

    const button = createButton(`track-play-button-${trackId}`, ["track-button", "track-play-button"], {"data-track-id": trackId}, "./images/play-32.png", 15, 15)
    return button
}





function createTitle(trackTitle) {

    const title = document.createElement("div")
    title.classList.add("track-title")
    title.textContent = trackTitle
    return title
}





function createTitleRenameButton(trackId) {

    const button = createButton(`track-rename-button-${trackId}`, ["track-button", "track-rename-button"], {"data-track-id": trackId}, "./images/rename-32.png", 15, 15)
    addRenameTrackTitleButtonEventListener(button, trackId)
    return button
}





function createDuration(trackDuration) {

    const duration = document.createElement("div")
    duration.classList.add("track-duration")
    duration.textContent = format(trackDuration)
    return duration
}





function createTagsButton(trackId) {

    const button = createButton(`track-tag-button-${trackId}`, ["track-button", "track-tag-button"], {"data-track-id": trackId}, "./images/tag-5-32.png", 18, 18)
    return button
}





export function createDeleteButtonContainer(trackId) {

    const container = createContainer(`delete-button-container-${trackId}`)
    container.appendChild(createDeleteButton(trackId))
    return container
}





function createDeleteButton(trackId) {
   
    const button = createButton(`track-delete-button-${trackId}`, ["track-button", "track-delete-button"], {"data-track-id": trackId}, "./images/delete-32.png", 18, 18)
    return button
}





function addRenameTrackTitleButtonEventListener(button, trackId) {

    button.addEventListener("click", 
        () => {

            const input = createRenameTrackTitleInputBox(trackId)
            const track = document.getElementById(`track-${trackId}`)
            const trackTitle = track.children[0].children[1]
            trackTitle.innerHTML = ''
            trackTitle.appendChild(input)
        }
    )
}





function createRenameTrackTitleInputBox(trackId) {

    const input = document.createElement("input")
    input.id = "rename-track-input"
    input.classList.add("input-bar")
    input.placeholder = "Enter new track name..."
    addRenameTrackTitleInputBoxEventListener(input, trackId)
    return input
}





function addRenameTrackTitleInputBoxEventListener(input, trackId) {

    input.addEventListener("keypress", 
        async (event) => {

            if (event.key !== 'Enter') {
                return
            }

            const trackData = dataController.retreiveTrackData(trackId)
            const track = document.getElementById(`track-${trackId}`)
            const trackTitle = track.children[0].children[1]
            const newName = input.value
            if (newName === '') {
                trackTitle.innerHTML = trackData.title
                return
            }
            await dataController.renameTrack(trackId, newName)
            trackTitle.innerHTML = newName
            await dataController.updateTrackDataNoFilter()  
        }
    )
}

