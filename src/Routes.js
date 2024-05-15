/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./helpers/authHelper";
import PageNotFound from "../src/PageNotFound";

import "./i18n";

import FirstPage from "./RegPage/FirstPage";
import LogInTeacher from "./Teacher/LogInTeacher";
import AtlPage from "./RegPage/AtlPage";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";

const Routers = () => {
  return (
    <>
      <Router>
        <Switch>
          <Redirect exact={true} from="/" to="/teacher" />
          <Route
            exact={true}
            path="/registration"
            render={() => <FirstPage />}
          />
          <Route exact={true} path="/atl-register" render={() => <AtlPage />} />

          <Route exact={true} path="/admin" render={() => <AdminLogin />} />

          <Route exact={true} path="/teacher" component={LogInTeacher} />

          <ProtectedRoute
            user="ADMIN"
            exact={true}
            path="/admin/dashboard"
            component={Dashboard}
          />
          <Route component={PageNotFound} path="*" />
        </Switch>
      </Router>
    </>
  );
};

export default Routers;
