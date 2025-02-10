import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BottomNav from "./components/Footer/BottomNav.jsx";
import TopNav from "./components/TopBar/TopBar.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TopNav />
      <App />
      <BottomNav />
    </BrowserRouter>
  </React.StrictMode>
);