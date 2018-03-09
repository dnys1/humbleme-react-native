import { NavigationActions } from 'react-navigation';
import { WelcomeStack } from '../config/routes';

import * as actions from '../actions/constants';

const initialState = WelcomeStack.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case actions.NAV_LOGIN_CONFIRMATION_MODAL:
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
    case actions.NAV_SIGNUP_CONFIRMATION_MODAL:
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
    case actions.NAV_LOGIN_SCREEN:
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
    case actions.NAV_LOGGED_IN_SCREEN:
      nextState = WelcomeStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoggedIn' }),
        state,
      );
      break;
    case actions.LOG_OUT_SUCCESS:
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
