/* eslint-disable indent */
/* eslint-disable no-undef */
export const adminRoot = "/admin";

export const UserRole = {};

export const URL = {
  getStatesOnly: process.env.REACT_APP_API_BASE_URL + "/organizations/states",
  getFetchDistsOnly:
    process.env.REACT_APP_API_BASE_URL + "/organizations/districts?",
  adminLogin: process.env.REACT_APP_API_BASE_URL + "/admins/login",
  coordinatorLogin:
    process.env.REACT_APP_API_BASE_URL + "/state_coordinators/login",
  eadminLogin: process.env.REACT_APP_API_BASE_URL + "/admins/login?",
  evaluatorLogin: process.env.REACT_APP_API_BASE_URL + "/evaluators/login",
  getPreSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys`,
  addMentor: process.env.REACT_APP_API_BASE_URL + "/mentors/create",
  getStudentById: process.env.REACT_APP_API_BASE_URL + "/students/",
  getMentors: process.env.REACT_APP_API_BASE_URL + "/mentors",
  deleteMentor: process.env.REACT_APP_API_BASE_URL + "/mentor/delete",
  updateMentor: process.env.REACT_APP_API_BASE_URL + "/mentors/update",
  getTeamMembersList: `${process.env.REACT_APP_API_BASE_URL}/teams/`,
  getTeamsList: `${process.env.REACT_APP_API_BASE_URL}/teams`,
  getTeamMemberStatusEndpoint:
    process.env.REACT_APP_API_BASE_URL + "/dashboard/teamStats/",
  getTeacherCousesDetails:
    process.env.REACT_APP_API_BASE_URL + "/mentorCourses/",
  getMentorAttachments:
    process.env.REACT_APP_API_BASE_URL + "/mentorAttachments",
  putResetPassword:
    process.env.REACT_APP_API_BASE_URL + "/mentors/resetPassword",
  getMentorSupportTickets:
    process.env.REACT_APP_API_BASE_URL + "/supportTickets",
  createMentorSupportTickets:
    process.env.REACT_APP_API_BASE_URL + "/supportTickets",
  updateSupportTicketResponse:
    process.env.REACT_APP_API_BASE_URL + '/supportTickets',
  createMentorSupportTicketResponse:
    process.env.REACT_APP_API_BASE_URL + '/supportTicketsReply',
  getMentorSupportTicketsById:
    process.env.REACT_APP_API_BASE_URL + "/supportTickets/",
  getMentorSupportTicketResponsesById:
    process.env.REACT_APP_API_BASE_URL + "/supportTicketsReply",
  getPostSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys`,
  createMultiStudent:
    process.env.REACT_APP_API_BASE_URL + "/students/bulkCreateStudent",
  adminLogOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",
  teacherLogin: process.env.REACT_APP_API_BASE_URL + "/mentors/login",
  teacherLogOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",
  coordinatorLogOut:
    process.env.REACT_APP_API_BASE_URL + "/state_coordinators/logout",
  getTeacherById: process.env.REACT_APP_API_BASE_URL + "/mentors/",
};
const API = "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870";

export const KEY = {
  User_API_Key: API,
};

export const isAuthGuardActive = true;
