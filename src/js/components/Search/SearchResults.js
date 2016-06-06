import React from "react";

export default class SearchResults extends React.Component{
  render() {
    console.log(this.props.songs);
    return (
      <div class="search-results-wrapper container-fluid">
        <table class="table table-hover">
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
                  <td><button class="btn btn-default btn-player-control glyphicon glyphicon-play" ></button>  <button class="btn btn-default btn-player-control glyphicon glyphicon-plus"></button></td>
                </tr>  
              ]
              );
          })}
        </table>
      </div>
      );
  }
}
