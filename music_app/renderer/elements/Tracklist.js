// import { TaglistController } from "./Taglist.js"
// import { Track } from "../components/Track.js"
// import { TaglistElements, DeleteButtonElement } from "../components/Track.js"
// import { dataController } from "../../renderer.js"



// export class Tracklist {


//     static create() {
//         const container = Tracklist._addContainer()
//         container.appendChild(Tracklist._addTitle())
//         container.appendChild(Tracklist._addTracklist())
//         return container
//     }



//     static _reloadTracklist() {
//         const container = document.getElementById("tracklist-container")
//         const tracklist = document.getElementById("tracklist")
//         if (tracklist) {
//             container.removeChild(tracklist)
//         }
//         container.appendChild(this.addTracklist())
//     }



//     static _addContainer() {
//         const container = document.createElement("div")
//         container.id = "tracklist-container"
//         container.classList.add("tracklist-display")
//         return container
//     }



//     static _addTitle() {
//         const title = document.createElement("div")
//         title.id = "tracklist-title"
//         title.classList.add("title")
//         title.textContent = "Playlist"
//         return title
//     }


    
//     static _addTracklist() {
//         const tracklist = document.createElement("div")
//         tracklist.id = "tracklist"

//         tracklist.addEventListener("click", async (event) => {
//             if (event.target.tagName !== "BUTTON") {
//                 return
//             }
//             if (event.target.classList.contains("track-tag-button")) {
//                 return await TracklistEvents.handleTrackTagButton(event)
//             }
//             if (event.target.classList.contains("track-play-button")) {
//                 return await TracklistEvents.handleTrackPlayButton(event)
//             }
//             if (event.target.classList.contains("track-delete-button")) {
//                 return await TracklistEvents.handleTrackDeleteButton(event)
//             }
//             if (event.target.classList.contains("confirm-delete-button")) {
//                 return await TracklistEvents.handleTrackConfirmButton(event)
//             }
//             if (event.target.classList.contains("cancel-delete-button")) {
//                 return await TracklistEvents.handleTrackCancelButton(event)
//             }
//         })
        
//         for (const track of dataController.trackData) {
//             tracklist.appendChild(Track.create(track))
//         }
//         return tracklist       
//     }


// }



// class TracklistEvents {

//     static async handleTrackTagButton(event) {
//         const button = event.target
//         const trackId = button.getAttribute("data-track-id")
//         const taglistContainer = document.getElementById(`taglist-container-${trackId}`)
//         if (taglistContainer) {
//             taglistContainer.remove()
//             return
//         }
//         const taglist = await TaglistElements.create(trackId)
//         const track = document.getElementById(`track-${trackId}`)
//         track.appendChild(taglist)
//     }

//     static async handleTrackPlayButton(event) {
//         const button = event.target
//         const audioElement = document.getElementById("audio-element")
//         const trackId = button.getAttribute("data-track-id")
//         if (button.classList.contains("now-playing")) {
//             audioElement.src = await dataController.fetchAudioSource(trackId) 
//             audioElement.play()
//             return
//         } else {
//             const playButtons = document.getElementsByClassName("track-play-button")
//             for (const playButton of playButtons) {
//                 playButton.classList.remove("now-playing")
//                 playButton.parentElement.classList.remove("track-now-playing")
//             }
//             button.classList.add("now-playing")
//             button.parentElement.classList.add("track-now-playing")
//         }
//         audioElement.src = await dataController.fetchAudioSource(trackId) 
//         audioElement.play()
//     }

//     static async handleTrackDeleteButton(event) {
//         const button = event.target
//         const trackId = button.getAttribute("data-track-id")
//         const deleteButtonContainer = document.getElementById(`delete-button-container-${trackId}`)
//         const confirm = createButton(`confirm-delete-button-${trackId}`, ["confirm-delete-button"], {"data-track-id": trackId}, "./images/checkmark-32.png", 18, 18)
//         const cancel = createButton(`cancel-delete-button-${trackId}`, ["cancel-delete-button"], {"data-track-id": trackId}, "./images/delete-2-32.png", 18, 18)
//         console.log("before", deleteButtonContainer, confirm, cancel)
//         deleteButtonContainer.appendChild(confirm)
//         deleteButtonContainer.appendChild(cancel)
//         console.log("after", deleteButtonContainer)
//         button.remove()
//     }

//     static async handleTrackConfirmButton(event) {
//         const confirm = event.target
//         const trackId = confirm.getAttribute("data-track-id")
//         await dataController.deleteTrack(trackId)
//         await dataController.updateTrackDataNoFilter()
//         const track = document.getElementById(`track-${trackId}`)
//         track.remove()
//     }

//     static async handleTrackCancelButton(event) {
//         const cancel = event.target
//         const trackId = cancel.getAttribute("data-track-id")
//         const trackInfoContainer = document.getElementById(`track-info-container-${trackId}`)
//         const deleteButtonContainer = document.getElementById(`delete-button-container-${trackId}`)
//         deleteButtonContainer.remove()
//         trackInfoContainer.appendChild(DeleteButtonElement.create(trackId))
//     }

// }