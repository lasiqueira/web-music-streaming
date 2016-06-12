import React from "react";
import {findDOMNode} from "react-dom";
import * as PlayerActions from "../../actions/PlayerActions";
import * as PlaylistActions from "../../actions/PlaylistActions";
import PlaylistStore from "../../stores/PlaylistStore";
import SessionStore from "../../stores/SessionStore";
import PlaylistSongs from "./Playlist/PlaylistSongs";

function getStateFromStores() {
  return {
    playlists: PlaylistStore.getPlaylists(),
    activePlaylistIndex: PlaylistStore.getActivePlaylistIndex()
  };
}
export default class Playlist extends React.Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.previousPlaylist = this.previousPlaylist.bind(this);
    this.nextPlaylist = this.nextPlaylist.bind(this);
    this.removePlaylist = this.removePlaylist.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
    this.playAll = this.playAll.bind(this);
    this.state = getStateFromStores();
  }
  
  componentDidMount() {
    PlaylistStore.addChangeListener(this._onChange);
    if(SessionStore.isLoggedIn()){
        
        //had to do this hack because I wasn't able to trigger the action here after login...
        setTimeout(function (){
          PlaylistActions.getUserPlaylists(SessionStore.getUserId());
        }, 1000);
        
    }
  }

  componentWillUnmount() {
    PlaylistStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    const playlists = PlaylistStore.getPlaylists();
    const activePlaylistIndex = PlaylistStore.getActivePlaylistIndex();
    this.setState({playlists});
    this.setState({activePlaylistIndex});
  }
  
  previousPlaylist(e){
    PlaylistActions.getPreviousPlaylist();
  }

  nextPlaylist(e){
    PlaylistActions.getNextPlaylist();  
  }

  removePlaylist(e){
    PlaylistActions.removePlaylist(this.state.playlists[this.state.activePlaylistIndex]);  
  }

  savePlaylist(e){
    if(this.state.playlists[this.state.activePlaylistIndex].id != null){
      PlaylistActions.updatePlaylist(this.state.playlists[this.state.activePlaylistIndex]);  
    } else {
      PlaylistActions.createPlaylist(this.state.playlists[this.state.activePlaylistIndex]);  
    }
  }
  
  changePlaylistName(e){
    const playlistName = e.target.value;
    PlaylistActions.changePlaylistName(playlistName);

  }

  playAll(e){
    PlayerActions.playAll(this.state.playlists[this.state.activePlaylistIndex].songs);
  }

  render() {
    const disableControls = !SessionStore.isLoggedIn();
    const disablePrev = (this.state.activePlaylistIndex <= 0) ? true : false;
    const playlistSongs = (this.state.playlists[this.state.activePlaylistIndex].songs.length > 0) ? (<PlaylistSongs songs={this.state.playlists[this.state.activePlaylistIndex].songs} />) : (<div></div>);
    return (
      <div class="playlist-wrapper container-fluid">
        <div class="row">
          <div class= "col-xs-2 col-xs-offset-2">
            <button class="btn btn-default  glyphicon glyphicon-menu-left" disabled={disablePrev} onClick={this.previousPlaylist}></button>
          </div>
          <div class= "col-xs-2">
            <button class="btn btn-default glyphicon glyphicon-floppy-disk" disabled={disableControls} onClick={this.savePlaylist}></button>
          </div>
          <div class= "col-xs-2">  
            <button class="btn btn-default  glyphicon glyphicon-trash" onClick={this.removePlaylist}></button>
          </div>
          <div class= "col-xs-2">  
            <button class="btn btn-default  glyphicon glyphicon-menu-right" onClick={this.nextPlaylist}></button>
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="col-xs-12">
            <input ref="playlistName" id="PlaylistName" type="text" name="searchInput" class="form-control" placeholder="PlaylistName" value={this.state.playlists[this.state.activePlaylistIndex].name} onChange={this.changePlaylistName}/>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2 col-xs-offset-5">
            <button class="tn btn-default btn-player-control glyphicon glyphicon-play" onClick={this.playAll}></button>
          </div>
        </div>  
        <br/>
        {playlistSongs}
      </div>
    )
  }

}
