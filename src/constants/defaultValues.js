/* eslint-disable indent */
/* eslint-disable no-undef */
export const adminRoot = "/admin";

export const UserRole = {};

export const URL = {
  getAdminCouses: process.env.REACT_APP_API_BASE_URL + "/courses",
  addAdminCourses: process.env.REACT_APP_API_BASE_URL + "/course",
  getAdminCousesDetails: process.env.REACT_APP_API_BASE_URL + "/courses/",
  getAdminQstList: process.env.REACT_APP_API_BASE_URL + "/quiz/",
  putAdminQuizResponce: process.env.REACT_APP_API_BASE_URL + "/quiz/",
  postAdminRefQuizResponce:
    process.env.REACT_APP_API_BASE_URL + "/reflectiveQuiz/",
  getAdminRefQizList: process.env.REACT_APP_API_BASE_URL + "/reflectiveQuiz/",
  getStudents: process.env.REACT_APP_API_BASE_URL + "/students",
  getMentors: process.env.REACT_APP_API_BASE_URL + '/mentors',
  getidealist: process.env.REACT_APP_API_BASE_URL_FOR_REPORTS
  + '/challenge_response?',
  getAdminEvaluator: process.env.REACT_APP_API_BASE_URL + '/evaluators',
  getidealistfinal:
  process.env.REACT_APP_API_BASE_URL_FOR_REPORTS 
 +
  '/challenge_response/evaluationResult',
  getFinalEvaluation:
  process.env.REACT_APP_API_BASE_URL_FOR_REPORTS  +
        '/challenge_response/finalEvaluation',
        getNotificationsList:
        process.env.REACT_APP_API_BASE_URL + '/notifications/tome',
  gettotalcount:
  process.env.REACT_APP_API_BASE_URL + '/dashboard/evaluatorStats',
  updateEvalProcess:
        process.env.REACT_APP_API_BASE_URL + '/evaluationProcess/',
  updateEvaluatorState:
        process.env.REACT_APP_API_BASE_URL + '/evaluators/',
  // getStudentById: process.env.REACT_APP_API_BASE_URL + '/students/',
  updateStudentStatus: process.env.REACT_APP_API_BASE_URL + "/students",
  getChallengeQuestions: process.env.REACT_APP_API_BASE_URL + "/challenge",
  getChallengeSubmittedResponse:
    process.env.REACT_APP_API_BASE_URL +
    "/challenge_response/submittedDetails?",
  initiateChallenge:
    process.env.REACT_APP_API_BASE_URL + "/challenge_response/",
  uploadFile:
    process.env.REACT_APP_API_BASE_URL + "/challenge_response/fileUpload",
  getStudentBadges: process.env.REACT_APP_API_BASE_URL + "/students/",
  // getStudentDashboardStatusCommonById:
  // process.env.REACT_APP_API_BASE_URL + '/dashboard/studentStats/',
  getPostSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys`,
  getStudentPreSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys/2`,
  getStatesOnly: process.env.REACT_APP_API_BASE_URL + "/organizations/states",
  getFetchDistsOnly:
    process.env.REACT_APP_API_BASE_URL + "/organizations/districts?",
  adminLogin: process.env.REACT_APP_API_BASE_URL + "/admins/login",
  teamlogin: process.env.REACT_APP_API_BASE_URL + "/teams/login",
  login: process.env.REACT_APP_API_BASE_URL + "/students/login",
  getStudentDashboardStatusCommonById:
    process.env.REACT_APP_API_BASE_URL + "/dashboard/studentStats/",
  coordinatorLogin:
    process.env.REACT_APP_API_BASE_URL + "/states/login",
  eadminLogin: process.env.REACT_APP_API_BASE_URL + "/admins/login?",
  evaluatorLogin: process.env.REACT_APP_API_BASE_URL + "/evaluators/login",
  getPreSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys`,
  addMentor: process.env.REACT_APP_API_BASE_URL + "/mentors/create",
  getStudentById: process.env.REACT_APP_API_BASE_URL + "/students/",
  deleteMentor: process.env.REACT_APP_API_BASE_URL + "/mentor/delete",
  updateMentor: process.env.REACT_APP_API_BASE_URL + "/mentors/update",
  getTeamMembersList: `${process.env.REACT_APP_API_BASE_URL}/teams/`,
  getTeamsList: `${process.env.REACT_APP_API_BASE_URL}/teams`,
  getAdmin: process.env.REACT_APP_API_BASE_URL + '/admins/',
  updateAdminStatus: process.env.REACT_APP_API_BASE_URL + '/admins',
  adminRegister: process.env.REACT_APP_API_BASE_URL + '/admins',
  StatePath: process.env.REACT_APP_API_BASE_URL + '/states',
  deleteTempMentor: process.env.REACT_APP_API_BASE_URL + '/mentors/',
  studentResetPwd:
  process.env.REACT_APP_API_BASE_URL + '/students/resetPassword',
  getTeamMemberStatusEndpoint:
    process.env.REACT_APP_API_BASE_URL + "/dashboard/teamStats/",
  getTeacherCousesDetails:
    process.env.REACT_APP_API_BASE_URL + "/mentorCourses/",
  getMentorAttachments:
    process.env.REACT_APP_API_BASE_URL + "/mentorAttachments",
    getSchoolRegistrationBulkupload:
        process.env.REACT_APP_API_BASE_URL + '/organizations?',
        createOrganization:
        process.env.REACT_APP_API_BASE_URL + '/organizations/createOrg',
  putResetPassword:
    process.env.REACT_APP_API_BASE_URL + "/mentors/resetPassword",
  getMentorSupportTickets:
    process.env.REACT_APP_API_BASE_URL + "/supportTickets",
  createMentorSupportTickets:
    process.env.REACT_APP_API_BASE_URL + "/supportTickets",
  updateSupportTicketResponse:
    process.env.REACT_APP_API_BASE_URL + "/supportTickets",
  createMentorSupportTicketResponse:
    process.env.REACT_APP_API_BASE_URL + "/supportTicketsReply",
  getMentorSupportTicketsById:
    process.env.REACT_APP_API_BASE_URL + "/supportTickets/",
  getMentorSupportTicketResponsesById:
    process.env.REACT_APP_API_BASE_URL + "/supportTicketsReply",
  // getPostSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys`,
  createMultiStudent:
    process.env.REACT_APP_API_BASE_URL + "/students/bulkCreateStudent",
  adminLogOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",
  logOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",
  teamlogOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",

  teacherLogin: process.env.REACT_APP_API_BASE_URL + "/mentors/login",
  teacherLogOut: process.env.REACT_APP_API_BASE_URL + "/auth/logout",
  coordinatorLogOut:
    process.env.REACT_APP_API_BASE_URL + "/states/logout",
  getTeacherById: process.env.REACT_APP_API_BASE_URL + "/mentors/",
};
const API = "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870";

export const KEY = {
  User_API_Key: API,
};

export const isAuthGuardActive = true;
