/* eslint-disable indent */
import { combineReducers } from "redux";
import admin from "../Admin/store/admin/reducer";
import studentRegistration from "./studentRegistration/reducers";
import teacher from "../Teacher/store/teacher/reducers";
import evaluator from "../Evaluator/store/evaluator/reducer";

const reducers = combineReducers({
  admin,
  studentRegistration,
  teacher,
  evaluator,
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return reducers({}, action);
  }

  return reducers(state, action);
};
export default rootReducer;
