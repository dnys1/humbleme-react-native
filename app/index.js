import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';

import config from './aws-exports';
import Store from './config/store';
import { WelcomeStack } from './config/routes';

Amplify.configure(config);

EStyleSheet.build({
  $white: '#ffffff',
  $primaryTeal: '#38CECA',
  $primaryOrange: '#f15a24',
  $primaryYellow: '#efb402',
  $keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default () => (
  <Provider store={Store}>
    <WelcomeStack />
  </Provider>
);
