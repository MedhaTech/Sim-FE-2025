/* eslint-disable indent */
// Foulders Reducers //
import { GET_STATES, GET_FETCHDIST } from "../actions";

const INIT_STATE = {
  regstate: [],
  fetchdist: [],
};

export default (state = INIT_STATE, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_STATES:
      return {
        ...state,
        regstate: action.payload,
      };
    case GET_FETCHDIST:
      return {
        ...state,
        fetchdist: action.payload,
      };

    default:
      return newState;
  }
};
