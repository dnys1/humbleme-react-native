import { NavigationActions } from 'react-navigation';
import { WelcomeStack } from '../config/routes';

const initialState = WelcomeStack.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  const nextState = WelcomeStack.router.getStateForAction(action, state);
  return nextState || state;
};
