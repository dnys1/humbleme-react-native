import { LOG_IN_SUCCESS, SIGN_UP_SUCCESS } from '../actions/welcome';
import { LOG_OUT_SUCCESS } from '../actions/app';

const initialState = {
  user: {},
  userConfirmed: false,
  userSub: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        userConfirmed: action.payload.userConfirmed,
        userSub: action.payload.userSub,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
