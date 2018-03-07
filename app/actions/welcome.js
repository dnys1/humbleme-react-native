export const UPDATE_TEMP_LOGIN_USERNAME = 'UPDATE_TEMP_LOGIN_USERNAME';
export const UPDATE_TEMP_LOGIN_PASSWORD = 'UPDATE_TEMP_LOGIN_PASSWORD';
export const UPDATE_TEMP_SINGUP_USERNAME = 'UPDATE_TEMP_SINGUP_USERNAME';
export const UPDATE_TEMP_SIGNUP_PASSWORD = 'UPDATE_TEMP_SIGNUP_PASSWORD';
export const UPDATE_TEMP_SIGNUP_NAME = 'UPDATE_TEMP_SIGNUP_NAME';
export const UPDATE_TEMP_SIGNUP_PHONE_NUMBER = 'UPDATE_TEMP_SIGNUP_PHONE_NUMBER';
export const UPDATE_TEMP_SIGNUP_TFA_CODE = 'UPDATE_TEMP_SIGNUP_TFA_CODE';

export const updateTempLoginUserName = tempLoginUserName => ({
  type: UPDATE_TEMP_LOGIN_USERNAME,
  tempLoginUserName,
});

export const updateTempLoginPassword = tempLoginPassword => ({
  type: UPDATE_TEMP_LOGIN_PASSWORD,
  tempLoginPassword,
});

export const updateTempSignupName = tempSignupName => ({
  type: UPDATE_TEMP_SIGNUP_NAME,
  tempSignupName,
});

export const updateTempSignupUserName = tempSignupUserName => ({
  type: UPDATE_TEMP_SINGUP_USERNAME,
  tempSignupUserName,
});

export const updateTempSignupPassword = tempSignupPassword => ({
  type: UPDATE_TEMP_SIGNUP_PASSWORD,
  tempSignupPassword,
});

export const updateTempSignupPhoneNumber = tempSignupPhoneNumber => ({
  type: UPDATE_TEMP_SIGNUP_PHONE_NUMBER,
  tempSignupPhoneNumber,
});

export const updateTempTFACode = tempSignupTFACode => ({
  type: UPDATE_TEMP_SIGNUP_TFA_CODE,
  tempSignupTFACode,
});
