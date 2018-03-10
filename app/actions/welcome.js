export const UPDATE_LOGIN_USERNAME = 'UPDATE_LOGIN_USERNAME';
export const UPDATE_LOGIN_PASSWORD = 'UPDATE_LOGIN_PASSWORD';
export const UPDATE_SIGNUP_NAME = 'UPDATE_SIGNUP_NAME';
export const UPDATE_SIGNUP_USERNAME = 'UPDATE_SIGNUP_USERNAME';
export const UPDATE_SIGNUP_PASSWORD = 'UPDATE_SIGNUP_PASSWORD';
export const UPDATE_SIGNUP_PASSWORD_RETYPE = 'UPDATE_SIGNUP_PASSWORD_RETYPE';
export const UPDATE_SIGNUP_EMAIL = 'UPDATE_SIGNUP_EMAIL';
export const UPDATE_SIGNUP_PHONE_NUMBER = 'UPDATE_SIGNUP_PHONE_NUMBER';
export const UPDATE_TFA_CODE = 'UPDATE_TFA_CODE';

export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN';
export const CONFIRM_LOGIN_SUCCESS = 'CONFIRM_LOGIN_SUCCESS';
export const CONFIRM_LOGIN_FAILURE = 'CONFIRM_LOGIN_FAILURE';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const CONFIRM_SIGNUP = 'CONFIRM_SIGNUP';
export const CONFIRM_SIGNUP_SUCCESS = 'CONFIRM_SIGNUP_SUCCESS';
export const CONFIRM_SIGNUP_FAILURE = 'CONFIRM_SIGNUP_FAILURE';

export const RESEND_SIGNUP = 'RESEND_SIGNUP';
export const RESEND_SIGNUP_SUCCESS = 'RESEND_SIGNUP_SUCCESS';
export const RESEND_SIGNUP_FAILURE = 'RESEND_SIGNUP_FAILURE';

export const updateLoginUsername = username => ({
  type: UPDATE_LOGIN_USERNAME,
  username,
});

export const updateLoginPassword = password => ({
  type: UPDATE_LOGIN_PASSWORD,
  password,
});

export const updateSignupName = name => ({
  type: UPDATE_SIGNUP_NAME,
  name,
});

export const updateSignupUsername = username => ({
  type: UPDATE_SIGNUP_USERNAME,
  username,
});

export const updateSignupEmail = email => ({
  type: UPDATE_SIGNUP_EMAIL,
  email,
});

export const updateSignupPassword = password => ({
  type: UPDATE_SIGNUP_PASSWORD,
  password,
});

export const updateSignupPasswordRetype = passwordRetype => ({
  type: UPDATE_SIGNUP_PASSWORD_RETYPE,
  passwordRetype,
});

export const updateSignupPhoneNumber = phone_number => ({
  type: UPDATE_SIGNUP_PHONE_NUMBER,
  phone_number,
});

export const updateTFACode = TFACode => ({
  type: UPDATE_TFA_CODE,
  TFACode,
});

export const resendSignUp = username => ({
  type: RESEND_SIGNUP,
  username,
});

export const logIn = payload => ({
  type: LOG_IN,
  payload,
});

export const signUp = payload => ({
  type: SIGN_UP,
  payload,
});

export const confirmSignup = payload => ({
  type: CONFIRM_SIGNUP,
  payload,
});

export const confirmLogin = payload => ({
  type: CONFIRM_LOGIN,
  payload,
});
