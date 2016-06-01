import React from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import SessionStore from "../stores/SessionStore";


function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
  };
}

export default class MainApp extends React.Component {
	
	constructor() {
		super();
		this.state = getStateFromStores();
	}
	componentDidMount() {
    	SessionStore.addChangeListener(this._onChange);
  	}

  	componentWillUnmount() {
    	SessionStore.removeChangeListener(this._onChange);
  	}

  	_onChange() {
    	this.setState(getStateFromStores());
  	}

	render() {
		return (
			<div class="main-app">
				<Header isLoggedIn={this.state.isLoggedIn} email={this.state.email} />
				<Sidebar />
				<Search />
			</div>
		);
	}
}
