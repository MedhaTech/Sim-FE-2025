/* eslint-disable indent */
// Foulders Reducers //
import {
  TEAM_LOGIN_USER,
  TEAM_LOGIN_USER_SUCCESS,
  TEAM_LOGIN_USER_ERROR,
} from "../../redux/actions.js";

const INIT_STATE = {
  currentUser: {},
  loading: false,
  error: "",
  // stepTwoData:{},
  editData: {},
};

export default (state = INIT_STATE, action) => {
  const newState = { ...state };
  switch (action.type) {
    case TEAM_LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case TEAM_LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: "",
      };
    case TEAM_LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };

    default:
      return newState;
  }
};
