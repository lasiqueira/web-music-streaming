import React from "react";
import {findDOMNode} from "react-dom";
import PlayerStore from "../../stores/PlayerStore";


export default class Player extends React.Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.state={currentSong: []};
  }
  
  componentDidMount() {
    PlayerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this._onChange);
  }

  _onChange() {
     const currentSong = PlayerStore.getCurrentSong();
     this.setState({currentSong});
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
          <audio id="audioPlayer" ref="audioPlayer" controls>
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
