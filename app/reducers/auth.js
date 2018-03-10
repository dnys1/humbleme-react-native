import { LOG_IN_SUCCESS, LOG_OUT_SUCCESS } from '../actions/welcome';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return action.user;
    case LOG_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
