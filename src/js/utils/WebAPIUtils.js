import * as ServerActions from '../actions/ServerActions.js';
import {APIEndpoints} from '../constants/AppConstants.js';
import Request from 'superagent';

function _getErrors(res) {
  let errorMsgs = ["Something went wrong, please try again"];
  let json = null;
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

export function signup(email, username, password, passwordConfirmation) {
  Request.post(APIEndpoints.SIGNUP)
    .send({ user: { 
      email: email, 
      username: username,
      password: password,
      password_confirmation: passwordConfirmation
    }})
    .set('Accept', 'application/json')
    .end(function(error, res) {
      if (res) {
        if (res.error) {
          const errorMsgs = _getErrors(res);
          ServerActions.receiveLogin(null, errorMsgs);
        } else {
          const json = JSON.parse(res.text);
          ServerActions.receiveLogin(json, null);
        }
      }
    });
};

export function login(email, password) {
  Request.post(APIEndpoints.LOGIN)
    .send({ email: email, password: password, grant_type: 'password' })
    .set('Accept', 'application/json')
    .end(function(error, res){
      if (res) {
        if (res.error) {
          const errorMsgs = _getErrors(res);
          ServerActions.receiveLogin(null, errorMsgs);
        } else {
          const json = JSON.parse(res.text);
          ServerActions.receiveLogin(json, null);
        }
      }
    });
};

export function searchSongs(search) {
  Request.get(APIEndpoints.SEARCH_SONGS)
    .query({search: search})
    .end(function(error, res){
      if (res) {
        if (res.error) {
          const errorMsgs = _getErrors(res);
          ServerActions.receiveSongs(null, errorMsgs);
        } else {
          const json = JSON.parse(res.text);
          ServerActions.receiveSongs(json, null);
        }
      }
    });

};

export function getAllSongs() {
  Request.get(APIEndpoints.SONGS)
    .end(function(error, res){
      if (res) {
        if (res.error) {
          const errorMsgs = _getErrors(res);
          ServerActions.receiveSongs(null, errorMsgs);
        } else {
          const json = JSON.parse(res.text);
          ServerActions.receiveSongs(json, null);
        }
      }
    });

};


