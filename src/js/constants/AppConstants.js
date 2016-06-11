export  const APIRoot = "http://pacific-scrubland-63293.herokuapp.com";

export  const APIEndpoints = {
    LOGIN: APIRoot + "/login",
    SIGNUP: APIRoot + "/users",
    SONGS: APIRoot + "/songs",
    SEARCH_SONGS: APIRoot + "/search/songs",
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
    SIGNUP_REQUEST: "SIGNUP_REQUEST",
    // Routes
    REDIRECT: "REDIRECT",
    
    //Search
    SEARCH_REQUEST: "SEARCH_REQUEST",
    SEARCH_RESPONSE: "SEARCH_RESPONSE",

    //Player
    PLAY_SONG: "PLAY_SONG",

    //Playlist
    ADD_SONG: "ADD_SONG",
    REMOVE_SONG: "REMOVE_SONG"

};