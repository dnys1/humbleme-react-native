import React from 'react';
import { Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ButtonWithDispatch = ({
  color, title, dispatch, toDispatch,
}) => (
  <Button title={title} color={color} onPress={dispatch(toDispatch())} />
);

ButtonWithDispatch.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  dispatch: PropTypes.func,
  toDispatch: PropTypes.func,
};

export default connect()(ButtonWithDispatch);
