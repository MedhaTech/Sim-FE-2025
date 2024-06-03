/* eslint-disable indent */
/* eslint-disable no-empty */
import axios from "axios";

import {
  ADMIN_LOGIN_USER,
  ADMIN_LOGIN_USER_SUCCESS,
  ADMIN_LOGIN_USER_ERROR,
 
} from "../../../redux/actions.js";
import { URL, KEY } from "../../../constants/defaultValues.js";

import { setCurrentUser, getNormalHeaders } from "../../../helpers/Utils.js";
export const getAdminSuccess = (user) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const getAdminError = (message) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOGIN_USER_ERROR,
    payload: { message },
  });
};

export const adminLoginUserSuccess = (user) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const adminLoginUserError = (message) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOGIN_USER_ERROR,
    payload: { message },
  });
};

export const adminLoginUser = (data, navigate, module) => async (dispatch) => {
  try {
    const loginData = {
      ...data,
      passwordConfirmation: data.password,
    };
    // console.log(loginData, "aaa");
    dispatch({ type: ADMIN_LOGIN_USER });
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const result = await axios
      .post(`${URL.adminLogin}`, loginData, axiosConfig)
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const item = result.data;
      setCurrentUser(item);
      localStorage.setItem("module", module);
      localStorage.setItem("time", new Date().toString());
      dispatch(adminLoginUserSuccess(result));

      navigate("/admin/dashboard");
    } else {
      // openNotificationWithIcon("error", "Invalid Username or Password");
      dispatch(adminLoginUserError(result.statusText));
    }
  } catch (error) {
    dispatch(adminLoginUserError({}));
  }
};

export const adminLoginUserLogOut = (navigate) => async () => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const result = await axios

      .get(`${URL.adminLogOut}`, axiosConfig)
      .then((user) => user)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      navigate("/admin");
      setCurrentUser();
      localStorage.removeItem("headerOption");
    }
  } catch (error) {
    console.log(error);
  }
};
export const userLogout = () => async (dispatch) => {
  dispatch({
    type: "USER_LOGOUT",
  });
};

