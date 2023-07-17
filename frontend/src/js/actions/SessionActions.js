import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../constants/AppConstants.js";
import * as WebAPIUtils from "../utils/WebAPIUtils";


export function signup(email, username, password, passwordConfirmation) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.SIGNUP_REQUEST,
    email: email,
    username: username,
    password: password,
    passwordConfirmation: passwordConfirmation
  });
  WebAPIUtils.signup(email, username, password, passwordConfirmation);
};

export function login(email, password) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.LOGIN_REQUEST,
    email: email,
    password: password
  });
  WebAPIUtils.login(email, password);
};

  
export function logout() {
  AppDispatcher.handleViewAction({
    type: ActionTypes.LOGOUT
  });
};
  
