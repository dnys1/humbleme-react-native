import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';

import styles from './styles';

const ProfileName = ({ name = 'John Doe' }) => (
  <View style={styles.textContainer}>
    <Text h3>{name}</Text>
  </View>
);

ProfileName.propTypes = {
  name: PropTypes.string,
};

export default ProfileName;
