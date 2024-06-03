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

  if (difference > 3600000) {
    // 1 hour in milliseconds
    localStorage.clear();
    return <Navigate to="/teacher" />;
  } else {
    localStorage.setItem("time", new Date().toString());
  }

  if (currentUser?.data[0]?.role === user) {
    return children;
  }

  return <Navigate to="/login" />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.string.isRequired,
};
export { ProtectedRoute };
