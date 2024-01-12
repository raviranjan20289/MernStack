import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Auth from "./store/auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth.AuthProvider>
    <App />
  </Auth.AuthProvider>
);
