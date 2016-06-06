import React from "react";
import {findDOMNode} from "react-dom";
import * as SearchActions from "../actions/SearchActions";
import SearchStore from "../stores/SearchStore";
import SearchResults from "./Search/SearchResults";

export default class Search extends React.Component {
	constructor(){
		super();
		this.state = {songs: []}
		this._onChange = this._onChange.bind(this);
		this._onClick = this._onClick.bind(this);
	}
	componentDidMount() {
    SearchStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange);
  }
	_onChange(){
		const songs = SearchStore.getSongs();
		this.setState({songs});
	}
	_onClick(e){
		const searchField = findDOMNode(this.refs.searchField).value.trim();
		if(searchField){
			SearchActions.search(searchField);
		} else {
			SearchActions.getAll();
		}
	}
	render() {
		const searchResults = (this.state.songs.length > 0) ? (<SearchResults songs={this.state.songs} />) : (<div></div>);
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
									<input ref="searchField" id="searchInput" type="text" name="searchInput" class="form-control" placeholder="Search..."/>
									<span class="input-group-btn">
	            						<button id="searchButton" class="btn btn-primary" onClick={this._onClick}>
	                						<span>Search</span>
	           							 </button>
	       							</span>
       							</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12 ">
								{searchResults}
							</div>
						</div>
					</div>
			</div>
		)
	}

}
