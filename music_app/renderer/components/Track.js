import { dataController } from "../../renderer.js"
import { channels } from "../../renderer.js"




export class Tracklist {


    static create() {
        const container = Tracklist._addContainer()
        container.appendChild(Tracklist._addTitle())
        container.appendChild(Tracklist._addTracklist())
        return container
    }



    static _reloadTracklist() {
        const container = document.getElementById("tracklist-container")
        const tracklist = document.getElementById("tracklist")
        if (tracklist) {
            container.removeChild(tracklist)
        }
        container.appendChild(this.addTracklist())
    }



    static _addContainer() {
        const container = document.createElement("div")
        container.id = "tracklist-container"
        container.classList.add("tracklist-display")
        return container
    }



    static _addTitle() {
        const title = document.createElement("div")
        title.id = "tracklist-title"
        title.classList.add("title")
        title.textContent = "Playlist"
        return title
    }


    
    static _addTracklist() {
        const tracklist = document.createElement("div")
        tracklist.id = "tracklist"

        tracklist.addEventListener("click", async (event) => {
            if (event.target.tagName !== "BUTTON") {
                return
            }
            if (event.target.classList.contains("track-tag-button")) {
                return await TracklistEvents.handleTrackTagButton(event)
            }
            if (event.target.classList.contains("track-play-button")) {
                return await TracklistEvents.handleTrackPlayButton(event)
            }
            if (event.target.classList.contains("track-delete-button")) {
                return await TracklistEvents.handleTrackDeleteButton(event)
            }
            if (event.target.classList.contains("confirm-delete-button")) {
                return await TracklistEvents.handleTrackConfirmButton(event)
            }
            if (event.target.classList.contains("cancel-delete-button")) {
                return await TracklistEvents.handleTrackCancelButton(event)
            }
        })
        
        for (const track of dataController.trackData) {
            tracklist.appendChild(Track.create(track))
        }
        return tracklist       
    }


}



class TracklistEvents {

    static async handleTrackTagButton(event) {
        const button = event.target
        const trackId = button.getAttribute("data-track-id")
        const taglistContainer = document.getElementById(`taglist-container-${trackId}`)
        const taglistContainers = document.getElementsByClassName("taglist-container")
        const track = document.getElementById(`track-${trackId}`)
        if (taglistContainer) {
            taglistContainer.remove()
            track.classList.remove("track-open-taglist")
            return
        }
        if (taglistContainers.length > 0) {
            taglistContainers[0].parentElement.classList.remove("track-open-taglist")
            taglistContainers[0].remove()

        }
        const taglist = await TaglistElements.create(trackId)
        track.classList.add("track-open-taglist")
        track.appendChild(taglist)
    }

    static async handleTrackPlayButton(event) {
        const button = event.target
        const audioElement = document.getElementById("audio-element")
        const trackId = button.getAttribute("data-track-id")
        const pauseButton = document.getElementById("player-pause-button")
        if (button.classList.contains("now-playing")) {
            audioElement.src = await dataController.fetchAudioSource(trackId) 
            pauseButton.children[0].src = "./images/pause-32.png"
            audioElement.play()
            return
        } else {
            const playButtons = document.getElementsByClassName("track-play-button")
            for (const playButton of playButtons) {
                playButton.classList.remove("now-playing")
                playButton.parentElement.parentElement.classList.remove("track-now-playing")
            }
            button.classList.add("now-playing")
            button.parentElement.parentElement.classList.add("track-now-playing")
        }
        audioElement.src = await dataController.fetchAudioSource(trackId) 
        pauseButton.children[0].src = "./images/pause-32.png"
        audioElement.play()
    }

    static async handleTrackDeleteButton(event) {
        const button = event.target
        const trackId = button.getAttribute("data-track-id")
        const deleteButtonContainer = document.getElementById(`delete-button-container-${trackId}`)
        const confirm = createButton(`confirm-delete-button-${trackId}`, ["track-button", "confirm-delete-button"], {"data-track-id": trackId}, "./images/checkmark-32.png", 18, 18)
        const cancel = createButton(`cancel-delete-button-${trackId}`, ["track-button", "cancel-delete-button"], {"data-track-id": trackId}, "./images/delete-2-32.png", 18, 18)
        console.log("before", deleteButtonContainer, confirm, cancel)
        deleteButtonContainer.appendChild(confirm)
        deleteButtonContainer.appendChild(cancel)
        console.log("after", deleteButtonContainer)
        button.remove()
    }

