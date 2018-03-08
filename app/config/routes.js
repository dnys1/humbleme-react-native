import { StackNavigator } from 'react-navigation';
import { Keyboard } from 'react-native';

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
    onTransitionStart: () => Keyboard.dismiss(),
  },
);

const MainStack = () => null;

export { WelcomeStack, MainStack };
