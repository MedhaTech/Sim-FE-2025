/* eslint-disable indent */
/* eslint-disable no-undef */
export const adminRoot = "/admin";

export const UserRole = {};

export const URL = {
  getStatesOnly: process.env.REACT_APP_API_BASE_URL + "/organizations/states",
  getFetchDistsOnly:
    process.env.REACT_APP_API_BASE_URL + "/organizations/districts?",
  adminLogin: process.env.REACT_APP_API_BASE_URL + "/admins/login",
  coordinatorLogin:
    process.env.REACT_APP_API_BASE_URL + "/state_coordinators/login",
    eadminLogin:
    process.env.REACT_APP_API_BASE_URL + '/admins/login?',
    evaluatorLogin: process.env.REACT_APP_API_BASE_URL + '/evaluators/login',

  adminLogOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",
  teacherLogin: process.env.REACT_APP_API_BASE_URL + "/mentors/login",
  teacherLogOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",
  coordinatorLogOut:
    process.env.REACT_APP_API_BASE_URL + "/state_coordinators/logout",
  getTeacherById: process.env.REACT_APP_API_BASE_URL + "/mentors/",
};
const API = "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870";

export const KEY = {
  User_API_Key: API,
};

export const isAuthGuardActive = true;
