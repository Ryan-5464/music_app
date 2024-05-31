
const tracklist_container = document.getElementById("tracklist-container")
tracklist_container.addEventListener('click', handle_delete_button);


const LIMIT = 1


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
    constructor (channel_send, channel_receive) {
        this.channel_send = channel_send
        this.channel_receive = channel_receive
    }
    async send(sent_data) {
        try {
            await window.electronAPI.channelSend(this.channel_send, sent_data)
            const received_data = await new Promise((resolve, reject) => {
                window.electronAPI.channelReceive(this.channel_receive, (received_data, error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(received_data)
                    }
            
                })
            }) 
            return received_data
        } catch (error) {
            console.error(error.message);
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
                tag_div.textContent = tag
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
    await display_tracklist(1,2)
    addActiveToggleToTracks()
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



class Toggle {
    constructor (element, elements) {
        this.element = element
        this.elements = elements
    }
    active () {
        for (const element of this.elements) {
            if (element.classList.contains("active")) {
                element.classList.remove("active")
            }
        }
        if (this.element.classList.contains("active")) {
            this.element.classList.remove("active")
        }
        else {
            this.element.classList.add("active")
        }
    }
}

class Disable {
    constructor (element) {
        this.element = element
    }
    disable () {
        this.element.classList.remove("enabled")
        this.element.classList.add("disabled")
        this.element.disabled = true
    }
    enable () {
        this.element.classList.remove("disabled")
        this.element.classList.add("enabled")
        this.element.disabled = false
    }
}

function addActiveToggleToTracks() {
    const elements = document.getElementsByClassName('tracklist-row-container')
    for (const element of elements) {
        const toggle_instance = new Toggle(element, elements)
        element.addEventListener("click", () => toggle_instance.active())
    }
}

addActiveToggleToTracks()





// -- ALL TRACKS ---


const cycle_previous_button = document.getElementById("cycle-previous-button")
const previous_page_button = document.getElementById("previous-page-button")
const current_page_button = document.getElementById("current-page-button")
const next_page_button = document.getElementById("next-page-button")
const cycle_next_button = document.getElementById("cycle-next-button")

const page_container = document.getElementById("page-container")
cycle_previous_button.addEventListener("click", handle_pages)
previous_page_button.addEventListener("click", handle_pages)
next_page_button.addEventListener("click", handle_pages)
cycle_next_button.addEventListener("click", handle_pages)

async function handle_pages(event) {
    event.stopPropagation()
    if (event.target.tagName === 'BUTTON') {
        const button_id = event.target.id
        
        if (button_id === "cycle-previous-button") {
            await handle_cycle_previous_page_button()
        }

        if (button_id === "cycle-next-button") {
            await handle_cycle_next_page_button()
        }

        if (button_id === "previous-page-button") {
            await handle_previous_page_button()
        }

        if (button_id === "next-page-button") {
            await handle_next_page_button()
        }

        
        
    }
}


async function handle_cycle_previous_page_button() {
    console.log("handle previous cycle")
    const current_page = Number(current_page_button.innerHTML)
    cycle_previous_button.disabled = false
    if (current_page === 2) {
        previous_page_button.innerHTML = "1"
        cycle_previous_button.disabled = true
    }
    else {
        previous_page_button.innerHTML = current_page - 2
        current_page_button.innerHTML = current_page - 1
        next_page_button.innerHTML = current_page
    }
    page = current_page - 1
    const tracks = await request_data("tracks-subset-send", "tracks-subset-receive", {page: page, limit: LIMIT})
    await display_most_recent_tracklist(tracks)
}

async function handle_previous_page_button() {
    console.log("handle previous button")
    const current_page = Number(current_page_button.innerHTML)
    previous_page_button.innerHTML = current_page - 2
    current_page_button.innerHTML = current_page - 1
    next_page_button.innerHTML = current_page
    page = current_page - 1
    const tracks = await request_data("tracks-subset-send", "tracks-subset-receive", {page: page, limit: LIMIT})
    await display_most_recent_tracklist(tracks)

}

async function handle_next_page_button() {
    console.log("handle next button")
    const current_page = Number(current_page_button.innerHTML)
    previous_page_button.innerHTML = current_page 
    current_page_button.innerHTML = current_page + 1
    next_page_button.innerHTML = current_page + 2
    page = current_page + 1
    const tracks =  await request_data("tracks-subset-send", "tracks-subset-receive", {page: page, limit: LIMIT})
    await display_most_recent_tracklist(tracks)
}

async function handle_cycle_next_page_button() {
    console.log("handle next cycle")
    const current_page = Number(current_page_button.innerHTML)
    previous_page_button.innerHTML = current_page 
    current_page_button.innerHTML = current_page + 1
    next_page_button.innerHTML = current_page + 2
    page = current_page + 1
    const tracks =  await request_data("tracks-subset-send", "tracks-subset-receive", {page: page, limit: LIMIT})
    await display_most_recent_tracklist(tracks)
}



class AllTracks {

    async display() {


    }

    async get(limit) {
        try {
    
            await window.electronAPI.channelSend('request-all-tracks', {limit: limit})

            const tracks = await new Promise( (resolve, reject) => {
                window.electronAPI.channelReceive('receive-all-tracks', (tracks) => {
                    resolve(tracks)
                })
                
            })
            console.log("tracklist", tracks)
            return tracks

        } 
        catch (error) {
            console.error(error.message)
        }
    } 
}


//const all_tracks = AllTracks()
//all_tracks.display()


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function download_text(text) {
    download_progress.textContent = text
}
