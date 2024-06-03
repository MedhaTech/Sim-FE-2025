/* eslint-disable indent */
/* eslint-disable no-undef */
export const adminRoot = "/admin";

export const UserRole = {};

export const URL = {
  getStatesOnly: process.env.REACT_APP_API_BASE_URL + "/organizations/states",
  getFetchDistsOnly:
    process.env.REACT_APP_API_BASE_URL + "/organizations/districts?",
  adminLogin: process.env.REACT_APP_API_BASE_URL + "/admins/login",
  adminLogOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",
};
const API = "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870";

export const KEY = {
  User_API_Key: API,
};

export const isAuthGuardActive = true;
