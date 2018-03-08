export const UPDATE_TEMP_LOGIN_USERNAME = 'UPDATE_TEMP_LOGIN_USERNAME';
export const UPDATE_TEMP_LOGIN_PASSWORD = 'UPDATE_TEMP_LOGIN_PASSWORD';
export const UPDATE_TEMP_SIGNUP_NAME = 'UPDATE_TEMP_SIGNUP_NAME';
export const UPDATE_TEMP_SIGNUP_USERNAME = 'UPDATE_TEMP_SIGNUP_USERNAME';
export const UPDATE_TEMP_SIGNUP_PASSWORD = 'UPDATE_TEMP_SIGNUP_PASSWORD';
export const UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE = 'UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE';
export const UPDATE_TEMP_SIGNUP_EMAIL = 'UPDATE_TEMP_SIGNUP_EMAIL';
export const UPDATE_TEMP_SIGNUP_PHONE_NUMBER = 'UPDATE_TEMP_SIGNUP_PHONE_NUMBER';
export const UPDATE_TEMP_SIGNUP_TFA_CODE = 'UPDATE_TEMP_SIGNUP_TFA_CODE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const CONFIRM_USER_SUCCESS = 'CONFIRM_USER_SUCCESS';

export const updateTempLoginUserName = username => ({
  type: UPDATE_TEMP_LOGIN_USERNAME,
  username,
});

export const updateTempLoginPassword = password => ({
  type: UPDATE_TEMP_LOGIN_PASSWORD,
  password,
});

export const updateTempSignupName = name => ({
  type: UPDATE_TEMP_SIGNUP_NAME,
  name,
});

export const updateTempSignupUserName = username => ({
  type: UPDATE_TEMP_SIGNUP_USERNAME,
  username,
});

export const updateTempSignupEmail = email => ({
  type: UPDATE_TEMP_SIGNUP_EMAIL,
  email,
});

export const updateTempSignupPassword = password => ({
  type: UPDATE_TEMP_SIGNUP_PASSWORD,
  password,
});

export const updateTempSignupPasswordRetype = passwordRetype => ({
  type: UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE,
  passwordRetype,
});

export const updateTempSignupPhoneNumber = phone_number => ({
  type: UPDATE_TEMP_SIGNUP_PHONE_NUMBER,
  phone_number,
});

export const updateTempTFACode = TFACode => ({
  type: UPDATE_TEMP_SIGNUP_TFA_CODE,
  TFACode,
});

export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  user,
});

export const confirmUserSuccess = () => ({
  type: CONFIRM_USER_SUCCESS,
});
