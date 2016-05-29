import React from "react";

export default class Header extends React.Component {

	render() {
		return (
			<div class="header-wrapper clearfix">
				<nav class="navbar navbar-default navbar-fixed-top">
					<div class="container-fluid">
						<div class="navbar-header">
							<a class="navbar-brand">SISTINTTCC</a>
						</div>
						<ul class="nav navbar-nav navbar-right">
							<li><a>Sign in</a></li>
							<li><a>Sign up</a></li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}

}
