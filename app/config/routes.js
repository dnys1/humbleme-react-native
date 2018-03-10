import { StackNavigator } from 'react-navigation';

import {
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  TFAScreen,
  LoggedInScreen,
} from '../screens/WelcomeStack';

const WelcomeStack = StackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
    TFA: {
      screen: TFAScreen,
    },
    LoggedIn: {
      screen: LoggedInScreen,
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        /* https://github.com/react-navigation/react-navigation/issues/865 */
        elevation: 0 /* Android fix */,
      },
    },
  },
);

const MainStack = () => null;

export { WelcomeStack, MainStack };
