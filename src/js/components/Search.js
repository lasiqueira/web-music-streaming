import React from "react";
import {findDOMNode} from "react-dom";
import * as SearchActions from "../actions/SearchActions";
import SearchStore from "../stores/SearchStore";
import SearchResults from "./Search/SearchResults";

export default class Search extends React.Component {
	constructor(){
		super();
		this.state = {
			songs: [],
			fetching: false
		};
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
		const fetching = SearchStore.isFetching();
		this.setState({fetching});
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
		const fetching = (this.state.fetching) ? (<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>) : (<div></div>)
		return (
			<div class="search-wrapper">
				<div class="container-fluid">
						<div class="row">
							<div class="col-xs-6 col-xs-offset-3">
								<p>Tip: You can search songs by name, artist, album or genre</p>
							</div>
						</div>
						<br/>
						<div class="row">			
							<div class="col-xs-6 col-xs-offset-2 ">
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
							<div class="col-xs-4 col-xs-offset-5 ">
								{fetching}
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
