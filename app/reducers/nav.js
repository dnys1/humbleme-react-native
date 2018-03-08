import { NavigationActions } from 'react-navigation';
import { WelcomeStack } from '../config/routes';

import {
  SHOW_LOGIN_CONFIRMATION_MODAL,
  SHOW_SIGNUP_CONFIRMATION_MODAL,
  SHOW_LOGIN_SCREEN,
  SHOW_LOGGED_IN_SCREEN,
  LOG_OUT_SUCCESS,
} from '../actions/welcome';

const initialState = WelcomeStack.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case SHOW_LOGIN_CONFIRMATION_MODAL:
      nextState = WelcomeStack.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'TFA',
          params: {
            signup: false,
            resend: action.resend,
          },
        }),
        state,
      );
      break;
    case SHOW_SIGNUP_CONFIRMATION_MODAL:
      nextState = WelcomeStack.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'TFA',
          params: {
            signup: true,
            resend: action.resend,
          },
        }),
        state,
      );
      break;
    case SHOW_LOGIN_SCREEN:
      nextState = WelcomeStack.router.getStateForAction(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Welcome' }),
            NavigationActions.navigate({ routeName: 'Login' }),
          ],
        }),
        state,
      );
      break;
    case SHOW_LOGGED_IN_SCREEN:
      nextState = WelcomeStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoggedIn' }),
        state,
      );
      break;
    case LOG_OUT_SUCCESS:
      nextState = WelcomeStack.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        }),
        state,
      );
      break;
    default:
      nextState = WelcomeStack.router.getStateForAction(action, state);
  }
  return nextState || state;
};
