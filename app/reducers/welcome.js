import {
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  UPDATE_SIGNUP_EMAIL,
  UPDATE_SIGNUP_USERNAME,
  UPDATE_SIGNUP_PASSWORD,
  UPDATE_SIGNUP_PASSWORD_RETYPE,
  UPDATE_SIGNUP_NAME,
  UPDATE_SIGNUP_PHONE_NUMBER,
  UPDATE_TFA_CODE,
  LOG_IN_FAILURE,
  LOG_IN,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CONFIRM_SIGNUP,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE,
  CONFIRM_LOGIN,
  CONFIRM_LOGIN_SUCCESS,
  CONFIRM_LOGIN_FAILURE,
  CLEAR_LOGIN_DATA,
  CLEAR_SIGNUP_DATA,
} from '../actions/welcome';

import {
  SHOW_ERROR,
  SHOW_WARNING,
  CLEAR_WARNING,
  CLEAR_ERROR,
  CLEAR_TEMPORARY_DATA,
} from '../actions/app';

const initialLogin = {
  username: '',
  password: '',
};

const initialSignup = {
  name: '',
  username: '',
  email: '',
  password: '',
  passwordRetype: '',
  phone_number: '',
};

const initialState = {
  login: initialLogin,
  signup: initialSignup,
  TFACode: '',
  error: {},
};

const errorCodes = ['login', 'signup', 'confirm'];

const reducer = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case UPDATE_LOGIN_USERNAME:
      nextState = {
        ...state,
        login: {
          ...state.login,
          username: action.username,
        },
      };
      break;
    case UPDATE_LOGIN_PASSWORD:
      nextState = {
        ...state,
        login: {
          ...state.login,
          password: action.password,
        },
      };
      break;
    case UPDATE_SIGNUP_EMAIL:
      nextState = {
        ...state,
        signup: {
          ...state.signup,
          email: action.email,
        },
      };
      break;
    case UPDATE_SIGNUP_USERNAME:
      nextState = {
        ...state,
        signup: {
          ...state.signup,
          username: action.username,
        },
      };
      break;
    case UPDATE_SIGNUP_PASSWORD:
      nextState = {
        ...state,
        signup: {
          ...state.signup,
          password: action.password,
        },
      };
      break;
    case UPDATE_SIGNUP_PASSWORD_RETYPE:
      nextState = {
        ...state,
        signup: {
          ...state.signup,
          passwordRetype: action.passwordRetype,
        },
      };
      break;
    case UPDATE_SIGNUP_NAME:
      nextState = {
        ...state,
        signup: {
          ...state.signup,
          name: action.name,
        },
      };
      break;
    case UPDATE_SIGNUP_PHONE_NUMBER:
      nextState = {
        ...state,
        signup: {
          ...state.signup,
          phone_number: action.phone_number,
        },
      };
      break;
    case UPDATE_TFA_CODE:
      nextState = {
        ...state,
        TFACode: action.TFACode,
      };
      break;
    case SHOW_ERROR:
      nextState = errorCodes.includes(action.payload.type)
        ? {
          ...state,
          error: {
            ...state.error,
            [action.payload.type]: {
              alertStyle: 'error',
              title: action.payload.title,
              msg: action.payload.msg,
            },
          },
        }
        : state;
      break;
    case SHOW_WARNING:
      nextState = errorCodes.includes(action.payload.type)
        ? {
          ...state,
          error: {
            ...state.error,
            [action.payload.type]: {
              alertStyle: 'warn',
              title: action.payload.title,
              msg: action.payload.msg,
            },
          },
        }
        : state;
      break;
    case CLEAR_WARNING:
    case CLEAR_ERROR:
      nextState = errorCodes.includes(action.payload.type)
        ? {
          ...state,
          error: {
            ...state.error,
            [action.payload.type]: {},
          },
        }
        : state;
      break;
    case LOG_IN_FAILURE:
    case SIGN_UP_FAILURE:
    case CONFIRM_SIGNUP_FAILURE:
    case CONFIRM_LOGIN_FAILURE:
      nextState = {
        ...state,
        error: {
          auth: action.err,
        },
      };
      break;
    case CLEAR_TEMPORARY_DATA:
      nextState = initialState;
      break;
    case CLEAR_LOGIN_DATA:
      nextState = {
        ...state,
        login: initialLogin,
        TFACode: '',
      };
      break;
    case CLEAR_SIGNUP_DATA:
      nextState = {
        ...state,
        signup: initialSignup,
        TFACode: '',
      };
      break;
    case LOG_IN:
    case SIGN_UP:
    case SIGN_UP_SUCCESS:
    case CONFIRM_SIGNUP:
    case CONFIRM_SIGNUP_SUCCESS:
    case CONFIRM_LOGIN:
    case CONFIRM_LOGIN_SUCCESS:
    default:
      nextState = state;
  }
  return nextState || state;
};

export default reducer;
