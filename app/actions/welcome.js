const UPDATE_TEMP_AUTH_CODE = 'UPDATE_TEMP_AUTH_CODE';
const UPDATE_TEMP_USERNAME = 'UPDATE_TEMP_USERNAME';
const UPDATE_TEMP_PASSWORD = 'UPDATE_TEMP_PASSWORD';
const UPDATE_TEMP_FIRST_NAME = 'UPDATE_TEMP_FIRST_NAME';
const UPDATE_TEMP_LAST_NAME = 'UPDATE_TEMP_LAST_NAME';

export const updateTempFirstName = firstName => ({
  type: UPDATE_TEMP_FIRST_NAME,
  firstName,
});

export const updateTempLastName = lastName => ({
  type: UPDATE_TEMP_LAST_NAME,
  lastName,
});

export const updateTempUserName = userName => ({
  type: UPDATE_TEMP_USERNAME,
  userName,
});

export const updateTempPassword = password => ({
  type: UPDATE_TEMP_PASSWORD,
  password,
});

export const updateTempAuthCode = authCode => ({
  type: UPDATE_TEMP_AUTH_CODE,
  authCode,
});
