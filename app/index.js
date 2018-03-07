import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import { WelcomeStack } from './config/routes';

EStyleSheet.build({
  $white: '#fff',
  $primaryTeal: '#38CECA',
  $primaryOrange: '#f15a24',
  $primaryYellow: '#efb402',
});

export default () => <WelcomeStack />;
