import {
  UPDATE_TEMP_LOGIN_USERNAME,
  UPDATE_TEMP_LOGIN_PASSWORD,
  UPDATE_TEMP_SIGNUP_EMAIL,
  UPDATE_TEMP_SIGNUP_USERNAME,
  UPDATE_TEMP_SIGNUP_PASSWORD,
  UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE,
  UPDATE_TEMP_SIGNUP_NAME,
  UPDATE_TEMP_SIGNUP_PHONE_NUMBER,
  UPDATE_TEMP_SIGNUP_TFA_CODE,
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CONFIRM_SIGNUP,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE,
  CONFIRM_LOGIN,
  CONFIRM_LOGIN_SUCCESS,
  CONFIRM_LOGIN_FAILURE,
} from '../actions/welcome';

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
  TFACode: '',
};

const initialState = {
  login: initialLogin,
  signup: initialSignup,
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEMP_LOGIN_USERNAME:
      return {
        ...state,
        login: {
          ...state.login,
          username: action.username,
        },
      };
    case UPDATE_TEMP_LOGIN_PASSWORD:
      return {
        ...state,
        login: {
          ...state.login,
          password: action.password,
        },
      };
    case UPDATE_TEMP_SIGNUP_EMAIL:
      return {
        ...state,
        signup: {
          ...state.signup,
          email: action.email,
        },
      };
    case UPDATE_TEMP_SIGNUP_USERNAME:
      return {
        ...state,
        signup: {
          ...state.signup,
          username: action.username,
        },
      };
    case UPDATE_TEMP_SIGNUP_PASSWORD:
      return {
        ...state,
        signup: {
          ...state.signup,
          password: action.password,
        },
      };
    case UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE:
      return {
        ...state,
        signup: {
          ...state.signup,
          passwordRetype: action.passwordRetype,
        },
      };
    case UPDATE_TEMP_SIGNUP_NAME:
      return {
        ...state,
        signup: {
          ...state.signup,
          name: action.name,
        },
      };
    case UPDATE_TEMP_SIGNUP_PHONE_NUMBER:
      return {
        ...state,
        signup: {
          ...state.signup,
          phone_number: action.phone_number,
        },
      };
    case UPDATE_TEMP_SIGNUP_TFA_CODE:
      return {
        ...state,
        signup: {
          ...state.signup,
          TFACode: action.TFACode,
        },
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        user: {},
      };
    case LOG_IN_FAILURE:
    case LOG_IN:
    case LOG_OUT:
    case LOG_OUT_FAILURE:
    case SIGN_UP:
    case SIGN_UP_SUCCESS:
    case SIGN_UP_FAILURE:
    case CONFIRM_SIGNUP:
    case CONFIRM_SIGNUP_SUCCESS:
    case CONFIRM_SIGNUP_FAILURE:
    case CONFIRM_LOGIN:
    case CONFIRM_LOGIN_SUCCESS:
    case CONFIRM_LOGIN_FAILURE:
    default:
      return state;
  }
};

export default reducer;
