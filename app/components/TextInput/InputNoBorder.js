import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const InputNoBorder = ({ placeholder, onChangeText, autoCapitalize = 'sentences' }) => (
  <View style={styles.container}>
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={styles.input}
      placeholderTextColor="#fff"
      autoCapitalize={autoCapitalize}
    />
  </View>
);

InputNoBorder.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
};

export default InputNoBorder;
