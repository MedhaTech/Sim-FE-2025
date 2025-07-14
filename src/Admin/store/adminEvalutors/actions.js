/* eslint-disable no-unused-vars */
import axios from 'axios';

import {
    ADMIN_EVALUTORS_LIST,
    ADMIN_EVALUTORS_LIST_SUCCESS,
    ADMIN_EVALUTORS_LIST_ERROR
} from '../../../redux/actions.js';
import { URL, KEY } from '../../../constants/defaultValues.js';
import { getNormalHeaders } from '../../../helpers/Utils.js';
import { encryptGlobal } from '../../../constants/encryptDecrypt.js';

export const getAdminEvalutorsListSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_EVALUTORS_LIST_SUCCESS,
        payload: user
    });
};

export const getAdminEvalutorsListError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_EVALUTORS_LIST_ERROR,
        payload: { message }
    });
};

export const getAdminEvalutorsList = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_EVALUTORS_LIST });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const adstatus = encryptGlobal(
            JSON.stringify({
                status: 'ALL'
            })
        );
        const result = await axios .get(`${URL.getAdminEvaluator + `?Data=${adstatus}`}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {

            const data = result.data?.data|| [];
            let datamodify = data.length > 0 ? data.forEach((item, i) => (item.id = i + 1)) : [];
            // console.log(result,"res",datamodify,"data");
            dispatch(getAdminEvalutorsListSuccess(data));
        } else {
            dispatch(getAdminEvalutorsListError(result.statusText));
        }
    } catch (error) {
        dispatch(getAdminEvalutorsListError({}));
    }
};
