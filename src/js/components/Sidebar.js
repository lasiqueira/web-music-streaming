import React from "react";
import Player from './Sidebar/Player';
import Playlist from './Sidebar/Playlist';

export default class Sidebar extends React.Component {

	render() {
		return (
			<div class="sidebar-wrapper">
					<Player />
          <Playlist />
			</div>
		)
	}

}
