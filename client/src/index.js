import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import Route from "./routes/Route";
import { CalculateProvider } from "./utils/configs/displays/CalculateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CalculateProvider>
        <Route />
      </CalculateProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
