import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../constants/AppConstants.js";
import * as WebAPIUtils from "../utils/WebAPIUtils";

export function addSong(song) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.ADD_SONG,
    song: song
  });
};

export function removeSong(songIndex) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.REMOVE_SONG,
    songIndex: songIndex
  });
}; 

export function getUserPlaylists(userId){
  AppDispatcher.handleViewAction({
    type: ActionTypes.PLAYLISTS_REQUEST,
    userId: userId
  });
  WebAPIUtils.getUserPlaylists(userId); 
};

export function getNextPlaylist(){
  AppDispatcher.handleViewAction({
    type: ActionTypes.NEXT_PLAYLIST
  });
}

export function getPreviousPlaylist(){
  AppDispatcher.handleViewAction({
    type: ActionTypes.PREVIOUS_PLAYLIST
  });
}

export function removePlaylist(playlist){
  AppDispatcher.handleViewAction({
    type: ActionTypes.REMOVE_PLAYLIST,
    playlist: playlist
  });
  if(playlist.id != null){
    WebAPIUtils.removePlaylist(playlist.id);
  } 
};

export function createPlaylist(playlist){
  AppDispatcher.handleViewAction({
    type: ActionTypes.CREATE_PLAYLIST,
    playlist: playlist
  });
    WebAPIUtils.createPlaylist(playlist);
};

export function updatePlaylist(playlist){
  AppDispatcher.handleViewAction({
    type: ActionTypes.UPDATE_PLAYLIST,
    playlist: playlist
  });
    WebAPIUtils.updatePlaylist(playlist);
};


export function changePlaylistName(playlistName){
  AppDispatcher.handleViewAction({
    type: ActionTypes.CHANGE_PLAYLIST_NAME,
    playlistName: playlistName
  });
};