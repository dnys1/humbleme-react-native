import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '@expo/vector-icons/FontAwesome';

import { onWarningPress } from '../../actions/network';

import styles from './styles';

const WarningButton = props => (
  <TouchableOpacity onPress={props.onWarningPress}>
    <Icon name="warning" style={styles.warningIcon} />
  </TouchableOpacity>
);

WarningButton.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(WarningButton);
