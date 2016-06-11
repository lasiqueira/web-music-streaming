import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../constants/AppConstants.js";

export function addSong(song) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.ADD_SONG,
    song: song
  });
};

export function removeSong(song) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.REMOVE_SONG,
    song: song
  });
};  

};