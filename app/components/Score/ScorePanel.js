import React from 'react';
import { View, Text } from 'react-native';

import ScoreBar from './ScoreBar';
import ScoreWheel from './ScoreWheel';
import styles from './styles';

export default () => (
  <View style={styles.panelContainer}>
    <ScoreWheel>
      <ScoreBar />
      <View style={styles.textView}>
        <Text style={styles.mainText}>510</Text>
        <Text style={styles.smallText}>Poor</Text>
      </View>
    </ScoreWheel>
  </View>
);
