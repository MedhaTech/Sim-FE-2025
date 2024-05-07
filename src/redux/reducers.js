import { combineReducers } from "redux";
import admin from "../Admin/store/admin/reducer";

const reducers = combineReducers({
  admin,
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return reducers({}, action);
  }

  return reducers(state, action);
};
export default rootReducer;
