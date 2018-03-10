import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $warnColor: '$primaryYellow',
  $errorColor: '$primaryOrange',
});

class AlertProvider extends Component {
  static get childContextTypes() {
    return {
      alertWithType: PropTypes.func,
      alert: PropTypes.func,
    };
  }

  static get propTypes() {
    return {
      children: PropTypes.any,
    };
  }

  getChildContext() {
    return {
      alert: (...args) => this.dropdown.alert(...args),
      alertWithType: (...args) => this.dropdown.alertWithType(...args),
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        <DropdownAlert
          ref={(ref) => {
            this.dropdown = ref;
          }}
          warnColor={styles.$warnColor}
          errorColor={styles.$errorColor}
        />
      </View>
    );
  }
}

export default AlertProvider;
