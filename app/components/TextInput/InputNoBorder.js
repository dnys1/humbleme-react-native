import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const InputNoBorder = ({ placeholder, onChangeText }) => (
  <View style={styles.container}>
    <TextInput placeholder={placeholder} onChangeText={onChangeText} style={styles.input} />
  </View>
);

InputNoBorder.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default InputNoBorder;
