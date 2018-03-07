import { StackNavigator } from 'react-navigation';
import { WelcomeScreen, LoginScreen, SignupScreen } from '../screens/Welcome';

const WelcomeStack = StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
});

const MainStack = () => null;

export { WelcomeStack, MainStack };
