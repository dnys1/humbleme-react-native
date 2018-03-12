import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

const ButtonWithChevron = ({
  text,
  color,
  borderColor,
  onPress,
  size = 'large',
  style,
  textStyle,
  disabled = false,
}) => {
  const containerStyles = [styles.container];
  if (color) {
    containerStyles.push({ backgroundColor: color });
  }
  if (borderColor) {
    containerStyles.push({ borderColor });
  }
  if (size === 'xlarge') {
    containerStyles.push({
      width: '70%',
      height: 60,
    });
  } else if (size === 'large') {
    containerStyles.push({
      width: '50%',
      height: 50,
    });
  } else if (size === 'medium') {
    containerStyles.push({
      width: '42%',
      height: 40,
    });
  } else if (size === 'small') {
    containerStyles.push({
      width: '35%',
      height: 50,
    });
  }
  if (style) {
    containerStyles.push(style);
  }

  const textStyles = [styles.text];
  if (textStyle) {
    textStyles.push(textStyle);
  }

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress} disabled={disabled}>
      <View style={styles.wrapper}>
        <Text style={textStyles}>{text}</Text>
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
  size: PropTypes.oneOf(['small', 'large', 'xlarge']),
  style: PropTypes.object,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default ButtonWithChevron;