    static async handleTrackConfirmButton(event) {
        const confirm = event.target
        const trackId = confirm.getAttribute("data-track-id")
        await dataController.deleteTrack(trackId)
        await dataController.updateTrackDataNoFilter()
        const track = document.getElementById(`track-${trackId}`)
        track.remove()
    }

    static async handleTrackCancelButton(event) {
        const cancel = event.target
        const trackId = cancel.getAttribute("data-track-id")
        const trackInfoContainer = document.getElementById(`track-info-container-${trackId}`)
        const deleteButtonContainer = document.getElementById(`delete-button-container-${trackId}`)
        deleteButtonContainer.remove()
        trackInfoContainer.appendChild(DeleteButtonElement.create(trackId))
    }

}

class Track {

    static create(trackData) {
        const container = Track._addContainer(trackData.track_id)
        container.appendChild(Track._addTrackData(trackData))
        return container
    }

    static _addContainer(trackId) {
        const container = document.createElement("div")
        container.id = `track-${trackId}`
        container.setAttribute(`data-track-id`, trackId)
        container.classList.add("track")
        return container
    }
    
    static _addTrackData(trackData) {
        return TrackElements.create(trackData)
    }

}



class TrackElements {

    static create(trackData) {
        const container = TrackElements._addContainer(trackData.track_id)
        container.appendChild(TrackElements._addPlayButton(trackData.track_id))
        container.appendChild(TrackElements._addTitle(trackData.title))
        container.appendChild(TrackElements._addDuration(trackData.duration_sec))
        container.appendChild(TrackElements._addTagsButton(trackData.track_id))
        container.appendChild(TrackElements._addDeleteButton(trackData.track_id))
        return container
    }

    static _addContainer(trackId) {
        const container = document.createElement("div")
        container.id = `track-info-container-${trackId}`
        container.classList.add("track-info-container")
        return container
    }

    static _addPlayButton(trackId) {
        return PlayButtonElement.create(trackId)
    }

    static _addTitle(title) {
        return TitleElement.create(title)
    }

    static _addDuration(duration) {
        return DurationElement.create(duration)
    }

    static _addTagsButton(trackId) {
        return TagsButtonElement.create(trackId)
    }

    static _addDeleteButton(trackId) {
        return DeleteButtonElement.create(trackId)
    }

}



class PlayButtonElement {

    static create(trackId) {
        const button = createButton(`track-play-button-${trackId}`, ["track-button", "track-play-button"], {"data-track-id": trackId}, "./images/play-32.png", 15, 15)
        return button
    }

}

class TitleElement {

    static create(title) {
        const element = document.createElement("div")
        element.classList.add("track-title")
        element.textContent = title
        element.style.pointerEvents = 'none'
        return element
    }

}

class DurationElement {
    
    static create(duration) {
        const element = document.createElement("div")
        element.classList.add("track-duration")
        element.textContent = DurationElement.format(duration)
        element.style.pointerEvents = 'none'
        return element
    }

    static format(duration) {
        let x = {hours: 0, minutes: 0, seconds: 0, remainingDuration: duration}
        if (duration > 3600) {
            let x = DurationElement.hours(x)
            x = DurationElement.minutes(x)
            x = DurationElement.seconds(x)
            return `${x.hours}:${x.minutes}:${x.seconds}`
        } else {
            x = DurationElement.minutes(x)
            x = DurationElement.seconds(x)
            return `${x.minutes}:${x.seconds}`
        }
    }

    static hours(x) {
        x.hours = Math.floor(x.remainingDuration / 3600)
        x.remainingDuration = x.remainingDuration - (3600 * x.hours)
        if (x.hours < 10) {
            x.hours = `0${x.hours}`
        } else {
            x.hours = `${x.hours}`
        }
        return x
    }

    static minutes(x) {
        x.minutes = Math.floor(x.remainingDuration / 60)
        x.remainingDuration = x.remainingDuration - (60 * x.minutes)
        if (x.minutes < 10) {
            x.minutes = `0${x.minutes}`
        } else {
            x.minutes = `${x.minutes}`
        }
        return x
    }

    static seconds(x) {
        x.seconds = x.remainingDuration
        if (x.seconds < 10) {
            x.seconds = `0${x.seconds}`
        } else {
            x.seconds = `${x.seconds}`
        }
        return x
    }

}

class TagsButtonElement {

    static create(trackId) {
        const button = TagsButtonElement._addButton(trackId)
        return button
    }

    static _addButton(trackId) {
        const button = createButton(`track-tag-button-${trackId}`, ["track-button", "track-tag-button"], {"data-track-id": trackId}, "./images/tag-5-32.png", 18, 18)
        return button
    }

}

