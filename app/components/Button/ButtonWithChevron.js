import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

const ButtonWithChevron = ({
  text, color, borderColor, onPress, size = 'large',
}) => {
  const containerStyles = [styles.container];
  if (color) {
    containerStyles.push({ backgroundColor: color });
  }
  if (borderColor) {
    containerStyles.push({ borderColor });
  }
  if (size === 'large') {
    containerStyles.push({
      width: '50%',
      height: 50,
    });
  } else if (size === 'small') {
    containerStyles.push({
      width: '35%',
      height: 40,
    });
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
  borderColor: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(['small', 'large']),
};

export default ButtonWithChevron;
