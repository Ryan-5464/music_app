import { Track } from "./rdr/trackElementFactory.js"
import { CentreDisplayController } from "./rdr/centreDisplayController.js"
import { LeftSiderbar } from "./rdr/leftSidebar.js"
import { Body } from "./body.js"



const body = new Body()


document.addEventListener("DOMContentLoaded", () => {
    document.appendChild(body.makeElement())
})




const tracklist_container = document.getElementById("tracklist-container")
tracklist_container.addEventListener('click', handle_delete_button);


const LIMIT = 2


execute_onload_functions()

function execute_onload_functions() {
    display_track_count()
}



class ResultSet {
    constructor (page, limit) {
        this.page = page
        this.limit = limit
        this.result_set = null
    }
}

class Track {
    constructor (
        track_id=null, url=null, duration_sec=null, local_path=null,
        file_size_b=null , title=null, times_played=null, date_downloaded=null,
        tags=[]
    ) {
        this.track_id = track_id
        this.url = url
        this.duration_sec = duration_sec
        this.local_path = local_path
        this.file_size_b = file_size_b
        this.title = title
        this.times_played = times_played
        this.date_downloaded = date_downloaded
        this.tags = tags
    }
}

class Channel {
    constructor(channel_send, channel_receive) {
        this.channel_send = channel_send;
        this.channel_receive = channel_receive;
        this.listener = null;
    }

    async send(sent_data) {

        try {
            await window.electronAPI.channelSend(this.channel_send, sent_data);
            const received_data = await new Promise((resolve, reject) => {
                this.listener = (received_data, error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(received_data)
                    }
                };
                window.electronAPI.channelReceive(this.channel_receive, this.listener);
            })
            this.close()
            return received_data
        } catch (error) {
            console.error(error.message)
        }
    }

    close() {
        if (this.listener) {
            window.electronAPI.removeListener(this.channel_receive, this.listener)
            this.listener = null
        }
    }
}

// class Track {
//     constructor (track_id, title, duration, tags) {
//         this.track_id = track_id
//         this.title = title
//         this.duration = duration
//         this.tags = tags
//     }
// }

class TrackContainerFactory {
    constructor () {
        this.track_container = null
    }
    create_track_container(track) {
        this.track_container = document.createElement('ul')
        this.track_container.classList.add("tracklist-row-container")
        this.track_container.id = track.track_id
        this.add_track_title(track.title)
        this.add_duration(track.duration_sec)
        this.add_tags(track.tags)
        this.add_delete_button(track.track_id)
        return this.track_container
    }
    add_track_title(title) {
        const title_container = document.createElement('li')
        title_container.classList.add("track-name")
        title_container.classList.add("tracklist-row-item")
        title_container.textContent = title
        this.track_container.appendChild(title_container)
    }
    add_duration(duration) {
        const duration_container = document.createElement('li')
        duration_container.classList.add("duration")
        duration_container.classList.add("tracklist-row-item")
        duration_container.textContent = duration
        this.track_container.appendChild(duration_container)
    }
    add_tags(tags) {
            const tags_container = document.createElement("li")
            tags_container.classList.add("tags")
            tags_container.classList.add("tracklist-row-item")
            const tags_list = document.createElement("ul")
            tags_list.classList.add("tagslist-container")
            for (const tag of tags) {
                const tag_div = document.createElement("li")
                tag_div.classList.add("tag")
                tag_div.classList.add("tracklist-row-item")
                tag_div.classList.add("cherry-yellow-gradient")
                tag_div.textContent = JSON.stringify(tag.tag, null, 2)
                tags_list.appendChild(tag_div)
            }
            tags_container.appendChild(tags_list)
            this.track_container.appendChild(tags_container)
    }
    add_delete_button(track_id) {
        const delete_button = document.createElement("button")
        delete_button.classList.add("delete_icon")
        delete_button.id = track_id
        this.track_container.appendChild(delete_button)
    }
}

class TrackDisplay {
    display(track_container_list) {
        const tracklist = document.getElementById("tracklist")
        tracklist.innerHTML = ''
        for (const track_container of track_container_list) {
            tracklist.appendChild(track_container)
        }
    }
}