class DeleteButtonElement {

    static create(trackId) {
        const container = DeleteButtonElement._addContainer(trackId)
        container.appendChild(DeleteButtonElement._addDeleteButton(trackId))
        return container
    }

    static _addContainer(trackId) {
        const container = document.createElement("div")
        container.id = `delete-button-container-${trackId}`
        container.classList.add("delete-button-container")
        return container
    }

    static _addDeleteButton(trackId) {
        const button = createButton(`track-delete-button-${trackId}`, ["track-button", "track-delete-button"], {"data-track-id": trackId}, "./images/delete-32.png", 18, 18)
        return button
    }


}



export class TaglistElements {

    static async create(trackId) {
        await dataController.updateTagData(trackId)
        const container = TaglistElements._addContainer(trackId)
        container.appendChild(TaglistElements._addSaveTagButton(trackId))
        for (const tag of dataController.tagData) {
            container.appendChild(TagElement.create(tag.tag, trackId))
        }
        return container
    }

    static _addContainer(trackId) {
        const container = document.createElement("div")
        container.id = `taglist-container-${trackId}`
        container.classList.add("taglist-container")
        return container
    }

    static _addSaveTagButton(trackId) {
        const button = createButton(null, ["save-tag-button", "track-button"], {}, "./images/plus-32.png", 18, 18)
        button.addEventListener("click", () => {
            let modal = document.getElementById("add-tag-modal-container")
            if (modal) {
                modal.remove()
                return
            }
            modal = SaveTagModalElement.create(trackId)
            button.parentElement.appendChild(modal)
            // button.style.pointerEvents = "none"
        })
        return button
    }

}



class TagElement {

    static create(tagName, trackId) {
        const container = this._addContainer(trackId)
        container.appendChild(this._addTagName(tagName))
        container.appendChild(this._addDeleteButton(trackId, tagName))
        return container 
    }

    static _addContainer(trackId) {
        const container =  document.createElement("div")
        container.setAttribute("data-track-id", trackId)
        container.classList.add("tag")
        return container
    }

    static _addTagName(tagName) {
        const element = document.createElement("div")
        element.classList.add("tag-name")
        element.textContent = tagName
        return element
    }

    static _addDeleteButton(trackId, tagName) {
        const button = createButton(null, ["delete-tag-button"], {"data-track-id": trackId, "data-tag-name": tagName}, "./images/delete-32.png", 14, 14)
        button.addEventListener("click", async () => {
            await channels.deleteTagChannel.send({trackId: trackId, tagName: tagName})
            button.parentElement.remove()
        })
        return button
    }



}



class SaveTagModalElement {

    static create(trackId) {
        const container = SaveTagModalElement._addContainer()
        container.appendChild(SaveTagModalElement._addTagNameInput())
        container.appendChild(SaveTagModalElement._addSaveTagButton(trackId))
        return container
    }

    static _addContainer() {
        const container = document.createElement("div")
        container.id = "add-tag-modal-container"
        container.classList.add("modal")
        return container
    }

    static _addTagNameInput() {
        const input = document.createElement("input")
        input.id = "tag-name-input"
        input.classList.add("input-bar")
        input.placeholder = "Enter tag name..."
        return input
    }

    static _addSaveTagButton(trackId) {
        const button = createButton(null, ["save-tag-modal-button", "track-button"], {"data-track-id": trackId}, "./images/plus-32.png", 18, 18)
        button.addEventListener("click", async () => {
            const saveTagInput = document.getElementById("tag-name-input")
            const tagName = saveTagInput.value
            await channels.addTagChannel.send({trackId: trackId, tagName: tagName})
            const taglist = button.parentElement.parentElement
            taglist.appendChild(TagElement.create(tagName, trackId))
        })
        return button
    }
}



function expandContainer() {
    var mainContainer = document.getElementById('mainContainer');
    mainContainer.classList.toggle('expanded');
}

function openModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

function addWord() {
    var wordContainer = document.getElementById('wordContainer');
    var newWordBox = document.createElement('div');
    newWordBox.className = 'word-box';
    newWordBox.textContent = 'Word';
    wordContainer.appendChild(newWordBox);
}

function addWordFromInput() {
    var input = document.getElementById('wordInput');
    var word = input.value.trim();
    if (word !== "") {
        var wordContainer = document.getElementById('wordContainer');
        var newWordBox = document.createElement('div');
        newWordBox.className = 'word-box';
        newWordBox.textContent = word;
        wordContainer.appendChild(newWordBox);
        input.value = "";
        closeModal();
    }
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}