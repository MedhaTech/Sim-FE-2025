/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import axios from "axios";

import {
  GET_STATES,
  GET_FETCHDIST,
  GET_STUDENTS,
  GET_CHALLENGE_SUBMITTED_DATA,
  GET_STUDENT_DASHBOARD_STATUS,
  GET_STUDENTS_LIST_ERROR,
  GET_STUDENTS_LIST_SUCCESS,
  UPDATE_STUDENT_STATUS,
  GET_STUDENT,
  GET_STUDENTS_LANGUAGE,
  GET_CHALLENGE_QUESTIONS,
  GET_STUDENT_BADGES,
  GET_STUDENT_DASHBOARD_CHALLENGES_STATUS,
  GET_STUDENT_DASHBOARD_TEAMPROGRESS,
  GET_STUDENT_DASHBOARD_TUTORIALS,
  SET_PRESURVEY_STATUS,
  SET_POSTSURVEY_STATUS,
  SET_FILE_SUCCESS,
  GET_DISTRICTS,
  GET_PINCODES,
  GET_ATLCODES,
} from "../actions";
import { URL, KEY } from "../../constants/defaultValues";
import {
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import { getLanguage } from "../../constants/languageOptions";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import logout from "../../assets/img/badge.png";
import { encryptGlobal } from "../../constants/encryptDecrypt";

export const getStudentListSuccess = (user) => async (dispatch) => {
  dispatch({
    type: GET_STUDENTS_LIST_SUCCESS,
    payload: user,
  });
};
export const getStudentGlobalLanguage = (language) => async (dispatch) => {
  dispatch({
    type: GET_STUDENTS_LANGUAGE,
    payload: language,
  });
};

export const getStudentSuccess = (user) => async (dispatch) => {
  dispatch({
    type: GET_STUDENT,
    payload: user,
  });
};

export const getStudentListError = (message) => async (dispatch) => {
  dispatch({
    type: GET_STUDENTS_LIST_ERROR,
    payload: { message },
  });
};

export const getStudentRegistationData = (studentType) => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENTS });
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const getStu = encryptGlobal(
      JSON.stringify({
        adult: "true",
      })
    );
    const newS = encryptGlobal(
      JSON.stringify({
        status: "ALL",
        state: studentType,
      })
    );
    let result;
    if (studentType && studentType === "above") {
      result = await axios
        .get(`${URL.getStudents}?Data=${getStu}`, axiosConfig)
        .then((user) => user)
        .catch((err) => {
          return err.response;
        });
    } else {
      result = await axios
        .get(`${URL.getStudents}?Data=${newS}`, axiosConfig)
        .then((user) => user)
        .catch((err) => {
          return err.response;
        });
    }
    if (result && result.status === 200) {
      const data = result.data?.data[0]?.dataValues || [];
      let datamodify =
        data.length > 0 ? data.forEach((item, i) => (item.id = i + 1)) : [];
      // console.log(datamodify);
      dispatch(getStudentListSuccess(data));
    } else {
      dispatch(getStudentListError(result.statusText));
    }
  } catch (error) {
    dispatch(getStudentListError({}));
  }
};
export const getDistrictsSuccess = (data) => async (dispatch) => {
  // where data = all districts //
  dispatch({
    type: GET_DISTRICTS,
    payload: data,
  });
};
export const getDistrictData = () => async (dispatch) => {
  // here we can see  district wise data //
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    let result;
    result = await axios
      .get(`${URL.getDistrictsOnly}`, axiosConfig)
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result.data.data.length > 0 ? result.data.data : [];
      dispatch(getDistrictsSuccess(data));
    } else {
      dispatch(getDistrictsSuccess([]));
    }
  } catch (error) {
    dispatch(getDistrictsSuccess([]));
  }
};
export const getAtlCodesSuccess = (data) => async (dispatch) => {
  // where data = all districts //
  dispatch({
    type: GET_ATLCODES,
    payload: data,
  });
};
export const getAtlCodeData = (item) => async (dispatch) => {
  // here we can see  district wise data //
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    let result;
    const ItemAtl = encryptGlobal(
      JSON.stringify({
        pin_code: item,
      })
    );
    result = await axios
      .get(`${URL.getAtlCodesOnly}Data=${ItemAtl}`, axiosConfig)
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result.data.data.length > 0 ? result.data.data : [];
      const ATLlistObj = {};
      const ATLCodeslist = data.map((code) => {
        ATLlistObj[code.organization_code] = code.organization_name;
        return code.organization_code;
      });
      dispatch(getAtlCodesSuccess(data));
    } else {
      dispatch(getAtlCodesSuccess([]));
    }
  } catch (error) {
    dispatch(getAtlCodesSuccess([]));
  }
};
export const getPinCodesSuccess = (data) => async (dispatch) => {
  // where data = all districts //
  dispatch({
    type: GET_PINCODES,
    payload: data,
  });
};
export const getPinCodeData = (item) => async (dispatch) => {
  // here we can see  district wise data //
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    let result;
    const Item = encryptGlobal(
      JSON.stringify({
        district: item,
      })
    );
    result = await axios
      .get(`${URL.getPinCodesOnly}Data=${Item}`, axiosConfig)
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result.data.data.length > 0 ? result.data.data : [];
      dispatch(getPinCodesSuccess(data));
    } else {
      dispatch(getPinCodesSuccess([]));
    }
  } catch (error) {
    dispatch(getPinCodesSuccess([]));
  }
};
export const getFetchDistsSuccess = (data) => async (dispatch) => {
  // where data = all districts //
  dispatch({
    type: GET_FETCHDIST,
    payload: data,
  });
};
export const getFetchDistData = (item) => async (dispatch) => {
  // here we can see  district wise data //
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
      dispatch(getFetchDistsSuccess(data));
    } else {
      dispatch(getFetchDistsSuccess([]));
    }
  } catch (error) {
    dispatch(getFetchDistsSuccess([]));
  }
};
export const getStatesSuccess = (data) => async (dispatch) => {
  // where data = all districts //
  dispatch({
    type: GET_STATES,
    payload: data,
  });
};
export const getStateData = () => async (dispatch) => {
  // here we can see  district wise data //
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


export const updateStudentStatus = (data, id) => async (dispatch) => {
  // here we can update the student status  //
  // here id = student id  //
  try {
    dispatch({ type: UPDATE_STUDENT_STATUS });
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const upId = encryptGlobal(JSON.stringify(id));
    const result = await axios
      .put(`${URL.updateStudentStatus + "/" + upId}`, data, axiosConfig)
      .then((user) => console.log(user))
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      // const data =
      //     result.data &&
      //     result.data.data[0] &&
      //     result.data.data[0].dataValues;
      // dispatch(getAdminMentorsListSuccess(data));
    } else {
      dispatch(getStudentListError(result.statusText));
    }
  } catch (error) {
    dispatch(getStudentListError({}));
  }
};

