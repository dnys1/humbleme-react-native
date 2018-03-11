import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import {
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  TFAScreen,
  NameScreen,
} from '../screens/WelcomeStack';
import { HomeScreen, ProfileScreen, SettingsScreen } from '../screens/AppStack';

const AppTabNavigator = TabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    Dashboard: {
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
        if (routeName === 'Dashboard') {
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
    initialRouteName: 'Dashboard',
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
    Name: {
      screen: NameScreen,
    },
    App: {
      screen: AppTabNavigator,
    },
  },
  {
    headerMode: 'screen',
  },
);

export default MainStack;
