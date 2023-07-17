import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../constants/AppConstants.js";

export function playSong(song) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.PLAY_SONG,
    song: song
  });
};

  
export function playAll(songs) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.PLAY_ALL,
    songs: songs
  });
};

export function playNextSong() {
  AppDispatcher.handleViewAction({
    type: ActionTypes.PLAY_NEXT_SONG
  });
};