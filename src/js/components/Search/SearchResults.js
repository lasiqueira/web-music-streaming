import React from "react";
import * as PlayerActions from "../../actions/PlayerActions"

export default class SearchResults extends React.Component{
  constructor(){
    super();
    this.playSong = this.playSong.bind(this);
  }

  playSong(e){
    const song = this.props.songs[e.target.value];
    PlayerActions.playSong(song);
  }

  render() {
    const that = this;
    return (
      <div class="search-results-wrapper container-fluid">
        <table class="table table-hover">
            <tbody>
              <tr>
              <th>Name</th>
              <th>Album</th>
              <th>Artist</th>
              <th>Genre</th>
              <th>Controls</th>
            </tr>
            {this.props.songs.map(function(song, index){
              return (
                [ <tr>
                    <td>{song.name}</td>
                    <td>{song.album.name}</td>
                    <td>{song.album.artist.name}</td>
                    <td>{song.genre.name}</td>
                    <td>
                        <button value={index} onClick={e => that.playSong(e)} class="btn btn-default btn-player-control glyphicon glyphicon-play" ></button>
                        <button value={index} class="btn btn-default btn-player-control glyphicon glyphicon-plus"></button>
                      </td>
                  </tr>  
                ]
                );
            })}
          </tbody>
        </table>
      </div>
      );
  }
}