async function display_tracklist(page, limit) {
    let result_set = new ResultSet(page, limit)
    const cnl = new Channel("track-set-send", "track-set-receive")
    result_set = await cnl.send(result_set)
    const track_container_factory = new TrackContainerFactory()
    const track_container_list = []
    for (const result of result_set.result_set) {
        const track = new Track(        
            result.track_id, null, result.duration_sec, null,
            null , result.title, null, null,
            tags=result.tags
        )
        console.log("trackssss", track)
        const track_container = track_container_factory.create_track_container(track)
        track_container_list.push(track_container)
    }
    const track_display = new TrackDisplay()
    track_display.display(track_container_list)
}


async function handle_delete_button(event) {

    if (event.target.tagName === 'BUTTON') {

        const button_id = event.target.id
        console.log(button_id)

        try {
            await request_data('delete-track-send', 'delete-track-receive', { track_id: button_id})
            location.reload()
            fetch_track_list_by_tags()
        } 

        catch (error) {
            console.error(error)
        }

    }
}


async function display_track_count() {
    const track_count = await request_track_count()
    console.log("track count", track_count)
    const track_count_div = document.getElementById("track_count")
    track_count_div.innerHTML = `1 - 10 of ${track_count}`
}


async function request_track_count() {
    try {
        const received_data = await request_data("track-count-send", "track-count-receive", {})   
        console.log("received_data", received_data)
        return received_data
    }
    catch(error) {
        console.log("error")
        console.log(error.message)
    }
}











// function toggle_tags_button() {
//     if (toggle_any_button.classList.contains('active')) {
//         toggle_any_button.classList.remove('active');
//         toggle_all_button.classList.add('active');
//         fetch_track_list_by_tags();
//     }
//     else {
//         toggle_all_button.classList.remove('active');
//         toggle_any_button.classList.add('active');
//         fetch_track_list_by_tags();
//     }
// }



// async function fetch_track_list_by_tags() {
//     try {
//         const tags = tags_input_box.value.split(',').map(tag => tag.trim());
//         const any_button_active = toggle_any_button.classList.contains('active');
//         const tracklist = await fetch_tags_tracklist(tags, any_button_active);
//         console.log("tracklist", tracklist);
//         display_tags_tracklist(tracklist);
//     }
//     catch (error) {
//         console.error(error.message);
//     }
// }


// async function download_audio_from_url() {

//     try {

//         const url = download_audio_input_box.value
//         await window.electronAPI.channelSend('channelSend', { url: url })
//         const result = await new Promise((resolve, reject) => {
//             window.electronAPI.channelReceive('channelReceive', (result) => {
//                 resolve(result)
//             })
//         }) 
//         location.reload()
    
//     }

//     catch (error) {
//         console.error(error.message);
//     }
// };



// function display_tags_tracklist(tracklist) {
//     tags_track_list.innerHTML = ''; 
//     tracklist.forEach(track => {
//         const list_item = document.createElement('li');
//         list_item.textContent = track.alias;
//         const button = document.createElement('button');
//         button.textContent = "del";
//         const tag = document.createElement('button');
//         tag.textContent = "add tag";
//         button.id = track.audio_id;
//         tags_track_list.appendChild(list_item);
//         list_item.appendChild(tag);
//         list_item.appendChild(button);
//     });
// }

// function display_untagged_tracks(tracklist) {
//     untagged_tracks_list.innerHTML = ''; 
//     tracklist.forEach(track => {
//         const list_item = document.createElement('li');
//         list_item.textContent = track.alias;
//         const button = document.createElement('button');
//         button.textContent = "del";
//         const tag = document.createElement('button');
//         tag.textContent = "add tag";
//         button.id = track.audio_id;
//         untagged_tracks_list.appendChild(list_item);
//         list_item.appendChild(tag);
//         list_item.appendChild(button);
//     });
// }



// function display_saved_playlists(playlists) {
//     saved_playlists_list.innerHTML = '';
//     playlists.forEach(playlist => {
//         const list_item = document.createElement('li');
//         list_item.textContent = playlist.playlist_name + "--" + playlist.tags;
//         const button = document.createElement('button');
//         button.textContent = "del";
//         button.id = playlist.tags;
//         saved_playlists_list.appendChild(list_item);
//         list_item.appendChild(button);
//     });
// }



// async function fetch_tags_tracklist(tags, any_button_active) {

