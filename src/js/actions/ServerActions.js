import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../constants/AppConstants.js";

export function receiveLogin(json, errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.LOGIN_RESPONSE,
    json: json,
    errors: errors
  });
};


export function receiveSongs(json, errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.SEARCH_RESPONSE,
    json: json,
    errors: errors
  });
};
  
export function receivePlaylists(json, errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.RECEIVE_PLAYLISTS,
    json: json,
    errors: errors
  });
};
