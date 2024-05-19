const download_audio_button = document.getElementById('download-audio-button');
const download_audio_input_box = document.getElementById("download-audio-input-box");
const tags_track_list = document.getElementById('tags-track-list');
const save_tags_playlist_button = document.getElementById('save-tags-playlist-button');
const tags_input_box = document.getElementById('tags-input-box');
const toggle_any_button = document.getElementById('toggle-any-button');
const toggle_all_button = document.getElementById('toggle-all-button');
const playlist_name_input_box = document.getElementById('playlist-name-input-box');
const saved_playlists_list = document.getElementById('saved-playlists-list')
const untagged_tracks_list = document.getELementById('untagged-track-list')


window.onload = execute_onload_functions();
download_audio_button.addEventListener("click", download_audio_from_url);
tags_input_box.addEventListener('input', fetch_track_list_by_tags);
toggle_any_button.addEventListener('click', toggle_tags_button);
toggle_all_button.addEventListener('click', toggle_tags_button);
tags_track_list.addEventListener('click', handle_delete_button);



async function save_tags_playlist() {
    let tags = tags_input_box.value;
    const any_button_active = toggle_any_button.classList.contains('active');
    const playlist_name = playlist_name_input_box.value;
    await window.electronAPI.channelSend('save-tags-playlist-send', { tags: tags, playlist_name: playlist_name});
    const playlists = await window.electronAPI.channelReceive('save-tags-playlist-receive');
    tags = tags_input_box.value.split(',').map(tag => tag.trim());
    const tracklist = await fetch_tags_tracklist(tags, any_button_active);
    console.log("tracklist", tracklist);
    display_tags_tracklist(tracklist);
    display_saved_playlists(playlists);

}



function execute_onload_functions() {
    fetch_track_list_by_tags('');
}



async function handle_delete_button(event) {

    if (event.target.tagName === 'BUTTON') {

        const button_id = event.target.id
        console.log(button_id)

        try {
            await window.electronAPI.channelSend('delete-track-send', { audio_id: button_id})
            await window.electronAPI.channelReceive('delete-track-receive')
            location.reload()
            fetch_track_list_by_tags()
        } 

        catch (error) {
            console.error(error)
        }

    }
}



async function handle_untagged_tracks_list () {

    try {

        await window.electronAPI.channelSend('untagged-tracks-send', { signal: true })
        const result = await new Promise((resolve, reject) => {
            window.electronAPI.channelReceive('untagged-tracks-receive', (result) => {
                resolve(result)
            })
        }) 
        console.log(result)
        location.reload()
    
    }

    catch (error) {
        console.error(error.message);
    }

}





function toggle_tags_button() {
    if (toggle_any_button.classList.contains('active')) {
        toggle_any_button.classList.remove('active');
        toggle_all_button.classList.add('active');
        fetch_track_list_by_tags();
    }
    else {
        toggle_all_button.classList.remove('active');
        toggle_any_button.classList.add('active');
        fetch_track_list_by_tags();
    }
}



async function fetch_track_list_by_tags() {
    try {
        const tags = tags_input_box.value.split(',').map(tag => tag.trim());
        const any_button_active = toggle_any_button.classList.contains('active');
        const tracklist = await fetch_tags_tracklist(tags, any_button_active);
        console.log("tracklist", tracklist);
        display_tags_tracklist(tracklist);
    }
    catch (error) {
        console.error(error.message);
    }
}


async function download_audio_from_url() {

    try {

        const url = download_audio_input_box.value
        await window.electronAPI.channelSend('channelSend', { url: url })
        const result = await new Promise((resolve, reject) => {
            window.electronAPI.channelReceive('channelReceive', (result) => {
                resolve(result)
            })
        }) 
        location.reload()
    
    }

    catch (error) {
        console.error(error.message);
    }
};



function display_tags_tracklist(tracklist) {
    tags_track_list.innerHTML = ''; 
    tracklist.forEach(track => {
        const list_item = document.createElement('li');
        list_item.textContent = track.alias;
        const button = document.createElement('button');
        button.textContent = "del";
        button.id = track.audio_id;
        tags_track_list.appendChild(list_item);
        list_item.appendChild(button);
    });
}



function display_saved_playlists(playlists) {
    saved_playlists_list.innerHTML = '';
    playlists.forEach(playlist => {
        const list_item = document.createElement('li');
        list_item.textContent = playlist.playlist_name + "--" + playlist.tags;
        const button = document.createElement('button');
        button.textContent = "del";
        button.id = playlist.tags;
        saved_playlists_list.appendChild(list_item);
        list_item.appendChild(button);
    });
}



async function fetch_tags_tracklist(tags, any_button_active) {

    try {

        await window.electronAPI.channelSend('persistent-to-main', { tags: tags, any_button_active: any_button_active})
        const result = await new Promise( (resolve, reject) => {
            window.electronAPI.channelReceive('persistent-from-main', (result) => {
                resolve(result)
            })
            
        })
        console.log("tracklist", result)
        return result

    } 
    catch (error) {
        console.error(error.message)
    }
}





