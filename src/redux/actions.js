export const ADMIN_LOGIN_USER = "ADMIN_LOGIN_USER";
export const ADMIN_LOGIN_USER_SUCCESS = "ADMIN_LOGIN_USER_SUCCESS";
export const ADMIN_LOGIN_USER_ERROR = "ADMIN_LOGIN_USER_ERROR";
export const GET_STATES = "GET_STATES";
export const GET_FETCHDIST = "GET_FETCHDIST";

export const GET_TEACHERS_BY_ID = "GET_TEACHERS_BY_ID";
export const TEACHER_LOGIN_USER = "TEACHER_LOGIN_USER";
export const TEACHER_LOGIN_USER_SUCCESS = "TEACHER_LOGIN_USER_SUCCESS";
export const TEACHER_LOGIN_USER_ERROR = "TEACHER_LOGIN_USER_ERROR";
export const toggle_header = "toggle_header";
export const Layoutstyle_data = "Layoutstyle_data";

export const COORDINATOR_LOGIN_USER = "COORDINATOR_LOGIN_USER";
export const COORDINATOR_LOGIN_USER_SUCCESS = "COORDINATOR_LOGIN_USER_SUCCESS";
export const COORDINATOR_LOGIN_USER_ERROR = "COORDINATOR_LOGIN_USER_ERROR";

export const EVALUATOR_LOGIN_USER = "EVALUATOR_LOGIN_USER";
export const EVALUATOR_LOGIN_USER_SUCCESS = "EVALUATOR_LOGIN_USER_SUCCESS";
export const EVALUATOR_LOGIN_USER_ERROR = "EVALUATOR_LOGIN_USER_ERROR";
export const GET_SUBMITTED_IDEA_LIST = "GET_SUBMITTED_IDEA_LIST";
export const GET_INSTRUCTIONS = "GET_INSTRUCTIONS";
export const GET_L1_EVALUATED_IDEA = "GET_L1_EVALUATED_IDEA";
export const EVALUATOR_ADMIN_LOGIN_USER = "EVALUATOR_ADMIN_LOGIN_USER";
export const EVALUATOR_ADMIN_LOGIN_USER_SUCCESS =
  "EVALUATOR_ADMIN_LOGIN_USER_SUCCESS";
export const EVALUATOR_ADMIN_LOGIN_USER_ERROR =
  "EVALUATOR_ADMIN_LOGIN_USER_ERROR";
export const UPDATAE_EVALUATOR = "UPDATE_EVALUATOR";

export * from "../Coordinators/store/Coordinator/actions";
export * from "../Admin/store/admin/actions";
export * from "./studentRegistration/actions";
export * from "../Teacher/store/teacher/actions";
export * from "../Evaluator/store/evaluator/action";
