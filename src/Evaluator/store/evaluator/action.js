/* eslint-disable indent */
import axios from "axios";

import {
  EVALUATOR_LOGIN_USER,
  EVALUATOR_LOGIN_USER_SUCCESS,
  EVALUATOR_LOGIN_USER_ERROR,
  GET_SUBMITTED_IDEA_LIST,
  GET_INSTRUCTIONS,
  GET_L1_EVALUATED_IDEA,
  EVALUATOR_ADMIN_LOGIN_USER,
  EVALUATOR_ADMIN_LOGIN_USER_SUCCESS,
  EVALUATOR_ADMIN_LOGIN_USER_ERROR,
  UPDATAE_EVALUATOR,
} from "../../../redux/actions.js";
import { URL, KEY } from "../../../constants/defaultValues.js";
import {
  setCurrentUser,
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../../helpers/Utils.js";
import { getCurrentUser } from "../../../helpers/Utils.js";
import { encryptGlobal } from "../../../constants/encryptDecrypt.js";

//------login---
export const evaluatorLoginUserSuccess = (user) => async (dispatch) => {
  dispatch({
    type: EVALUATOR_LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const evaluatorLoginUserError = (message) => async (dispatch) => {
  dispatch({
    type: EVALUATOR_LOGIN_USER_ERROR,
    payload: { message },
  });
};

export const evaluatorLoginUser =
  (data, navigate, module) => async (dispatch) => {
    try {
      const loginData = {
        ...data,
        passwordConfirmation: data.password,
      };
      dispatch({ type: EVALUATOR_LOGIN_USER });
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const result = await axios
        .post(`${URL.evaluatorLogin}`, loginData, axiosConfig)
        .then((user) => user)
        .catch((err) => {
          return err.response;
        });
      if (result && result.status === 200) {
        const item = result.data;
        setCurrentUser(item);
        localStorage.setItem("time", new Date().toString());

        localStorage.setItem("module", module);
        dispatch(evaluatorLoginUserSuccess(result));

        navigate("/evaluator/instructions");
      } else if (result && result.status === 404) {
        openNotificationWithIcon("error", "Entered Invalid Username or Password");
       
        dispatch(evaluatorLoginUserError(result.statusText));
      }else{
        openNotificationWithIcon(
          'error',
         "Entered Evaluator Credentials are in InActive Status"
        );
      }
      
    }catch (error) {
      openNotificationWithIcon(
        'error',
       "Entered Evaluator Credentials are in InActive Status"
    );
      dispatch(evaluatorLoginUserError({}));
    }
  };

//Evaluator Admin login
export const evaluatorAdminLoginUserSuccess = (user) => async (dispatch) => {
  dispatch({
    type: EVALUATOR_ADMIN_LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const evaluatorAdminLoginUserError = (message) => async (dispatch) => {
  dispatch({
    type: EVALUATOR_ADMIN_LOGIN_USER_ERROR,
    payload: { message },
  });
};
export const evaluatorAdminLoginUser =
  (data, navigate, module) => async (dispatch) => {
    try {
      const loginData = {
        ...data,
        passwordConfirmation: data.password,
      };
      const ead = encryptGlobal(
        JSON.stringify({
          eAdmin: "true",
        })
      );
      dispatch({ type: EVALUATOR_ADMIN_LOGIN_USER });
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const result = await axios
        .post(`${URL.eadminLogin}Data=${ead}`, loginData, axiosConfig)
        .then((user) => user)
        .catch((err) => {
          return err.response;
        });
      if (result && result.status === 200) {
        const item = result.data;
        setCurrentUser(item);
        localStorage.setItem("module", module);
        localStorage.setItem("time", new Date().toString());
        // localStorage.setItem("layoutStyling", "modern");
        localStorage.setItem("layoutStyling", "default");
        dispatch(evaluatorAdminLoginUserSuccess(result));

        navigate("/eadmin/evaluationStatus");
      } else if (result && result.status === 404) {
        openNotificationWithIcon("error", "Entered Invalid Username or Password");
       
        dispatch(evaluatorAdminLoginUserError(result.statusText));
      }else{
        openNotificationWithIcon(
          'error',
         "Entered Eadmin Credentials are in InActive Status"
        );
      }
    } catch (error) {
      openNotificationWithIcon(
        'error',
       "Entered Eadmin Credentials are in InActive Status"
    );
      dispatch(evaluatorAdminLoginUserError({}));
    }
  };

//---get submitted idea list--
export const getSubmittedIdeaListSuccess = (data) => async (dispatch) => {
  dispatch({
    type: GET_SUBMITTED_IDEA_LIST,
    payload: data,
  });
};
export const getSubmittedIdeaList = (level) => async (dispatch) => {
  const currentUser = getCurrentUser("current_user");
  // const level = currentUser?.data[0]?.level_name;
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const ApiParam = encryptGlobal(
      JSON.stringify({
        evaluator_user_id: currentUser?.data[0]?.user_id,
        level: level,
      })
    );
    const result = await axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL +
          `/challenge_response/fetchRandomChallenge?Data=${ApiParam}`
        }`,
        axiosConfig
      )
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result?.data?.data[0];
      dispatch(getSubmittedIdeaListSuccess(data));
    } else {
      dispatch(getSubmittedIdeaListSuccess(null));
    }
  } catch (error) {
    dispatch(getSubmittedIdeaListSuccess(null));
  }
};

//---get instructions list--
export const getInstructionsSuccess = (data) => async (dispatch) => {
  dispatch({
    type: GET_INSTRUCTIONS,
    payload: data,
  });
};
export const getInstructions = () => async (dispatch) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const Num = encryptGlobal("1");
    const result = await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL + `/instructions/${Num}`}`,
        axiosConfig
      )
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result?.data?.data[0];
      dispatch(getInstructionsSuccess(data));
    } else {
      dispatch(getInstructionsSuccess(null));
    }
  } catch (error) {
    dispatch(getInstructionsSuccess(null));
  }
};

//---get evaluated idea of L1 round--
export const getL1EvaluatedIdeaSuccess = (data) => async (dispatch) => {
  dispatch({
    type: GET_L1_EVALUATED_IDEA,
    payload: data,
  });
};
export const getL1EvaluatedIdea = (params, setshowspin) => async (dispatch) => {
  const currentUser = getCurrentUser("current_user");
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const evId = encryptGlobal(JSON.stringify(currentUser?.data[0]?.user_id));
    const idRes = encryptGlobal(JSON.stringify(params));
    const result = await axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL_FOR_REPORTS  +
          "/challenge_response/evaluated/" +
          evId +
          "?Data=" +
          idRes
        }`,
        axiosConfig
      )
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result?.data?.data;
      dispatch(getL1EvaluatedIdeaSuccess(data));
      setshowspin(false);
    } else {
      dispatch(getL1EvaluatedIdeaSuccess(null));
      setshowspin(false);
    }
  } catch (error) {
    dispatch(getL1EvaluatedIdeaSuccess(null));
    setshowspin(false);
  }
};

//---update evaluator list--
export const updateEvaluatorSuccess = (data) => async (dispatch) => {
  dispatch({
    type: UPDATAE_EVALUATOR,
    payload: data,
  });
};
export const updateEvaluator = (params, id) => async (dispatch) => {
  try {
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const idParam = encryptGlobal(JSON.stringify(id));
    const result = await axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL + "/evaluators/" + idParam}`,
        params,
        axiosConfig
      )
      .then((data) => data)
      .catch((err) => {
        return err.response;
      });
    if (result && result.status === 200) {
      const data = result?.data?.data[0];
      dispatch(updateEvaluatorSuccess(data));
    } else {
      dispatch(updateEvaluatorSuccess(null));
    }
  } catch (error) {
    dispatch(updateEvaluatorSuccess(null));
  }
};
