import React from "react";
import Header from "../components/Header";
import SessionStore from "../stores/SessionStore";
import RouteStore from "../stores/RouteStore";


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
    this._onChange = this._onChange.bind(this);
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
			<div class="container-fluid">
				<Header isLoggedIn={this.state.isLoggedIn} email={this.state.email} />
				{this.props.children}
			</div>
		);
	}
}
