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
  LOGIN_USER_SUCCESS,
  CONFIRM_USER_SUCCESS,
} from '../actions/welcome';

const initialState = {
  tempLogin: {
    username: '',
    password: '',
  },
  tempSignup: {
    name: '',
    username: '',
    email: '',
    password: '',
    passwordRetype: '',
    phone_number: '',
    TFACode: '',
  },
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEMP_LOGIN_USERNAME:
      return {
        ...state,
        tempLogin: {
          ...state.tempLogin,
          username: action.username,
        },
      };
    case UPDATE_TEMP_LOGIN_PASSWORD:
      return {
        ...state,
        tempLogin: {
          ...state.tempLogin,
          password: action.password,
        },
      };
    case UPDATE_TEMP_SIGNUP_EMAIL:
      return {
        ...state,
        tempSignup: {
          ...state.tempSignup,
          email: action.email,
        },
      };
    case UPDATE_TEMP_SIGNUP_USERNAME:
      return {
        ...state,
        tempSignup: {
          ...state.tempSignup,
          username: action.username,
        },
      };
    case UPDATE_TEMP_SIGNUP_PASSWORD:
      return {
        ...state,
        tempSignup: {
          ...state.tempSignup,
          password: action.password,
        },
      };
    case UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE:
      return {
        ...state,
        tempSignup: {
          ...state.tempSignup,
          passwordRetype: action.passwordRetype,
        },
      };
    case UPDATE_TEMP_SIGNUP_NAME:
      return {
        ...state,
        tempSignup: {
          ...state.tempSignup,
          name: action.name,
        },
      };
    case UPDATE_TEMP_SIGNUP_PHONE_NUMBER:
      return {
        ...state,
        tempSignup: {
          ...state.tempSignup,
          phone_number: action.phone_number,
        },
      };
    case UPDATE_TEMP_SIGNUP_TFA_CODE:
      return {
        ...state,
        tempSignup: {
          ...state.tempSignup,
          TFACode: action.TFACode,
        },
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case CONFIRM_USER_SUCCESS:
    default:
      return state;
  }
};

export default reducer;
