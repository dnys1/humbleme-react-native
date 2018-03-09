import * as actions from './constants';

export const updateTempLoginUserName = username => ({
  type: actions.UPDATE_TEMP_LOGIN_USERNAME,
  username,
});

export const updateTempLoginPassword = password => ({
  type: actions.UPDATE_TEMP_LOGIN_PASSWORD,
  password,
});

export const updateTempSignupName = name => ({
  type: actions.UPDATE_TEMP_SIGNUP_NAME,
  name,
});

export const updateTempSignupUserName = username => ({
  type: actions.UPDATE_TEMP_SIGNUP_USERNAME,
  username,
});

export const updateTempSignupEmail = email => ({
  type: actions.UPDATE_TEMP_SIGNUP_EMAIL,
  email,
});

export const updateTempSignupPassword = password => ({
  type: actions.UPDATE_TEMP_SIGNUP_PASSWORD,
  password,
});

export const updateTempSignupPasswordRetype = passwordRetype => ({
  type: actions.UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE,
  passwordRetype,
});

export const updateTempSignupPhoneNumber = phone_number => ({
  type: actions.UPDATE_TEMP_SIGNUP_PHONE_NUMBER,
  phone_number,
});

export const updateTempTFACode = TFACode => ({
  type: actions.UPDATE_TEMP_SIGNUP_TFA_CODE,
  TFACode,
});

export const resendSignUp = username => ({
  type: actions.RESEND_SIGNUP,
  username,
});

export const logIn = (username, password) => ({
  type: actions.LOG_IN,
  username,
  password,
});

export const logOut = () => ({
  type: actions.LOG_OUT,
});

export const signUp = (username, password, email, phone_number) => ({
  type: actions.SIGN_UP,
  username,
  password,
  email,
  phone_number,
});

export const confirmSignup = (username, password, TFACode, resend) => ({
  type: actions.CONFIRM_SIGNUP,
  username,
  password,
  TFACode,
  resend,
});

export const confirmLogin = (user, TFACode) => ({
  type: actions.CONFIRM_LOGIN,
  user,
  TFACode,
});
