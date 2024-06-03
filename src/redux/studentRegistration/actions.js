/* eslint-disable indent */
import axios from "axios";

import { GET_STATES, GET_FETCHDIST } from "../actions";
import { URL, KEY } from "../../constants/defaultValues";
import { getNormalHeaders } from "../../helpers/Utils";
import { encryptGlobal } from "../../constants/encryptDecrypt";

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
