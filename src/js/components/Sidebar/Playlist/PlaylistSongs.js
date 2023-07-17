import React from "react";
import * as PlayerActions from "../../../actions/PlayerActions";
import * as PlaylistActions from "../../../actions/PlaylistActions";

export default class PlaylistSongs extends React.Component{
  constructor(){
    super();
    this.playSong = this.playSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
  }

  playSong(e){
    const song = this.props.songs[e.target.value];
    PlayerActions.playSong(song);
  }

  removeSong(e){
    PlaylistActions.removeSong(e.target.value);
  }

  render() {
    const that = this;
    return (
      <div class="row">
        {this.props.songs.map(function(song, index){
          return (
            [ <div class="col-xs-8">
                <span>{song.name}</span>
              </div>,
              <div class="col-xs-4">
                <button value={index} onClick={e => that.playSong(e)} class="btn btn-default btn-player-control glyphicon glyphicon-play" ></button>
                <button value={index} onClick={e => that.removeSong(e)} class="btn btn-default btn-player-control glyphicon glyphicon-minus"></button>
              </div>
            ]
            );
        })}
 
      </div>
      );
  }
}
