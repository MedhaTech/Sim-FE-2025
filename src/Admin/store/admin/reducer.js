/* eslint-disable indent */
import {
  ADMIN_LOGIN_USER,
  ADMIN_LOGIN_USER_SUCCESS,
  ADMIN_LOGIN_USER_ERROR,
  toggle_header,
  Layoutstyle_data,
} from "../../../redux/actions.js";

const INIT_STATE = {
  currentUser: {},
  loading: false,
  error: "",
  adminData: [],
  toggle_header: false,
  layoutstyledata: localStorage.getItem("layoutStyling"),
};

export default (state = INIT_STATE, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADMIN_LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case ADMIN_LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        adminData: action.payload,
        error: "",
      };
    case ADMIN_LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        adminData: [],
        error: action.payload.message,
      };
    case toggle_header:
      return { ...state, toggle_header: action.payload };
    case Layoutstyle_data:
      return { ...state, layoutstyledata: action.payload };
    default:
      return newState;
  }
};
