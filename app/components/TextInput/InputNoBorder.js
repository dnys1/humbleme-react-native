import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const InputNoBorder = ({
  placeholder,
  onChangeText,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  secureTextEntry = false,
  autoCorrect = false,
}) => (
  <View style={styles.container}>
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={styles.input}
      placeholderTextColor="#fff"
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCorrect={autoCorrect}
    />
  </View>
);

InputNoBorder.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  keyboardType: PropTypes.oneOf([
    'default',
    'numeric',
    'email-address',
    'phone-pad',
    'ascii-capable',
    'numbers-and-punctuation',
    'url',
    'number-pad',
    'name-phone-pad',
    'decimal-pad',
    'twitter',
    'web-search',
    'visible-password',
  ]),
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
};

export default InputNoBorder;
