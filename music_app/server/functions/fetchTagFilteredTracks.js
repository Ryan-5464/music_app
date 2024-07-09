const { SqliteDatabaseHandler } = require("./SqliteDatabaseHandler.js")





export async function fetchTagFilteredTracks(dbFilepath, tagsList, anyButtonActive) {

    const database = new SqliteDatabaseHandler()
    await database.connect(dbFilepath)

    let tracks = null
    if (tagsList.length === 0) {    
        tracks = await fetchTracksNoTagFilter(database)
        tracks = await fetchTags(database, tracks)
        await database.disconnect()
        return tracks
    }
    if (anyButtonActive) {
        tracks = await fetchTracksAnyTagFilter(tagsList)
        tracks = await fetchTags(database, tracks)
        await database.disconnect()
        return tracks
    }
    else {
        tracks = await fetchTracksAllTagFilter(tagsList)
        tracks = await fetchTags(database, tracks)
        await database.disconnect()
        return tracks
    }
}





async function fetchTracksAnyTagFilter(database, tagsList) {

    const placeholders = getPlaceholders(tagsList.length)
    const QUERY = `    
            SELECT DISTINCT tracks.id, tracks.track_id, tracks.url, tracks.duration_sec, 
            tracks.local_path, tracks.file_size_b, tracks.title, 
            tracks.times_played, tracks.date_downloaded
        FROM tracks
        INNER JOIN tags ON tracks.track_id = tags.track_id
        WHERE tags.tag IN (${placeholders});
    `
    const tracks = await database.download(QUERY, tagsList)
    return tracks
}
    




async function fetchTracksAllTagFilter(database, tagsList) {

    const n = tagsList.length
    const tagString = convertTagListToString(tagsList)
    const QUERY = `   
        SELECT DISTINCT tracks.id, tracks.track_id, tracks.url, tracks.duration_sec, 
        tracks.local_path, tracks.file_size_b, tracks.title, 
        tracks.times_played, tracks.date_downloaded
        FROM tracks
        WHERE tracks.track_id IN (
            SELECT track_id
            FROM tags
            WHERE tag IN (${tagString})
            GROUP BY track_id
            HAVING COUNT(DISTINCT tag) = ${n}
        );
    `
    const tracks = await database.download(QUERY)
    return tracks
}
    




async function fetchTracksNoTagFilter(database) {

    const QUERY = `   
        SELECT * FROM tracks;
    `
    const tracks = await database.download(QUERY)
    return tracks
}





function convertTagListToString(tagsList) {

    const tagsString = tagsList.map(word => `'${word}'`).join(', ')
    return tagsString
}





function getPlaceholders(length) {

    let placeholders = '?'
    for (let i = 1; i < length; i++) {
        placeholders = placeholders + ', ?'
    }
    return placeholders
}





async function fetchTags(database, tracks) {

    const QUERY = `
        SELECT tag FROM tags 
        WHERE track_id = ?
    `
    for (const _track of tracks) {
        _track.tags = await database.download(QUERY, [_track.track_id])
    }
    return tracks
}