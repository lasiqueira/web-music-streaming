import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./styles/app.css";

import Layout from "./pages/Layout";
import MusicPlayer from "./pages/MusicPlayer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MusicPlayer />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
