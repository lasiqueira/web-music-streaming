import React from "react";


import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import SessionStore from "../stores/SessionStore";


export default class MusicPlayer extends React.Component {
  
  render() {
    return (
      <div class="container-fluid">
        <Sidebar />
        <Search />
      </div>
    );
  }
}
