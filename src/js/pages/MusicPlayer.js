import React from "react";


import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import SessionStore from "../stores/SessionStore";


export default class MusicPlayer extends React.Component {
  
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }
  
  componentDidMount() {
      SessionStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  }

  _onChange() {
      //this.setState(getStateFromStores());
  }

  render() {
    return (
      <div class="container-fluid">
        <Sidebar />
        <Search />
      </div>
    );
  }
}
