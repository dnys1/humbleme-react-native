import {
  SHOW_WARNING,
  CLEAR_WARNING,
  SHOW_ERROR,
  CLEAR_ERROR,
  CLEAR_TEMPORARY_DATA,
  SET_PROFILE,
} from '../actions/app';

const initialState = {
  error: {},
};

const errorCodes = ['app'];

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SHOW_ERROR:
      nextState = errorCodes.includes(action.payload.type) && {
        ...state,
        error: {
          type: action.payload.type,
          alertStyle: 'error',
          title: action.payload.title,
          msg: action.payload.msg,
        },
      };
      break;
    case SHOW_WARNING:
      nextState = errorCodes.includes(action.payload.type) && {
        ...state,
        error: {
          alertStyle: 'warn',
          title: action.payload.title,
          msg: action.payload.msg,
        },
      };
      break;
    case CLEAR_WARNING:
    case CLEAR_ERROR:
      nextState = errorCodes.includes(action.payload.type) && {
        ...state,
        error: {},
      };
      break;
    case CLEAR_TEMPORARY_DATA:
      nextState = initialState;
      break;
    default:
      nextState = state;
      break;
  }
  return nextState || state;
};
