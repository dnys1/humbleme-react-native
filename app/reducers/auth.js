import { LOG_IN_SUCCESS } from '../actions/welcome';
import { LOG_OUT_SUCCESS } from '../actions/app';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case LOG_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
