export const CHANGE_CONNECTION_STATUS = 'CHANGE_CONNECTION_STATUS';
export const SHOW_WARNING_INFO = 'SHOW_WARNING_INFO';

export const changeConnectionStatus = status => ({
  type: CHANGE_CONNECTION_STATUS,
  status,
});

export const onWarningPress = () => ({
  type: SHOW_WARNING_INFO,
});
