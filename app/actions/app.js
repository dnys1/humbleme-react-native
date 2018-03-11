export const APPLICATION_LOADED = 'APPLICATION_LOADED';

export const DISMISS_KEYBOARD = 'DISMISS_KEYBOARD';
export const CLEAR_TEMPORARY_DATA = 'CLEAR_TEMPORARY_DATA';

export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SHOW_WARNING = 'SHOW_WARNING';
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_WARNING = 'CLEAR_WARNING';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const logOut = () => ({
  type: LOG_OUT,
});

export const applicationLoaded = () => ({
  type: APPLICATION_LOADED,
});
