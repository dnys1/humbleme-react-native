export const NAV_LOGIN_CONFIRMATION_MODAL = 'NAV_LOGIN_CONFIRMATION_MODAL';
export const NAV_SIGNUP_CONFIRMATION_MODAL = 'NAV_SIGNUP_CONFIRMATION_MODAL';
export const NAV_RESET_WELCOME = 'NAV_RESET_WELCOME';
export const NAV_LOGIN_SCREEN = 'NAV_LOGIN_SCREEN';
export const NAV_SIGNUP_SCREEN = 'NAV_SIGNUP_SCREEN';
export const NAV_NAME_SCREEN = 'NAV_NAME_SCREEN';
export const NAV_LOGGED_IN_SCREEN = 'NAV_LOGGED_IN_SCREEN';

export const NAV_REMOVE_WARNING_ICON = 'NAV_REMOVE_WARNING_ICON';
export const NAV_SHOW_WARNING_ICON = 'NAV_SHOW_WARNING_ICON';

export const navLoggedInScreen = () => ({
  type: NAV_LOGGED_IN_SCREEN,
});

export const navLoginScreen = () => ({
  type: NAV_LOGIN_SCREEN,
});

export const navSignupScreen = () => ({
  type: NAV_SIGNUP_SCREEN,
});
