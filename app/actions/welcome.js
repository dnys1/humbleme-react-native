import * as actions from './constants';

export const updateLoginUserName = username => ({
  type: actions.UPDATE_LOGIN_USERNAME,
  username,
});

export const updateLoginPassword = password => ({
  type: actions.UPDATE_LOGIN_PASSWORD,
  password,
});

export const updateSignupName = name => ({
  type: actions.UPDATE_SIGNUP_NAME,
  name,
});

export const updateSignupUserName = username => ({
  type: actions.UPDATE_SIGNUP_USERNAME,
  username,
});

export const updateSignupEmail = email => ({
  type: actions.UPDATE_SIGNUP_EMAIL,
  email,
});

export const updateSignupPassword = password => ({
  type: actions.UPDATE_SIGNUP_PASSWORD,
  password,
});

export const updateSignupPasswordRetype = passwordRetype => ({
  type: actions.UPDATE_SIGNUP_PASSWORD_RETYPE,
  passwordRetype,
});

export const updateSignupPhoneNumber = phone_number => ({
  type: actions.UPDATE_SIGNUP_PHONE_NUMBER,
  phone_number,
});

export const updateTFACode = TFACode => ({
  type: actions.UPDATE_TFA_CODE,
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
