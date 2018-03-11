import React from 'react';
import { Image } from 'react-native';

import styles from './styles';

export default () => (
  <Image
    source={require('../../assets/scorebar.png')}
    style={styles.scorebar}
    resizeMode="contain"
  />
);
