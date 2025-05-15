/* eslint-disable indent */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthGuardActive } from "../constants/defaultValues";
import { getCurrentUser } from "./Utils";
import PropTypes from "prop-types";
const ProtectedRoute = ({ children, user }) => {
  if (!isAuthGuardActive) {
    return children;
  }
  const currentUser = getCurrentUser();
  const loginTime = localStorage.getItem("time");
  const loginTimestamp = new Date(loginTime).getTime();
  const currentTime = new Date().getTime();
  const difference = currentTime - loginTimestamp;
//1800000 : 30 minutes //
//43200000 : 12 hrs
  if (difference > 43200000) {
    localStorage.clear();
    if (user === "EADMIN") {
      return <Navigate to="/eadmin" />;
    } else if (user === "ADMIN") {
      return <Navigate to="/admin" />;
    } else if (user === "MENTOR") {
      return <Navigate to="/teacher" />;
    } else if (user === "INSTITUTION") {
      return <Navigate to="/institution" />;
    } else if (user === "STATE") {
      return <Navigate to="/state" />;
    } else if (user === "TEAM") {
      return <Navigate to="/team" />;
    } else if (user === "EVALUATOR") {
      return <Navigate to="/evaluator" />;
    }

  
  } else {
    localStorage.setItem("time", new Date().toString());
  }

  if (currentUser && user.includes(currentUser?.data[0]?.role)) {
    return children;
  }

  return <Navigate to="/login" />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.string.isRequired,
};
export { ProtectedRoute };
