import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { Heading } from '../Text';

import styles from './styles';

const ProfileName = ({ name = 'John Doe' }) => (
  <View style={styles.textContainer}>
    <Heading text={name} />
  </View>
);

ProfileName.propTypes = {
  name: PropTypes.string,
};

export default ProfileName;
