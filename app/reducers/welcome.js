import {
  UPDATE_TEMP_LOGIN_USERNAME,
  UPDATE_TEMP_LOGIN_PASSWORD,
  UPDATE_TEMP_SINGUP_USERNAME,
  UPDATE_TEMP_SIGNUP_PASSWORD,
  UPDATE_TEMP_SIGNUP_NAME,
  UPDATE_TEMP_SIGNUP_PHONE_NUMBER,
  UPDATE_TEMP_SIGNUP_TFA_CODE,
} from '../actions/welcome';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEMP_LOGIN_USERNAME:
    case UPDATE_TEMP_LOGIN_PASSWORD:
    case UPDATE_TEMP_SINGUP_USERNAME:
    case UPDATE_TEMP_SIGNUP_PASSWORD:
    case UPDATE_TEMP_SIGNUP_NAME:
    case UPDATE_TEMP_SIGNUP_PHONE_NUMBER:
    case UPDATE_TEMP_SIGNUP_TFA_CODE:
    default:
      return state;
  }
};

export default reducer;
