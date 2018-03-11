import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { WelcomeScreen, LoginScreen, SignupScreen, TFAScreen } from '../screens/WelcomeStack';

import { HomeScreen, ProfileScreen, SettingsScreen } from '../screens/AppStack';

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

const AppNavigator = TabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    /* eslint-disable react/prop-types */
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const ios = Platform.OS === 'ios';
        const prefix = ios ? 'ios' : 'md';
        let iconName;
        if (routeName === 'Home') {
          iconName = `${prefix}-speedometer${focused || !ios ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = `${prefix}-search${focused || !ios ? '' : '-outline'}`;
        } else if (routeName === 'Resources') {
          iconName = `${prefix}-book${focused || !ios ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `${prefix}-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `${prefix}-options${focused ? '' : '-outline'}`;
        }

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

const MainStack = StackNavigator(
  {
    Welcome: { screen: WelcomeStack },
    App: { screen: AppNavigator },
  },
  {
    headerMode: 'none',
  },
);

export { MainStack, WelcomeStack, AppNavigator };
