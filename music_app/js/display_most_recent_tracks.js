


async function display_most_recent_tracklist(tracks) {
    console.log("hello", tracks)
    const tracklist_container = document.getElementById("tracklist")
    tracklist_container.innerHTML = ''
    
    for (const track of tracks) {
        let track_div = create_track_div()
        track_div = add_track_title_to_track_div(track_div, track.title)
        track_div = add_track_duration_to_track_div(track_div, track.duration_sec)
        track_div = add_tags_to_track_div(track_div)
        track_div = add_delete_button_to_track_div(track_div, track.track_id)
        tracklist_container.appendChild(track_div, track.tags)
    }

}

function create_track_div() {
    const single_track_container = document.createElement('ul')
    single_track_container.classList.add("tracklist-row-container")
    return single_track_container
}

function add_track_title_to_track_div(track_div, title) {
    const track_title_div = document.createElement('li')
    track_title_div.classList.add("track-name")
    track_title_div.classList.add("tracklist-row-item")
    track_title_div.textContent = title
    track_div.appendChild(track_title_div)
    return track_div
}

function add_track_duration_to_track_div(track_div, duration_sec) {
    const track_duration_div = document.createElement('li')
    track_duration_div.classList.add("duration")
    track_duration_div.classList.add("tracklist-row-item")
    track_duration_div.textContent = duration_sec
    track_div.appendChild(track_duration_div)
    return track_div
}

function add_tags_to_track_div(track_div, tags=["no tags"]) {
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
        track_div.appendChild(tags_container)
        return track_div
}

function add_delete_button_to_track_div(track_div, track_id) {
    const delete_button = document.createElement("button")
    delete_button.classList.add("delete_icon")
    delete_button.id = track_id
    track_div.appendChild(delete_button)
    return track_div
}