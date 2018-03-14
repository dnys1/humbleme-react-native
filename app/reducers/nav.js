import { NavigationActions } from 'react-navigation';
import MainStack from '../config/routes';

import * as actions from '../actions/nav';
import * as appActions from '../actions/app';

const initialState = MainStack.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case actions.NAV_SHOW_WARNING_ICON:
      nextState = MainStack.router.getStateForAction(NavigationActions.setParams({
        key: 'Welcome',
        params: {
          showWarning: true,
        },
      }));
      break;
    case actions.NAV_REMOVE_WARNING_ICON:
      nextState = MainStack.router.getStateForAction(NavigationActions.setParams({
        key: 'Welcome',
        params: {
          showWarning: false,
        },
      }));
      break;
    case actions.NAV_LOGIN_CONFIRMATION_MODAL:
      nextState = MainStack.router.getStateForAction(
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
      nextState = MainStack.router.getStateForAction(
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
    case actions.NAV_NAME_SCREEN:
      nextState = MainStack.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'Name',
        }),
        state,
      );
      break;
    case actions.NAV_RESET_WELCOME:
      nextState = MainStack.router.getStateForAction(NavigationActions.reset(
        {
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        },
        state,
      ));
      break;
    case actions.NAV_LOGIN_SCREEN:
      nextState = MainStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
      break;
    case actions.NAV_SIGNUP_SCREEN:
      nextState = MainStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Signup' }),
        state,
      );
      break;
    case actions.NAV_LOGGED_IN_SCREEN:
      nextState = MainStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'App' }));
      break;
    case appActions.LOG_OUT_SUCCESS:
      nextState = MainStack.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        }),
        state,
      );
      break;
    default:
      nextState = MainStack.router.getStateForAction(action, state);
  }
  return nextState || state;
};
