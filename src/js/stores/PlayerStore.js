import AppDispatcher from '../AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
let _currentSong = [];
let _playlistSongs = [];
let _playlistSongsIndex = 0;
let _playAll = false;


class PlayerStoreClass extends EventEmitter{

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getCurrentSong() {
    return _currentSong;
  }

  getPlaylistSongs(){
    return _playlistSongs;
  }

  getPlaylistSongsIndex(){
    return _playlistSongsIndex;
  }

  isPlayAll(){
    return _playAll;
  }

}

const PlayerStore = new PlayerStoreClass();

PlayerStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch(action.type) {

    case ActionTypes.PLAY_SONG:
      if (action.song) {
        _currentSong = action.song;
        _playlistSongs = [];
        _playlistSongsIndex = 0;
        _playAll = false;
      }
      PlayerStore.emitChange();
      break;
    case ActionTypes.LOGOUT:
      _currentSong = [];
      _playlistSongs = [];
      _playlistSongsIndex = 0;
      _playAll = false;
      break;
    case ActionTypes.PLAY_ALL:
      if(action.songs){
        _playlistSongs = action.songs;
        _playlistSongsIndex = 0;
        if(_playlistSongs.length > 0){
          _currentSong = _playlistSongs[_playlistSongsIndex];
          _playAll = true;
        }
      }
      PlayerStore.emitChange();
      break;

      case ActionTypes.PLAY_NEXT_SONG:
        _playlistSongsIndex++;
        if(_playlistSongs.length > _playlistSongsIndex){
          _currentSong = _playlistSongs[_playlistSongsIndex];
        } else{
          _currentSong = [];
          _playAll = false;
          _playlistSongsIndex = 0;
        }
        PlayerStore.emitChange();
        break;
      case ActionTypes.LOGIN_RESPONSE:
        _currentSong = [];
        _playlistSongs = [];
        _playlistSongsIndex = 0;
        _playAll = false;
        break;
    default:
  }
  
  return true;
});

export default PlayerStore;