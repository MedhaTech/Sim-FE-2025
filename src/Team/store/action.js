/* eslint-disable indent */
import axios from "axios";

import {
  TEAM_LOGIN_USER,
  TEAM_LOGIN_USER_SUCCESS,
  TEAM_LOGIN_USER_ERROR,
} from "../../redux/actions";
import { URL, KEY } from "../../constants/defaultValues";
import {
  setCurrentUser,
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../helpers/Utils";

export const teamloginUserSuccess = (user) => async (dispatch) => {
  dispatch({
    type: TEAM_LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const teamloginUserError = (message) => async (dispatch) => {
  dispatch({
    type: TEAM_LOGIN_USER_ERROR,
    payload: { message },
  });
};

export const teamloginUser = (data, navigate, module) => async (dispatch) => {
  try {
    const loginData = {
      ...data,
      passwordConfirmation: data.password,
    };
    dispatch({ type: TEAM_LOGIN_USER });
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);

    const result = await axios
      .post(`${URL.teamlogin}`, loginData, axiosConfig)
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const item = result.data;
      setCurrentUser(item);
      localStorage.setItem("module", module);
      localStorage.setItem("layoutStyling", "default");
      // localStorage.setItem("colorschema", "dark_mode");
      localStorage.setItem("layoutThemeColors", "dark");
      // localStorage.setItem("layoutStyling", "modern");
      localStorage.setItem("time", new Date().toString());
      dispatch(teamloginUserSuccess(result));
      navigate("/team-dashboard");
      // history.push('/dashboard');
    } else {
      dispatch(teamloginUserError(result.statusText));
      openNotificationWithIcon("error", "Your Account is Inactive. Contact administrator");
    }
  } catch (error) {
    dispatch(teamloginUserError({}));
    // NotificationManager.error(
    //   "Server down! Please try again later.",
    //   "Error",
    //   3000
    // );
  }
};

// eslint-disable-next-line no-unused-vars
export const teamloginUserLogOut = (navigate) => async () => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const result = await axios
      .get(`${URL.teamlogOut}`, axiosConfig)
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      setCurrentUser();
      localStorage.removeItem("headerOption");
      navigate("/team");
    }
  } catch (error) {
    console.log("error");
  }
};
