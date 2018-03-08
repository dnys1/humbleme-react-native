import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Heading = ({ text, color }) => {
  const headingStyles = [styles.heading];
  if (color) {
    headingStyles.push({ color });
  }
  return <Text style={headingStyles}>{text}</Text>;
};

Heading.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Heading;
