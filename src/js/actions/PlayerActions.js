import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../constants/AppConstants.js";

export function playSong(song) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.PLAY_SONG,
    song: song
  });
};

  
