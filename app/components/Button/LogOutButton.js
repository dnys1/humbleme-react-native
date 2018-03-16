import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logOut } from '../../actions/app';

const LogOutButton = props => (
  <TouchableOpacity onPress={() => props.logOut()}>
    <Text style={{ color: 'white', fontSize: 19 }}>Logout</Text>
  </TouchableOpacity>
);

LogOutButton.propTypes = {
  logOut: PropTypes.func,
};

const mapDispatchToProps = {
  logOut,
};

export default connect(null, mapDispatchToProps)(LogOutButton);
