import React, {PropTypes} from "react";
import {Link} from "react-router"
import SessionActions from "../actions/SessionActions";


export default class Header extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		email: PropTypes.string
	}

	constructor(){
		super();
		this.logout = this.logout.bind(this);
	}

	logout(e) {
    	e.preventDefault();
    	SessionActions.logout();
    }

	render() {
		const rightNav = this.props.isLoggedIn ? (
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand">SISTINTTCC</a>
				</div>
				<ul class="nav navbar-nav navbar-right">
           			<li class="disabled"><a href="#">{this.props.email}</a></li>
            		<li><a href='#' onClick={this.logout}>Logout</a></li>
            	</ul>	
            </div>
	    ) : (
	   		<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand">SISTINTTCC</a>
				</div>
				<ul class="nav navbar-nav navbar-right">
	        		<li><Link to="login">Sign in</Link></li>
	       			<li><Link to="signup">Sign up</Link></li>
	        	</ul>	
            </div>
	    );



		return (
			<div class="header-wrapper clearfix">
				<nav class="navbar navbar-default navbar-fixed-top">
					{rightNav}
				</nav>
			</div>
		)
	}

}