//     try {

//         await window.electronAPI.channelSend('persistent-to-main', { tags: tags, any_button_active: any_button_active})
//         const result = await new Promise( (resolve, reject) => {
//             window.electronAPI.channelReceive('persistent-from-main', (result) => {
//                 resolve(result)
//             })
            
//         })
//         console.log("tracklist", result)
//         return result

//     } 
//     catch (error) {
//         console.error(error.message)
//     }
// }






document.addEventListener('DOMContentLoaded', async () => {
    await display_tracklist(1,LIMIT)
    addActiveToggleToTracks()
    add_page_buttons(LIMIT)
});





const download_button = document.getElementById("download-button")
const download_input_box = document.getElementById("download-input-box")
download_button.addEventListener("click", download_track_from_url)


const download_progress = document.getElementById("download-progress")



async function download_track_from_url() {
    try {
        const url = download_input_box.value
        if (url === "") {
            download_text("Enter a URL to starting downloading")
            await sleep(3000);
            download_text("")
            return
        }
        download_text("Downloading track...")
        const received_data = await request_data('download-track-send', 'download-track-receive', { url: url })
        download_text(received_data)
        await sleep(3000)
        download_text("")
    }
    catch (error) {
        console.error(error.message);
    }
}


class Tag {
    constructor (elements) {
        this.elements = elements
    }
    async tag_track(tag) {
        console.log("tag track  triggered")
        for (const element of this.elements) {
            if (element.classList.contains("active")) {
                console.log("active triggered")
                const track_id = element.id
                const channel = new Channel("create-tag-send", "create-tag-receive")
                const reply = await channel.send({track_id: track_id, tag: tag})
                console.log("reply ", reply)
            }
        }
    }
}




