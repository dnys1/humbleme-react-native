import React from 'react';
import { Text, View, Button } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { PropTypes } from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

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
  },
);

const DetailsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Details!</Text>
  </View>
);

const HomeScreen = props => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home!</Text>
    <Button title="Go to Settings" onPress={() => props.navigation.navigate('Settings')} />
    <Button title="Go to Details" onPress={() => props.navigation.navigate('Details')} />
  </View>
);

const SettingsScreen = props => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings!</Text>
    <Button title="Go to Home" onPress={() => props.navigation.navigate('Home')} />
    <Button title="Go to Details" onPress={() => props.navigation.navigate('Details')} />
  </View>
);

HomeScreen.propTypes = {
  navigation: PropTypes.func,
};
SettingsScreen.propTypes = {
  navigation: PropTypes.func,
};

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const SettingsStack = StackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});

const MainStack = TabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
  },
  {
    /* eslint-disable react/prop-types */
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    /* eslint-enable react/prop-types */
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);

export { WelcomeStack, MainStack };
