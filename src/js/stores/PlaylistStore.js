import AppDispatcher from "../AppDispatcher.js";
import {ActionTypes} from "../constants/AppConstants.js";
import {EventEmitter} from "events";
import SessionStore from "./SessionStore"

const CHANGE_EVENT = 'change';

let _playlists = [{id:null, name:"New Playlist", songs:[]}];
let _errors = [];
let _activePlaylistIndex = 0;

class PlaylistStoreClass extends EventEmitter{

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getPlaylists() {
    return _playlists;
  }
  
  getActivePlaylistIndex(){
    return _activePlaylistIndex;
  }
  
  getErrors() {
    return _errors;
  }

}

const PlaylistStore = new PlaylistStoreClass();

PlaylistStore.dispatchToken = AppDispatcher.register(function(payload) {

  const action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGOUT:
      _playlists = [{id:null, name:"New Playlist", songs:[]}];
      _activePlaylistIndex = 0;
      PlaylistStore.emitChange();
      break;
    case ActionTypes.ADD_SONG:
      _playlists[_activePlaylistIndex].songs.push(action.song);
      PlaylistStore.emitChange();
      break;
    case ActionTypes.REMOVE_SONG:
      _playlists[_activePlaylistIndex].songs.splice(action.songIndex, 1);
      PlaylistStore.emitChange();
      break;

    case ActionTypes.NEXT_PLAYLIST:
      if(_playlists.length -1 == _activePlaylistIndex){
        _playlists.push({id:null, name:"New Playlist", songs:[]});
      }
      _activePlaylistIndex++;
      PlaylistStore.emitChange();
      break;
      
    case ActionTypes.PREVIOUS_PLAYLIST:
      if(_playlists.length > 1){
        _activePlaylistIndex--;
      }
      PlaylistStore.emitChange();
      break;

    case ActionTypes.REMOVE_PLAYLIST:
      _playlists.splice(_activePlaylistIndex, 1);
      _activePlaylistIndex = 0;

      if(_playlists.length == 0){
        _playlists = [{id:null, name:"New Playlist", songs:[]}];
      }
      
      PlaylistStore.emitChange();
      break;   
    case ActionTypes.CHANGE_PLAYLIST_NAME:
      _playlists[_activePlaylistIndex].name = action.playlistName;
      PlaylistStore.emitChange();
    default:
  }
  
  return true;
});

export default PlaylistStore;