export const getChallengeQuestionsSuccess = (questions) => async (dispatch) => {
  dispatch({
    type: GET_CHALLENGE_QUESTIONS,
    payload: questions,
  });
};

export const getStudentChallengeQuestions = (language) => async (dispatch) => {
  try {
    // dispatch({ type: GET_STUDENTS });
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const Id = encryptGlobal("1");
    const locale = getLanguage(language);
    const Challres = encryptGlobal(JSON.stringify({ locale }));
    const result = await axios
      .get(`${URL.getChallengeQuestions}/${Id}?Data=${Challres}`, axiosConfig)
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      
      const data =
        result.data &&
        result?.data?.data[0]?.challenge_questions.length > 0 &&
        result?.data?.data[0]?.challenge_questions;

      dispatch(getChallengeQuestionsSuccess(data));
    } else {
      dispatch(getStudentListError(result.statusText));
    }
  } catch (error) {
    dispatch(getStudentListError({}));
  }
};
export const getStudentChallengeSubmittedResponseSuccess =
  (questions) => async (dispatch) => {
    dispatch({
      type: GET_CHALLENGE_SUBMITTED_DATA,
      payload: questions,
    });
  };
export const getStudentChallengeSubmittedResponse =
  (id, language) => async (dispatch) => {
    try {
      const locale = getLanguage(language);
      const newres = encryptGlobal(
        JSON.stringify({
          team_id: id,
          locale,
        })
      );
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const result = await axios
        .get(`${URL.getChallengeSubmittedResponse}Data=${newres}`, axiosConfig)
        .then((user) => user)
        .catch((err) => {
          return err.response;
        });
      if (result && result.status === 200) {
        const data =
          result.data &&
          result?.data?.data.length > 0 &&
          result?.data?.data[0]?.dataValues;
        dispatch(getStudentChallengeSubmittedResponseSuccess(data));
      } else {
        dispatch(getStudentListError(result.statusText));
      }
    } catch (error) {
      dispatch(getStudentListError({}));
    }
  };

