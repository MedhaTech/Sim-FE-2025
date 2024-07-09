/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";

import {
  ADMIN_COURSES_DETAILS,
  ADMIN_COURSES_DETAILS_SUCCESS,
  ADMIN_COURSES_DETAILS_ERROR,
} from "../../../../redux/actions.js";
import { URL, KEY } from "../../../../constants/defaultValues.js";
import { getNormalHeaders } from "../../../../helpers/Utils.js";
import { getLanguage } from "../../../../constants/languageOptions.js";
import { encryptGlobal } from "../../../../constants/encryptDecrypt.js";

export const getAdminCourseDetailsSuccess = (user) => async (dispatch) => {
  dispatch({
    type: ADMIN_COURSES_DETAILS_SUCCESS,
    payload: user,
  });
};

export const getAdminCourseDetailsError = (message) => async (dispatch) => {
  dispatch({
    type: ADMIN_COURSES_DETAILS_ERROR,
    payload: { message },
  });
};

export const getAdminCourseDetails = (courseId, lang) => async (dispatch) => {
  // here courseId = courseId //

  try {
    dispatch({ type: ADMIN_COURSES_DETAILS });
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const couId = encryptGlobal(JSON.stringify(courseId));
    const locale = getLanguage(lang);
    const resLang = encryptGlobal(JSON.stringify({ locale }));
    const result = await axios
      .get(`${URL.getAdminCousesDetails + couId}?Data=${resLang}`, axiosConfig)
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result.data;
      dispatch(getAdminCourseDetailsSuccess(data));
    } else {
      dispatch(getAdminCourseDetailsError(result.statusText));
    }
  } catch (error) {
    dispatch(getAdminCourseDetailsError({}));
  }
};
