import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

const ButtonWithChevron = ({ text, color, onPress }) => {
  const containerStyles = [styles.container];
  if (color) {
    containerStyles.push({ backgroundColor: color });
  }

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{text}</Text>
        <Ionicons name="ios-arrow-forward" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
};

ButtonWithChevron.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

export default ButtonWithChevron;
