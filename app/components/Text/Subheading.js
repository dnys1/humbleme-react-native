import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Subheading = ({ text, color }) => {
  const subheadingStyles = [styles.subheading];
  if (color) {
    subheadingStyles.push({ color });
  }
  return <Text style={subheadingStyles}>{text}</Text>;
};

Subheading.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Subheading;
