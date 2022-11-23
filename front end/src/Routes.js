import React from "react";
import { Navigate, Routes, Route, Router } from "react-router-dom";
import RouteGuard from "./Components/Routeguard.js";
//history
import { history } from './Helpers/history';
 
//pages
import Login from "./Login/Login";
import Dashboard from "./DASHBOARD/Dashboard";
import Generate from "./DASHBOARD/Generate";
import Dashboard1 from "./DASHBOARD/Dashboard1";
 
function Routes1() {
   return (
    //    <Router >
           <Routes history={history}>
               <RouteGuard
                   exact
                   path="/"
                   component={Login}
               />
               <Route
                   path="/Dashboard"
                   component={Dashboard}
               />
               <Route
                   path="/Generate"
                   component={Generate}
               />
               <RouteGuard
                   path="/Dashboard1"
                   component={Dashboard1}
               />
               <Navigate to="/" />
           </Routes>
    //    </Router>
   );
}
 
export default Routes1