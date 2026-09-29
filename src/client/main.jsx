import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import App from "./App";

import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MatchPage from "./pages/MatchPage";
import ProfilePage from "./pages/ProfilePage";
import UserPage from "./pages/UserPage";
import Topbar from "./components/Topbar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<App />} /> {/*Eventually turn this into HomePage */}
        <Route path="/home" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/game/:gameName" element={<GamePage />} />
        <Route path="/game/:gameName/match/:matchId" element={<MatchPage />} />
        <Route path="/user/:username" element={<UserPage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
