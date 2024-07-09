/* eslint-disable indent */
// Foulders Reducers //
import {
  ADMIN_COURSES_DETAILS,
  ADMIN_COURSES_DETAILS_SUCCESS,
  ADMIN_COURSES_DETAILS_ERROR,
} from "../../../../redux/actions.js";

const INIT_STATE = {
  loading: false,
  error: "",
  adminCoursesDetails: {},
};

export default (state = INIT_STATE, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADMIN_COURSES_DETAILS:
      return { ...state, loading: true, error: "" };
    case ADMIN_COURSES_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminCoursesDetails: action.payload.data,
        error: "",
      };
    case ADMIN_COURSES_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        adminCoursesDetails: {},
        error: action.payload.message,
      };

    default:
      return newState;
  }
};
