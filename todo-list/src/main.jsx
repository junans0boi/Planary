import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import "./index.css";
import App from "./App.jsx";
import BottomNav from "./BottomNav.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ 최상위 Router */}
      <BottomNav />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);