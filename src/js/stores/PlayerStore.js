import AppDispatcher from '../AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
let _currentSong = [];


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

}

const PlayerStore = new PlayerStoreClass();

PlayerStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch(action.type) {

    case ActionTypes.PLAY_SONG:
      if (action.song) {
        _currentSong = action.song;
      }
      PlayerStore.emitChange();
      break;
    case ActionTypes.LOGOUT:
      _currentSong = [];
      break;

    default:
  }
  
  return true;
});

export default PlayerStore;