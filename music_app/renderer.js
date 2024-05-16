const downloadAudioButton = document.getElementById('download-audio-button');
const downloadAudioInputBox = document.getElementById("download-audio-input-box");
const tagsTrackList = document.getElementById('tags-track-list');
const saveTagsPlaylistButton = document.getElementById('save-tags-playlist-button');
const tagsInputBox = document.getElementById('tags-input-box');
const toggleAnyButton = document.getElementById('toggle-any-button');
const toggleAllButton = document.getElementById('toggle-all-button');
const playlistNameInputBox = document.getElementById('playlist-name-input-box');
const savedPlaylistsList = document.getElementById('saved-playlists-list')



window.onload = executeOnloadFunctions();
downloadAudioButton.addEventListener("click", downloadAudioFromUrl);
tagsInputBox.addEventListener('input', fetchTrackListByTags);
toggleAnyButton.addEventListener('click', toggleTagsButton);
toggleAllButton.addEventListener('click', toggleTagsButton);
tagsTrackList.addEventListener('click', handleDeleteButtons);



async function saveTagsPlaylist() {
    let tags = tagsInputBox.value;
    const anyButtonActive = toggleAnyButton.classList.contains('active');
    const playlistName = playlistNameInputBox.value;
    await window.electronAPI.channelSend('save-tags-playlist-send', { tags: tags, playlistName: playlistName});
    const playlists = await window.electronAPI.channelReceive('save-tags-playlist-receive');
    tags = tagsInputBox.value.split(',').map(tag => tag.trim());
    const trackList = await fetchTagsTrackList(tags, anyButtonActive);
    console.log("tracklist", trackList);
    displayTagsTrackList(trackList);
    displaySavedPlaylists(playlists);

}



function executeOnloadFunctions() {
    fetchTrackListByTags('');
}



async function handleDeleteButtons(event) {
    if (event.target.tagName === 'BUTTON') {
        // Access the id of the button that was clicked
        const buttonId = event.target.id;
        console.log(buttonId);
        try {
            await window.electronAPI.channelSend('delete-track-send', { audioFileId: buttonId});
            const result = await window.electronAPI.channelReceive('delete-track-receive');
            console.log(result);
            location.reload();
            fetchTrackListByTags();
        } 
        catch (error) {
            console.error(error);
            return null;
        }
      }
    };



function toggleTagsButton() {
    if (toggleAnyButton.classList.contains('active')) {
        toggleAnyButton.classList.remove('active');
        toggleAllButton.classList.add('active');
        fetchTrackListByTags();
    }
    else {
        toggleAllButton.classList.remove('active');
        toggleAnyButton.classList.add('active');
        fetchTrackListByTags();
    }
}



async function fetchTrackListByTags() {
    try {
        const tags = tagsInputBox.value.split(',').map(tag => tag.trim());
        const anyButtonActive = toggleAnyButton.classList.contains('active');
        const trackList = await fetchTagsTrackList(tags, anyButtonActive);
        console.log("tracklist", trackList);
        displayTagsTrackList(trackList);
    }
    catch (error) {
        console.error(error.message);
    }
}


async function downloadAudioFromUrl() {
    try {
        const url = downloadAudioInputBox.value;
        console.log(url);
        await window.electronAPI.channelSend('channelSend', { url: url });
        const result = await window.electronAPI.channelReceive('channelReceive');
        console.log(result);
        console.log("reloading window");
        location.reload();
        console.log("window reloaded");
    }
    catch (error) {
        console.error(error.message);
    }
};



function displayTagsTrackList(trackList) {
    tagsTrackList.innerHTML = ''; 
    trackList.forEach(track => {
        const listItem = document.createElement('li');
        listItem.textContent = track.alias;
        const button = document.createElement('button');
        button.textContent = "del";
        button.id = track.audioFileId;
        tagsTrackList.appendChild(listItem);
        listItem.appendChild(button);
    });
}



function displaySavedPlaylists(playlists) {
    savedPlaylistsList.innerHTML = '';
    playlists.forEach(playlist => {
        const listItem = document.createElement('li');
        listItem.textContent = playlist.playlistName + "--" + playlist.tags;
        const button = document.createElement('button');
        button.textContent = "del";
        button.id = playlist.tags;
        savedPlaylistsList.appendChild(listItem);
        listItem.appendChild(button);
    });
}



async function fetchTagsTrackList(tags, anyButtonActive) {
    try {
        await window.electronAPI.channelSend('persistent-to-main', { tags: tags, anyButtonActive: anyButtonActive});
        return new Promise((resolve, reject) => {
            window.electronAPI.channelReceive('persistent-from-main', (result) => {
                console.log("tracklist", result);
                resolve(result);
            });
        });
    } 
    catch (error) {
        console.error(error);
        return null;
    }
}








const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
  }
  
func()
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`