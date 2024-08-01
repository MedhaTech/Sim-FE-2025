/* eslint-disable indent */
import { languageOptions } from '../../../constants/languageOptions.js';

import {
  ADMIN_LOGIN_USER,
  ADMIN_LOGIN_USER_SUCCESS,
  ADMIN_LOGIN_USER_ERROR,
  ADMIN_LANGUAGE,
  GET_ADMINS,
  ADMIN_LIST_SUCCESS,
  ADMIN_LIST_ERROR,
  toggle_header,
  Layoutstyle_data,
} from "../../../redux/actions.js";

const INIT_STATE = {
  currentUser: {},
  loading: false,
  error: "",
  adminData: [],
  toggle_header: false,
  adminList:[],
  adminLanguage:languageOptions[0], 
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
      case ADMIN_LANGUAGE:
        return {
            ...state,
            adminLanguage:action.payload
        };
        case GET_ADMINS:
          return { ...state, loading: true, error: '' };
          case ADMIN_LIST_SUCCESS:
        return {
            ...state,
            adminList:action.payload
        };
        case ADMIN_LIST_ERROR:
        return {
            ...state,
            adminList:action.payload
        };  
    case toggle_header:
      return { ...state, toggle_header: action.payload };
    case Layoutstyle_data:
      return { ...state, layoutstyledata: action.payload };
    default:
      return newState;
  }
};
