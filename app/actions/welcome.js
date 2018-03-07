const UPDATE_TEMP_TFA_CODE = 'UPDATE_TEMP_TFA_CODE';
const UPDATE_TEMP_USERNAME = 'UPDATE_TEMP_USERNAME';
const UPDATE_TEMP_PASSWORD = 'UPDATE_TEMP_PASSWORD';
const UPDATE_TEMP_NAME = 'UPDATE_TEMP_NAME';
const UPDATE_TEMP_PHONE_NUMBER = 'UPDATE_TEMP_PHONE_NUMBER';

export const updateTempName = name => ({
  type: UPDATE_TEMP_NAME,
  name,
});

export const updateTempUserName = userName => ({
  type: UPDATE_TEMP_USERNAME,
  userName,
});

export const updateTempPassword = password => ({
  type: UPDATE_TEMP_PASSWORD,
  password,
});

export const updateTempPhoneNumber = phoneNumber => ({
  type: UPDATE_TEMP_PHONE_NUMBER,
  phoneNumber,
});

export const updateTempTFACode = TFACode => ({
  type: UPDATE_TEMP_TFA_CODE,
  TFACode,
});
