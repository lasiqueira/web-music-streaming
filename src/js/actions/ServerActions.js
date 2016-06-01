import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../constants/AppConstants.js";

export function receiveLogin(json, errors) {
  AppDispatcher.handleServerAction({
    type: ActionTypes.LOGIN_RESPONSE,
    json: json,
    errors: errors
  });
};

  
