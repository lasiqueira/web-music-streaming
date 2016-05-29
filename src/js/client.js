import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import MainApp from "./pages/MainApp";

const app = document.getElementById("app");


ReactDOM.render(<MainApp />, app);