import AppDispatcher from '../AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _accessToken = sessionStorage.getItem('accessToken');
let _email = sessionStorage.getItem('email');
let _userId = sessionStorage.getItem('userId');
let _errors = [];

class SessionStoreClass extends EventEmitter{

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  isLoggedIn() {
    return _accessToken ? true : false;    
  }

  getAccessToken() {
    return _accessToken;
  }

  getEmail() {
    return _email;
  }

  getUserId() {
    return _userId;
  }
  
  getErrors() {
    return _errors;
  }

}

const SessionStore = new SessionStoreClass();

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (action.json && action.json.access_token) {
        _accessToken = action.json.access_token;
        _email = action.json.email;
        _userId = action.json.user_id;
        sessionStorage.setItem('accessToken', _accessToken);
        sessionStorage.setItem('email', _email);
        sessionStorage.setItem('userId', _userId);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _email = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('userId');
      SessionStore.emitChange();
      break;

    default:
  }
  
  return true;
});

export default SessionStore;