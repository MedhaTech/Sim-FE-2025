/* eslint-disable indent */
import axios from "axios";

import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "../actions";
import { URL, KEY } from "../../constants/defaultValues";
import {
  setCurrentUser,
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../helpers/Utils";

export const loginUserSuccess = (user) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const loginUserError = (message) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER_ERROR,
    payload: { message },
  });
};

export const loginUser = (data, navigate, module) => async (dispatch) => {
  try {
    const loginData = {
      ...data,
      passwordConfirmation: data.password,
    };
    dispatch({ type: LOGIN_USER });
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);

    const result = await axios
      .post(`${URL.login}`, loginData, axiosConfig)
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const item = result.data;
      setCurrentUser(item);
      localStorage.setItem("module", module);
      localStorage.setItem("layoutStyling", "default");
      localStorage.setItem("time", new Date().toString());
      dispatch(loginUserSuccess(result));
      navigate("/student-dashboard");
    } else {
      dispatch(loginUserError(result.statusText));
      openNotificationWithIcon("error", "Invalid Username or Password");
    }
  } catch (error) {
    dispatch(loginUserError({}));
    
  }
};

export const loginUserLogOut = (navigate) => async () => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const result = await axios
      .get(`${URL.logOut}`, axiosConfig)
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      setCurrentUser();
      localStorage.removeItem("headerOption");
      navigate("/team-dashboard");
    }
  } catch (error) {
    console.log("error");
  }
};