export const initiateIdea = async (
  id,
  language,
  history,
  data,
  setShowChallenges,
  t
) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const challengeParamID = encryptGlobal("1");
    const locale = getLanguage(language);
    const queryObj = JSON.stringify({
      team_id: id,
      locale,
    });
    const queryObjEn = encryptGlobal(queryObj);
    const result = await axios
      .post(
        `${URL.initiateChallenge}${challengeParamID}/initiate?Data=${queryObjEn}`,
        data,
        axiosConfig
      )
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      openNotificationWithIcon("success", t("student.idea_init_succ"));
      setShowChallenges(true);
      history.push("/challenges");
    } else {
      openNotificationWithIcon(
        "error",
        `${result?.data?.data[0]?.initiated_by} Already Initiated the Idea`
      );
    }
  } catch (error) {
    openNotificationWithIcon(
      "error",
      `${error?.response?.data?.data[0]?.initiated_by} Already Initiated the Idea`
    );
  }
};
export const setFilesSuccess = (badges) => async (dispatch) => {
  dispatch({
    type: SET_FILE_SUCCESS,
    payload: badges,
  });
};
export const uploadFiles = (data) => async (dispatch) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const result = await axios
      .post(`${URL.uploadFile}`, data, axiosConfig)
      .then((res) => res)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      dispatch(setFilesSuccess(result.data?.data[0]?.attachments));
    } else {
      openNotificationWithIcon("error", `${result?.data?.message}`);
    }
  } catch (error) {
    openNotificationWithIcon("error", `${error?.response?.data?.message}`);
  }
};

export const getStudentBadgesSuccess = (badges) => async (dispatch) => {
  dispatch({
    type: GET_STUDENT_BADGES,
    payload: badges,
  });
};
export const getStudentBadges = (id, language) => async (dispatch) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const stuId = encryptGlobal(JSON.stringify(id));
    const locale = getLanguage(language);
    const res = encryptGlobal(JSON.stringify({ locale }));
    const result = await axios
      .get(`${URL.getStudentBadges}${stuId}/badges?Data=${res}`, axiosConfig)
      .then((badges) => badges)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result.data && result?.data?.data;
      dispatch(getStudentBadgesSuccess(data));
    } else {
      dispatch(getStudentListError(result.statusText));
    }
  } catch (error) {
    dispatch(getStudentListError({}));
  }
};

export const updateStudentBadges =
  (data, id, language, t) => async (dispatch) => {
    try {
      const locale = getLanguage(language);
      const upLan = encryptGlobal(JSON.stringify(id));
      const resL = encryptGlobal(JSON.stringify({ locale }));
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const result = await axios
        .post(
          `${URL.getStudentBadges}${upLan}/badges?Data=${resL}`,
          data,
          axiosConfig
        )
        .then(() => {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          });

          swalWithBootstrapButtons.fire({
            title: t("badges.congratulations"),
            text: t("badges.earn"),
            imageUrl: `${logout}`,
            showCloseButton: true,
            confirmButtonText: t("badges.ok"),
            showCancelButton: false,
            reverseButtons: false,
          });
        })
        .catch((err) => {
          return err.response;
        });
      if (result && result.status === 202) {
        const data = result.data && result?.data?.data;
        dispatch(getStudentBadgesSuccess(data));
      } else {
        dispatch(getStudentListError(result.statusText));
      }
    } catch (error) {
      dispatch(getStudentListError({}));
    }
  };

export const getStudentDashboardStatusSuccess = (data) => async (dispatch) => {
  dispatch({
    type: GET_STUDENT_DASHBOARD_STATUS,
    payload: data,
  });
};
export const getStudentDashboardStatus = (id, language) => async (dispatch) => {
  try {
    const locale = getLanguage(language);
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const resultParam = encryptGlobal(JSON.stringify({ locale }));
    const idParam = encryptGlobal(JSON.stringify(id));
    const result = await axios
      .get(
        `${URL.getStudentDashboardStatusCommonById}${idParam}?Data=${resultParam}`,
        axiosConfig
      )
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result.data && result?.data?.data && result?.data?.data[0];
      dispatch(getStudentDashboardStatusSuccess(data));
    } else {
      dispatch(getStudentDashboardStatusSuccess(null));
    }
  } catch (error) {
    dispatch(getStudentDashboardStatusSuccess(null));
  }
};
export const getStudentDashboardChallengesStatusSuccess =
  (data) => async (dispatch) => {
    dispatch({
      type: GET_STUDENT_DASHBOARD_CHALLENGES_STATUS,
      payload: data,
    });
  };
export const getStudentDashboardChallengesStatus =
  (id, language) => async (dispatch) => {
    try {
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const locale = getLanguage(language);
      const getId = encryptGlobal(JSON.stringify(id));
      const res = encryptGlobal(JSON.stringify({ locale }));
      const result = await axios
        .get(
          `${URL.getStudentDashboardStatusCommonById}${getId}/challenges?Data=${res}`,
          axiosConfig
        )
        .then((data) => data)
        .catch((err) => {
          return err.response;
        });
      if (result && result.status === 200) {
        const data = result.data && result?.data?.data && result?.data?.data[0];
        dispatch(getStudentDashboardChallengesStatusSuccess(data));
      } else {
        dispatch(getStudentDashboardChallengesStatusSuccess(null));
      }
    } catch (error) {
      dispatch(getStudentDashboardChallengesStatusSuccess(null));
    }
  };
