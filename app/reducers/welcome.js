import * as actions from '../actions/constants';

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
  user: {},
  TFACode: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_LOGIN_USERNAME:
      return {
        ...state,
        login: {
          ...state.login,
          username: action.username,
        },
      };
    case actions.UPDATE_LOGIN_PASSWORD:
      return {
        ...state,
        login: {
          ...state.login,
          password: action.password,
        },
      };
    case actions.UPDATE_SIGNUP_EMAIL:
      return {
        ...state,
        signup: {
          ...state.signup,
          email: action.email,
        },
      };
    case actions.UPDATE_SIGNUP_USERNAME:
      return {
        ...state,
        signup: {
          ...state.signup,
          username: action.username,
        },
      };
    case actions.UPDATE_SIGNUP_PASSWORD:
      return {
        ...state,
        signup: {
          ...state.signup,
          password: action.password,
        },
      };
    case actions.UPDATE_SIGNUP_PASSWORD_RETYPE:
      return {
        ...state,
        signup: {
          ...state.signup,
          passwordRetype: action.passwordRetype,
        },
      };
    case actions.UPDATE_SIGNUP_NAME:
      return {
        ...state,
        signup: {
          ...state.signup,
          name: action.name,
        },
      };
    case actions.UPDATE_SIGNUP_PHONE_NUMBER:
      return {
        ...state,
        signup: {
          ...state.signup,
          phone_number: action.phone_number,
        },
      };
    case actions.UPDATE_TFA_CODE:
      return {
        ...state,
        TFACode: action.TFACode,
      };
    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case actions.LOG_OUT_SUCCESS:
      return {
        ...state,
        user: {},
      };
    case actions.LOG_IN_FAILURE:
    case actions.LOG_IN:
    case actions.LOG_OUT:
    case actions.LOG_OUT_FAILURE:
    case actions.SIGN_UP:
    case actions.SIGN_UP_SUCCESS:
    case actions.SIGN_UP_FAILURE:
    case actions.CONFIRM_SIGNUP:
    case actions.CONFIRM_SIGNUP_SUCCESS:
    case actions.CONFIRM_SIGNUP_FAILURE:
    case actions.CONFIRM_LOGIN:
    case actions.CONFIRM_LOGIN_SUCCESS:
    case actions.CONFIRM_LOGIN_FAILURE:
    default:
      return state;
  }
};

export default reducer;