class Toggle {
    constructor (element, elements) {
        this.element = element
        this.elements = elements
    }
    active () {
        if (this.element.classList.contains("active")) {
            this.element.classList.remove("active")
            return
        }
        for (const element of this.elements) {
            if (element.classList.contains("active")) {
                element.classList.remove("active")
            }
        }
        this.element.classList.add("active")
        this.display_taglist()
    }
    async display_taglist() {
        console.log("triggrered")
        const channel = new Channel("fetch-tags-send", "fetch-tags-receive")
        const tags = await channel.send({track_id: this.element.id})
        const right_sidebar = document.getElementById("right-sidebar")
        right_sidebar.innerHTML = ""
        const title = document.createElement("div")
        title.innerHTML = "Tags List"
        right_sidebar.appendChild(title)
        const tags_input = document.createElement("input")
        tags_input.id = "tags-input-box"
        right_sidebar.appendChild(tags_input)
        const tags_input_button = document.createElement("button")
        tags_input_button.id = "tags-input-button"
        tags_input_button.addEventListener("click", () => {this.add_tag()})
        tags_input_button.textContent = "Add Tag"
        right_sidebar.appendChild(tags_input_button)
        const tags_list = document.createElement("ul")
        right_sidebar.appendChild(tags_list)
        for (const tag of tags) {
            const li = document.createElement("li")
            const del = document.createElement("button")
            li.innerHTML = JSON.stringify(tag.tag, null, 2)
            del.classList.add("delete_icon")
            del.id = this.element.id
            del.addEventListener("click", this.delete_tag)
            li.appendChild(del)
            li.classList.add("tag")
            li.classList.add("tracklist-row-item")
            li.classList.add("cherry-yellow-gradient")
            tags_list.appendChild(li)
        }
    }
    async add_tag() {
        console.log("add tag triggered")
        const tags_input_box = document.getElementById("tags-input-box")
        const tag_name = tags_input_box.value
        const elements = document.getElementsByClassName('tracklist-row-container')
        const tag = new Tag(elements)
        tag.tag_track(tag_name)
        location.reload()
        this.display_taglist()
    } 
    async delete_tag(event) {

        const button_id = event.target.id
        const tag = event.target.parentElement.textContent.replace(/['"]/g, '')
        console.log("tagxxx", tag)
        console.log(button_id)

        await request_data('delete-tag-send', 'delete-tag-receive', { track_id: button_id, tag: tag})
        // this.display_taglist()

    }
}

// class Disable {
//     constructor (element) {
//         this.element = element
//     }
//     toggle_disable () {
//         if (this.element.classList.contains("enabled")) {
//             this.element.classList.remove("enabled")
//             this.element.classList.add("disabled")
//             this.element.disabled = true
//         }
//         if (this.element.classList.contains("disabled")) {
//             this.element.classList.remove("disabled")
//             this.element.classList.add("enabled")
//             this.element.disabled = false
//         }
//     }
// }

function addActiveToggleToTracks() {
    const elements = document.getElementsByClassName('tracklist-row-container')
    for (const element of elements) {
        const toggle_instance = new Toggle(element, elements)
        element.addEventListener("click", () => toggle_instance.active())
    }
}








const page_container = document.getElementById("page-container")
page_container.addEventListener("click", handle_pages)


async function add_page_buttons(limit) {
    current_page_button.innerHTML = "1"
    const track_count = await request_track_count()
    const pages = track_count / limit
    if (pages > 1) {
        next_page_button.innerHTML = "2"
        last_page_button.innerHTML = ">|"
    }
}

async function handle_pages(event) {
    event.stopPropagation()
    if (event.target.tagName === 'BUTTON') {
        const button_id = event.target.id
        
        if (button_id === "first-page-button") {
            await handle_first_page_button(LIMIT)
        }

        if (button_id === "last-page-button") {
            await handle_last_page_button(LIMIT)
        }

        if (button_id === "previous-page-button") {
            await handle_previous_page_button(LIMIT)
        }

        if (button_id === "next-page-button") {
            await handle_next_page_button(LIMIT)
        }
    }
    addActiveToggleToTracks()
}


const first_page_button = document.getElementById("first-page-button")
const last_page_button = document.getElementById("last-page-button")
const previous_page_button = document.getElementById("previous-page-button")
const next_page_button = document.getElementById("next-page-button")
const current_page_button = document.getElementById("current-page-button")

async function handle_first_page_button(limit) {
    await display_tracklist(1,limit)
    first_page_button.disabled = true
    last_page_button.disabled = false
    next_page_button.disabled = false
    previous_page_button.disabled = true
    first_page_button.innerHTML = ""
    last_page_button.innerHTML = ">|"
    next_page_button.innerHTML = "2"
    previous_page_button.innerHTML = ""
    current_page_button.innerHTML = "1"
}

async function handle_last_page_button(limit) {
    const track_count = await request_track_count()
    const page = Math.ceil(Number(track_count) / limit)
    await display_tracklist(page,limit)
    first_page_button.disabled = false
    last_page_button.disabled = true
    next_page_button.disabled = true
    previous_page_button.disabled = false
    previous_page_button.innerHTML = page - 1
    first_page_button.innerHTML = "|<"
    last_page_button.innerHTML = ""
    next_page_button.innerHTML = ""
    previous_page_button.innerHTML = `${page - 1}`
    current_page_button.innerHTML = page
}

async function handle_previous_page_button(limit) {
    const current_page = Number(current_page_button.innerHTML)
    const page = current_page - 1
    if (page === 1) {
        await handle_first_page_button(limit)
        return
    }
    else {
        await display_tracklist(page,limit)
        previous_page_button.innerHTML = current_page - 2
        next_page_button.innerHTML = current_page
        current_page_button.innerHTML = current_page - 1
    }
}

async function handle_next_page_button(limit) {
    const current_page = Number(current_page_button.innerHTML)
    const page = current_page + 1
    const track_count = await request_track_count()
    const last_page = Math.ceil(Number(track_count) / limit)
    if (page === last_page) {
        handle_last_page_button(limit)
        return
    }
    else {
        await display_tracklist(page,limit)
        next_page_button.innerHTML = current_page + 2
        previous_page_button.innerHTML = current_page 
        current_page_button.innerHTML = current_page + 1
    }
}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function download_text(text) {
    download_progress.textContent = text
}



class PlayerPanel {

    constructor () {
        this.panel = document.getElementById("middle-container")
    }

    addListener() {
        const button = document.getElementById("all-tracks-option")
        button.addEventListener("click", () => {
            this.display()
        })
    }

    display() {
        this.resetPanel()
        this.addTagsSearchBar()
        this.addTrackList()
        this.addPlayerControls()
    }

    resetPanel() {
        this.panel.innerHTML = ''
    }

    addPlayerControls() {

    }

    addTagsSearchBar() {
        const parentElement = this.panel
        const tagsSearchBar = new TagsSearchBar(parentElement)
        tagsSearchBar.display()
    }

    addTrackList() {
        const parentElement = this.panel
        const trackListPanel = new TrackListPanel(parentElement)
        trackListPanel.display()
    }

}

class TagsSearchBar {

    constructor(parentElement) {
        this.parentElement = parentElement;
        this.channel = new Channel("fetch-tracks-by-tag--send", "fetch-tracks-by-tag--receive")
    }

    display() {
        this.createContainer()
        this.addSearchBar()
        this.addSearchTypeButtons()
    }

    createContainer() {
        const container = document.createElement("div")
        container.id = "tags-search-bar-container"
        this.parentElement.appendChild(container)
    }

    addSearchBar() {
        const searchBar = document.createElement("input");
        searchBar.id = "tags-search-bar";
        searchBar.addEventListener("input", async () => {
            await this.displayTracks()
        });
        this.parentElement.appendChild(searchBar)
    }

    async displayTracks() {
        const tracks = await this.fetchTracksByTag(this.channel)
        const trackListPanel = new TrackListPanel(this.parentElement)
        trackListPanel.resetPanel()
        trackListPanel.addTrackListPanelToParent()
        trackListPanel.addTracks(tracks)
    }

    addSearchTypeButtons() {
        const anyButton = document.createElement("button")
        anyButton.id = "tags-search-bar-any-button"
        anyButton.textContent = "Any"
        anyButton.addEventListener("click", () => {
            this.toggleActive(anyButton, allButton)
        })
        
        const allButton = document.createElement("button")
        allButton.id = "tags-search-bar-all-button"
        allButton.textContent = "All"
        allButton.classList.add("active")
        allButton.addEventListener("click", () => {
            this.toggleActive(anyButton, allButton)
        })

        this.parentElement.appendChild(anyButton) 
        this.parentElement.appendChild(allButton)
    }

    toggleActive(buttonA, buttonB) {
        if (buttonA.classList.contains("active")) {
            buttonA.classList.remove("active")
            buttonB.classList.add("active")
            this.displayTracks()
        } 
        else {
            buttonB.classList.remove("active")
            buttonA.classList.add("active")
            this.displayTracks()
        }
    }

    async fetchTracksByTag(channel) {
        console.log("239g23f93b2qf")
        const tagsSearchBar = document.getElementById("tags-search-bar")
        const tags = tagsSearchBar.value.split(',').map(tag => tag.trim())
        console.log("bfeiuwbfiew", tags)
        const anyButton = document.getElementById("tags-search-bar-any-button")
        let tracks = []
        if (anyButton.classList.contains("active")) {
            tracks = await channel.send({ tags: tags, anyButtonActive: true })
        }
        else {
            tracks = await channel.send({ tags: tags, anyButtonActive: false })
        }
        return tracks
    }
}



// async function fetch_track_list_by_tags() {
//     try {
//         const tags = tags_input_box.value.split(',').map(tag => tag.trim());
//         const any_button_active = toggle_any_button.classList.contains('active');
//         const tracklist = await fetch_tags_tracklist(tags, any_button_active);
//         console.log("tracklist", tracklist);
//         display_tags_tracklist(tracklist);
//     }
//     catch (error) {
//         console.error(error.message);
//     }
// }


class DownloadPanel {

}

class TagPanel {

}

class TrackListPanel {

    constructor (parentElement) {
        this.parentElement = parentElement
        this.container = null
    }

    async display() {
        this.resetPanel()
        this.addTrackListPanelToParent()
        console.log("XXX triggered")
        const tracks = await this.fetchTracks()
        console.log("XXX tracks", tracks)
        this.addTracks(tracks)
    }

    addTrackListPanelToParent() {
        this.container = document.createElement("div")
        this.container.id = "tracklist-panel"
        const tagsSearchBar = document.getElementById("tags-search-bar")
        this.parentElement.insertBefore(this.container, tagsSearchBar)
    }

    resetPanel() {
        const trackListPanel = document.getElementById("tracklist-panel")
        if (trackListPanel) {
            trackListPanel.remove()
        }
    }

    addTracks(tracks) {
        const trackFactory = new TrackFactory()
        for (const _track of tracks) {
            const track = trackFactory.createTrack(_track.track_id, _track.title, _track.duration_sec, _track.tags)
            this.container.appendChild(track)
        }
    }

    async fetchTracks() {
        const channel = new Channel("fetch-tracks--send", "fetch-tracks--receive")
        const tracks = await channel.send({})
        return tracks
    }
}

class TrackFactory {

    constructor () {
        this.container = null
    }

    createTrack(trackId, title, duration, tags) {
        this.createTrackContainer(trackId)
        this.addTitle(trackId, title)
        this.addDuration(trackId, duration)
        this.addTagList(trackId, tags)
        return this.container
    }

    createTrackContainer(trackId) {
        this.container = null
        this.container = document.createElement('ul')
        this.container.setAttribute("data-track-id", trackId)  
        this.container.classList.add("player-track-container")
    }

    addTitle(trackId, _title) {
        const title = document.createElement('li')
        title.setAttribute("data-track-id", trackId) 
        title.classList.add("player-track-title")
        title.textContent = _title
        this.container.appendChild(title)
    }

    addDuration(trackId, _duration) {
        const duration = document.createElement('li')
        duration.setAttribute("data-track-id", trackId) 
        duration.classList.add("player-track-duration")
        duration.textContent = _duration
        this.container.appendChild(duration)
    }

    addTagList(trackId, tags) {
        const tagList = document.createElement('ul')
        this.container.setAttribute("data-track-id", trackId) 
        tagList.classList.add("player-track-tags-list")
        const tagFactory = new TagFactory()
        console.log("taga", tags)
        for (const _tag of tags) {
            const tag = tagFactory.createTag(trackId, _tag.tag)
            tagList.appendChild(tag)
        }
        this.container.appendChild(tagList)

    }

}

class TagFactory {

    constructor () {
        this.container = null
    }

    createTag(trackId, tag) {
        this.createTagContainer(trackId)
        this.addTag(trackId, tag)
        this.addDeleteButton(trackId)
        return this.container
    }
    
    createTagContainer(trackId) {
        this.container = null
        this.container = document.createElement('ul')
        this.container.setAttribute("data-track-id", trackId) 
        this.container.classList.add("player-track-tag-container")
    }

    addTag(trackId, tag) {
        const tagName = document.createElement('li')
        tagName.setAttribute("data-track-id", trackId)
        tagName.classList.add("player-track-tag-name")
        if (tag !== undefined) {
            tagName.textContent = JSON.stringify(tag, null, 2).replace(/['"]/g, '')

        }
        this.container.appendChild(tagName)
    }

    addDeleteButton(trackId) {
        const deleteButton = document.createElement("button")
        deleteButton.setAttribute("data-track-id", trackId)
        deleteButton.classList.add("player-track-tag-delete-button")
        this.container.appendChild(deleteButton)
    }

}

//////////////////////////////////////////////////////////////////



const playerPanel = new PlayerPanel()
playerPanel.addListener()


const audioElement = document.getElementById('myAudio');

// Function to play the audio
async function playAudio() {
    
    const channel = new Channel("play-track--send", "play-track--receive")
    const dataurl = await channel.send({trackId: "2bPYEk_FGr0"})
    return dataurl
}

// Function to pause the audio
function pauseAudio() {
    audioElement.pause();
}

// Function to stop the audio (pause and reset the time)
function stopAudio() {
    audioElement.pause();
    audioElement.currentTime = 0;
}

document.addEventListener('DOMContentLoaded', () => {
    const audioElement = document.getElementById('myAudio');
    const playButton = document.getElementById('playButton');
  
    playButton.addEventListener('click', async () => {
      try {
        const dataurl = await playAudio()
        audioElement.src = dataurl;
        audioElement.play();
      } catch (error) {
        console.error('Error playing song:', error);
      }
    });
    const audio = document.getElementById('myAudio');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');

    // Update the progress bar as the audio plays
    audio.addEventListener('timeupdate', () => {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percentage}%`;
    });

    // Seek to a different part of the audio when clicking on the progress bar
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / rect.width) * audio.duration;
        audio.currentTime = newTime;
    });
});