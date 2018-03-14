import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator, SwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import {
  AuthLoadingScreen,
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  TFAScreen,
  NameScreen,
} from '../screens/WelcomeStack';
import { HomeScreen, ProfileScreen, SettingsScreen } from '../screens/AppStack';

const HomeStack = StackNavigator(
  {
    Dashboard: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
      },
    },
  },
);

const AppStack = TabNavigator(
  {
    Dashboard: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Dasboard',
      },
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
    animationEnabled: true,
    swipeEnabled: true,
  },
);

const AuthStack = StackNavigator(
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
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
      },
    },
  },
);

const MainStack = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default MainStack;
