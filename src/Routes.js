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

const Routers = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/teacher" />
          </Route>

          <Route
            exact={true}
            path="/registration"
            render={() => <FirstPage />}
          />
          <Route exact={true} path="/atl-register" render={() => <AtlPage />} />
          <Route exact={true} path="/teacher" component={LogInTeacher} />
          <Route exact={true} path="/admin" render={() => <AdminLogin />} />

          <Route component={PageNotFound} path="*" />
        </Switch>
      </Router>
    </>
  );
};

export default Routers;
