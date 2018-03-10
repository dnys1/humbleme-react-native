import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '@expo/vector-icons/FontAwesome';

import { onWarningPress } from '../../actions/network';

import styles from './styles';

const HeaderWarningNotification = props => (
  <TouchableOpacity onPress={props.onWarningPress}>
    <View style={styles.wrapper}>
      <Text style={styles.warningText}>No Internet</Text>
      <Icon name="warning" style={styles.warningIcon} />
    </View>
  </TouchableOpacity>
);

HeaderWarningNotification.propTypes = {
  onWarningPress: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { connected, hasCheckedStatus } = state.network;
  return {
    connected,
    hasCheckedStatus,
  };
};

const mapDispatchToProps = {
  onWarningPress,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWarningNotification);
