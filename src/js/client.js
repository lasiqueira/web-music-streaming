import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import MainApp from "./pages/MainApp";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MusicPlayer from "./pages/MusicPlayer";

const app = document.getElementById("app");


ReactDOM.render(
 <Router history={hashHistory}>
    <Route path="/" component={MainApp}>
      <IndexRoute component={MusicPlayer}></IndexRoute>
      <Route path="login" component={Login}></Route>
      <Route path="signup" component={Signup}></Route>
    </Route>
  </Router>,
  app
);