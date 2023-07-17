import React from "react";
import {findDOMNode} from "react-dom";
import PlayerStore from "../../stores/PlayerStore";
import * as PlayerActions from "../../actions/PlayerActions";


export default class Player extends React.Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.state={
      currentSong: [],
      playlistSongs: [],
      playlistSongsIndex: 0,
      playAll: false
    };
  }
  
  componentDidMount() {
    PlayerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this._onChange);
  }

  _onChange() {
     const currentSong = PlayerStore.getCurrentSong();
     const playlistSongs = PlayerStore.getPlaylistSongs();
     const playlistSongsIndex = PlayerStore.getPlaylistSongsIndex();
     const playAll = PlayerStore.isPlayAll();
     this.setState({currentSong});
     this.setState({playlistSongs});
     this.setState({playlistSongsIndex});
     this.setState({playAll});
  }

  onEnded(){
    if(this.state.playlistSongs.length -1 >= this.state.playlistSongsIndex && this.state.playAll){
      PlayerActions.playNextSong();
    }
  }
  
  componentDidUpdate(){
    if(this.state.currentSong){
      const player = findDOMNode(this.refs.audioPlayer);
      player.load();
      player.play();
    }
  }

  render() {
    const source = (this.state.currentSong) ? (<source src={this.state.currentSong.download_url} type="audio/mpeg"/>) : (<source src="" type="audio/mpeg" />);
    return (
      <div class="container-fluid audio-div">
        <div>
          <audio id="audioPlayer" ref="audioPlayer" controls onEnded={this.onEnded}>
            {source}
          </audio>  
        </div>
        <div>
         <span> {this.state.currentSong.name} </span>
        </div>
      </div>
    )
  }

}
