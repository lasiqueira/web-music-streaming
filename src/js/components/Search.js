import React from "react";

export default class Search extends React.Component {

	render() {
		return (
			<div class="search-wrapper">
				<div class="container-fluid">
						<div class="row">
							<div class="col-xs-4 col-xs-offset-4">
								<p>Tip: You can search songs by name, artist, album or genre</p>
							</div>
						</div>
						<br/>
						<div class="row">			
							<div class="col-xs-4 col-xs-offset-4 ">
								<div class="input-group">
									<input id="searchInput" type="text" name="searchInput" class="form-control" placeholder="Search..."/>
									<span class="input-group-btn">
	            						<button id="searchButton" class="btn btn-primary">
	                						<span>Search</span>
	           							 </button>
	       							</span>
       							</div>
							</div>
						</div>
					</div>
			</div>
		)
	}

}
