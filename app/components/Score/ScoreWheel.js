import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const ScoreWheel = ({ children }) => (
  <View style={styles.scorewheelContainer}>
    <ImageBackground
      source={require('../../assets/scorewheel.png')}
      resizeMode="contain"
      style={styles.scorewheel}
    >
      {children}
    </ImageBackground>
  </View>
);

ScoreWheel.propTypes = {
  children: PropTypes.any,
};

export default ScoreWheel;
