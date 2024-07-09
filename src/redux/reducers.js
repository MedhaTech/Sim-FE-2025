/* eslint-disable indent */
import { combineReducers } from "redux";
import admin from "../Admin/store/admin/reducer";
import studentRegistration from "./studentRegistration/reducers";
import teacher from "../Teacher/store/teacher/reducers";
import evaluator from "../Evaluator/store/evaluator/reducer";
import mentors from "../Teacher/store/mentors/reducer";
import teams from "../Teacher/store/teams/reducer";
import teacherCourses from "../Teacher/store/courses/reducer";
import adminCourses from "../Admin/Courses/store/adminCourses/reducer";

const reducers = combineReducers({
  admin,
  mentors,
  studentRegistration,
  teacher,
  evaluator,
  teams,
  teacherCourses,
  adminCourses,
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return reducers({}, action);
  }

  return reducers(state, action);
};
export default rootReducer;
