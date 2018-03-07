import { StackNavigator } from 'react-navigation';

import { WelcomeScreen, LoginScreen, SignupScreen, TFAScreen } from '../screens/WelcomeStack';

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
  },
  {
    headerMode: 'screen',
  },
);

const MainStack = () => null;

export { WelcomeStack, MainStack };
