import AppDispatcher from "../AppDispatcher.js";
import {ActionTypes} from "../constants/AppConstants.js";
import SessionStore from "../stores/SessionStore";
import {EventEmitter} from "events";
import {hashHistory} from "react-router";


const CHANGE_EVENT = 'change';

class RouteStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener() {
    this.removeListener(CHANGE_EVENT, callback);
  }

  redirectHome() {
    hashHistory.push("/");
  }
}

const RouteStore = new RouteStoreClass();
RouteStore.dispatchToken = AppDispatcher.register(function(payload) {

  const action = payload.action;
  
  switch(action.type) {

    case ActionTypes.REDIRECT:
      hashHistory.push(action.route);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (SessionStore.isLoggedIn()) {
        RouteStore.redirectHome();
      }
      break;
    case ActionTypes.LOGOUT:
      RouteStore.redirectHome();
      break;
    default:
  }
  
  return true;
});

export default RouteStore;