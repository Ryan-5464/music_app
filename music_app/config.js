const DEBUG = true

const DB_FILEPATH = './database/audio_files.sqlite';

const DB_TABLE_AUDIOFILES = 'audioFiles';
const DB_TABLE_AUDIOFILETAGS = 'audioFileTags';

const AUDIO_FILENAME = "./audio_files/[].mp3";

module.exports = {
    DEBUG,
    DB_FILEPATH,
    DB_TABLE_AUDIOFILES,
    DB_TABLE_AUDIOFILETAGS, 
    AUDIO_FILENAME,
};