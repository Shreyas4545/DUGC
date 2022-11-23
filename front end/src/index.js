import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteGuard from "./Components/Routeguard";
import Dashboard from "./DASHBOARD/Dashboard";
import Generate from "./DASHBOARD/Generate";
import Dashboard1 from "./DASHBOARD/Dashboard1";
ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
     <Route index element={<App/>} />
     <Route exact path="Dashboard" element={<Dashboard/>} />
     <Route exact path="Generate" element={<Generate />} />
     <Route exact path="Dashboard1" element={<Dashboard1/>} />
  </Routes>
</BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
