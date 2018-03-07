import { StackNavigator } from 'react-navigation';

import { WelcomeScreen, LoginScreen, SignupScreen } from '../screens/WelcomeStack';

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
  },
  {
    headerMode: 'screen',
  },
);

const MainStack = () => null;

export { WelcomeStack, MainStack };