export const getStudentDashboardTeamProgressStatusSuccess =
  (data) => async (dispatch) => {
    dispatch({
      type: GET_STUDENT_DASHBOARD_TEAMPROGRESS,
      payload: data,
    });
  };
export const getStudentDashboardTeamProgressStatus =
  (id, language) => async (dispatch) => {
    try {
      const dashId = encryptGlobal(JSON.stringify(id));
      const locale = getLanguage(language);
      const res = encryptGlobal(JSON.stringify({ locale }));
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const result = await axios
        .get(
          `${URL.getStudentDashboardStatusCommonById}${dashId}/teamProgress?Data=${res}`,
          axiosConfig
        )
        .then((data) => data)
        .catch((err) => {
          return err.response;
        });

      if (result && result.status === 200) {
        const data = result.data && result?.data?.data && result?.data?.data;
        dispatch(getStudentDashboardTeamProgressStatusSuccess(data));
      } else {
        dispatch(getStudentDashboardTeamProgressStatusSuccess(null));
      }
    } catch (error) {
      dispatch(getStudentDashboardTeamProgressStatusSuccess(null));
    }
  };

export const getStudentDashboardTutorialVideosSuccess =
  (data) => async (dispatch) => {
    dispatch({
      type: GET_STUDENT_DASHBOARD_TUTORIALS,
      payload: data,
    });
  };
export const getStudentDashboardTutorialVideos =
  (language) => async (dispatch) => {
    try {
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const locale = getLanguage(language);
      const ResParam = encryptGlobal(JSON.stringify({ locale }));
      const result = await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/tutorialVideos?Data=${ResParam}`,
          axiosConfig
        )
        .then((data) => data)
        .catch((err) => {
          return err.response;
        });
      if (result && result.status === 200) {
        const data =
          result.data && result?.data?.data && result?.data?.data[0].dataValues;
        dispatch(getStudentDashboardTutorialVideosSuccess(data));
      } else {
        dispatch(getStudentDashboardTutorialVideosSuccess(null));
      }
    } catch (error) {
      dispatch(getStudentDashboardTutorialVideosSuccess(null));
    }
  };
export const updateStudentCertificate = async (id) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const idParam = encryptGlobal(JSON.stringify(id));
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/students/${idParam}/studentCertificate`,
        axiosConfig
      )
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
  } catch (error) {
    openNotificationWithIcon("error", "Something went wrong!");
  }
};
export const studentPostSurveyCertificateSuccess =
  (data) => async (dispatch) => {
    dispatch({
      type: SET_POSTSURVEY_STATUS,
      payload: data,
    });
  };
export const studentPostSurveyCertificate = (language) => async (dispatch) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const locale = getLanguage(language);
    let enParamData = encryptGlobal(
      JSON.stringify({
        role: "STUDENT",
        locale,
      })
    );
    await axios
      .get(`${URL.getPostSurveyList}?Data=${enParamData}`, axiosConfig)
      .then((postSurveyRes) => {
        if (postSurveyRes?.status === 200) {
          dispatch(
            studentPostSurveyCertificateSuccess(
              postSurveyRes.data.data[0].dataValues[1].progress
            )
          );
        }
      })
      .catch((err) => {
        return err.response;
      });
  } catch (error) {
    dispatch(studentPostSurveyCertificateSuccess(null));
  }
};
export const setPresurveyStatus = (data) => async (dispatch) => {
  dispatch({
    type: SET_PRESURVEY_STATUS,
    payload: data,
  });
};
export const getPresurveyData = (language) => async (dispatch) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const locale = getLanguage(language);
    let enParamDatas = encryptGlobal(
      JSON.stringify({
        role: "STUDENT",
        locale,
      })
    );
    axios
      .get(
        `${URL.getStudentPreSurveyList}?Data=${enParamDatas}
                )}`,
        axiosConfig
      )
      .then((preSurveyRes) => {
        if (preSurveyRes?.status == 200) {
          dispatch(
            setPresurveyStatus(
              preSurveyRes.data?.data[0] ? preSurveyRes.data?.data[0] : null
            )
          );
        }
      })
      .catch(() => {
        dispatch(setPresurveyStatus(null));
      });
  } catch (error) {
    dispatch(setPresurveyStatus(null));
  }
};


export const getlogout = () => async () => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    axios.get(`${URL.getlogout}`, axiosConfig).then((Res) => {
      if (Res?.status == 200) {
        // console.log(Res);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
