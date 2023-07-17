import AppDispatcher from '../AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
let _songs = [];
let _errors = [];
let _fetching = false;

class SearchStoreClass extends EventEmitter{

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getSongs() {
    return _songs;
  }

  getErrors() {
    return _errors;
  }
   isFetching() {
    return _fetching;
  }

}

const SearchStore = new SearchStoreClass();

SearchStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch(action.type) {

    case ActionTypes.SEARCH_RESPONSE:
      if (action.json) {
        _songs = action.json;
      }
      if (action.errors) {
        _errors = action.errors;
      }
      _fetching = false;
      SearchStore.emitChange();
      break;
    case ActionTypes.SEARCH_REQUEST:
      _fetching = true;
      SearchStore.emitChange();
      break;
    default:
  }
  
  return true;
});

export default SearchStore;