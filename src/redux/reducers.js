/* eslint-disable indent */
import { combineReducers } from "redux";
import admin from "../Admin/store/admin/reducer";
import studentRegistration from "./studentRegistration/reducers";

const reducers = combineReducers({
  admin,
  studentRegistration,
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return reducers({}, action);
  }

  return reducers(state, action);
};
export default rootReducer;
