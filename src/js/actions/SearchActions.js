import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../constants/AppConstants.js";
import * as WebAPIUtils from "../utils/WebAPIUtils";


export function search(search) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.SEARCH_REQUEST,
    search: search
  });
  WebAPIUtils.searchSongs(search);
};

export function getAll(email, password) {
  AppDispatcher.handleViewAction({
    type: ActionTypes.SEARCH_REQUEST
  });
  WebAPIUtils.getAllSongs();
};

  
