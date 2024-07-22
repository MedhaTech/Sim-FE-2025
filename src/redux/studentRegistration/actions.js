/* eslint-disable indent */
import axios from "axios";

import {
  GET_STATES,
  GET_FETCHDIST,
  // GET_CHALLENGE_SUBMITTED_DATA,
  // GET_STUDENTS_LIST_ERROR,
  // GET_STUDENT_DASHBOARD_STATUS,
  // SET_POSTSURVEY_STATUS,
} from "../actions";
import { URL, KEY } from "../../constants/defaultValues";
import { getNormalHeaders } from "../../helpers/Utils";
import { encryptGlobal } from "../../constants/encryptDecrypt";
// import { getLanguage } from "../../constants/languageOptions";

export const getFetchDistsSuccess = (data) => async (dispatch) => {
  dispatch({
    type: GET_FETCHDIST,
    payload: data,
  });
};
export const getFetchDistData = (item) => async (dispatch) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const distParam = encryptGlobal(
      JSON.stringify({
        state: item,
      })
    );

    let result;
    result = await axios
      .get(`${URL.getFetchDistsOnly}Data=${distParam}`, axiosConfig)
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result.data.data.length > 0 ? result.data.data : [];
      console.log(result, "actions");
      dispatch(getFetchDistsSuccess(data));
    } else {
      dispatch(getFetchDistsSuccess([]));
    }
  } catch (error) {
    dispatch(getFetchDistsSuccess([]));
  }
};
export const getStatesSuccess = (data) => async (dispatch) => {
  dispatch({
    type: GET_STATES,
    payload: data,
  });
};
export const getStateData = () => async (dispatch) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    let result;
    result = await axios
      .get(`${URL.getStatesOnly}`, axiosConfig)
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result.data.data.length > 0 ? result.data.data : [];
      dispatch(getStatesSuccess(data));
    } else {
      dispatch(getStatesSuccess([]));
    }
  } catch (error) {
    dispatch(getStatesSuccess([]));
  }
};
// export const getStudentListError = (message) => async (dispatch) => {
//   dispatch({
//     type: GET_STUDENTS_LIST_ERROR,
//     payload: { message },
//   });
// };
// export const getStudentChallengeSubmittedResponseSuccess =
//   (questions) => async (dispatch) => {
//     dispatch({
//       type: GET_CHALLENGE_SUBMITTED_DATA,
//       payload: questions,
//     });
//   };
// export const getStudentChallengeSubmittedResponse =
//   (id, language) => async (dispatch) => {
//     try {
//       const locale = getLanguage(language);
//       const newres = encryptGlobal(
//         JSON.stringify({
//           team_id: id,
//           locale,
//         })
//       );
//       const axiosConfig = getNormalHeaders(KEY.User_API_Key);
//       const result = await axios
//         .get(`${URL.getChallengeSubmittedResponse}Data=${newres}`, axiosConfig)
//         .then((user) => user)
//         .catch((err) => {
//           return err.response;
//         });
//       if (result && result.status === 200) {
//         const data =
//           result.data &&
//           result?.data?.data.length > 0 &&
//           result?.data?.data[0]?.dataValues;
//         dispatch(getStudentChallengeSubmittedResponseSuccess(data));
//       } else {
//         dispatch(getStudentListError(result.statusText));
//       }
//     } catch (error) {
//       dispatch(getStudentListError({}));
//     }
//   };
// export const getStudentDashboardStatusSuccess = (data) => async (dispatch) => {
//   dispatch({
//     type: GET_STUDENT_DASHBOARD_STATUS,
//     payload: data,
//   });
// };
// export const getStudentDashboardStatus = (id, language) => async (dispatch) => {
//   try {
//     const locale = getLanguage(language);
//     const axiosConfig = getNormalHeaders(KEY.User_API_Key);
//     const resultParam = encryptGlobal(JSON.stringify({ locale }));
//     const idParam = encryptGlobal(JSON.stringify(id));
//     const result = await axios
//       .get(
//         `${URL.getStudentDashboardStatusCommonById}${idParam}?Data=${resultParam}`,
//         axiosConfig
//       )
//       .then((data) => data)
//       .catch((err) => {
//         return err.response;
//       });
//     if (result && result.status === 200) {
//       const data = result.data && result?.data?.data && result?.data?.data[0];
//       dispatch(getStudentDashboardStatusSuccess(data));
//     } else {
//       dispatch(getStudentDashboardStatusSuccess(null));
//     }
//   } catch (error) {
//     dispatch(getStudentDashboardStatusSuccess(null));
//   }
// };
// export const studentPostSurveyCertificateSuccess =
//   (data) => async (dispatch) => {
//     dispatch({
//       type: SET_POSTSURVEY_STATUS,
//       payload: data,
//     });
//   };
// export const studentPostSurveyCertificate = (language) => async (dispatch) => {
//   try {
//     const axiosConfig = getNormalHeaders(KEY.User_API_Key);
//     const locale = getLanguage(language);
//     let enParamData = encryptGlobal(
//       JSON.stringify({
//         role: "STUDENT",
//         locale,
//       })
//     );
//     await axios
//       .get(`${URL.getPostSurveyList}?Data=${enParamData}`, axiosConfig)
//       .then((postSurveyRes) => {
//         if (postSurveyRes?.status === 200) {
//           dispatch(
//             studentPostSurveyCertificateSuccess(
//               postSurveyRes.data.data[0].dataValues[1].progress
//             )
//           );
//         }
//       })
//       .catch((err) => {
//         return err.response;
//       });
//   } catch (error) {
//     dispatch(studentPostSurveyCertificateSuccess(null));
//   }
// };
