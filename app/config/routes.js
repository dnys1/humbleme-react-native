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
    headerStyle: {
      borderBottomWidth: 0 /* https://github.com/react-navigation/react-navigation/issues/865 */,
    },
  },
);

const MainStack = () => null;

export { WelcomeStack, MainStack };
