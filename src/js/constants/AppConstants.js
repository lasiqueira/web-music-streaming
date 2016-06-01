export  const APIRoot = "http://pacific-scrubland-63293.herokuapp.com";

export  const APIConstants = {
    LOGIN: APIRoot + "/login",
    SIGNUP: APIRoot + "/users",
    SONGS: APIRoot + "/songs",
    SEARCH: APIRoot + "/search",
    PLAYLISTS: APIRoot + "/playlists"
};

export  const PayloadSources ={
    SERVER_ACTION: "SERVER_ACTION",
    VIEW_ACTION: "VIEW_ACTION"
};

export  const ActionTypes = {
    // Session
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_RESPONSE: "LOGIN_RESPONSE",

    // Routes
    REDIRECT: "REDIRECT"


};