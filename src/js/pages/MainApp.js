import React from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

export default class MainApp extends React.Component {
	
	constructor() {
		super();
		this.state = {
			token: "",
			username: "",
			playlists: []
		};
	}

	render() {
		return (
			<div className="main-app">
				<Header />
				<Sidebar />
				<Search />
			</div>
		);
	}
}
