import React from 'react';
import { AppLoading } from 'expo';
import PropTypes from 'prop-types';

import { connectAlert } from '../components/Alert';

class AppLoadingAlert extends React.Component {
  static propTypes = {
    ...AppLoading.propTypes,
    alertWithType: PropTypes.func,
  };

  handleError = () => {
    this.props.alertWithType('Network Error', 'Unable to connect to the network');
  };

  render() {
    return (
      <AppLoading
        startAsync={this.props.startAsync}
        onFinish={this.props.onFinish}
        onError={this.handleError}
      />
    );
  }
}

export default connectAlert(AppLoadingAlert);
