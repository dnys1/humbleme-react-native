import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Header } from 'react-navigation';
import { connect } from 'react-redux';

import { isEmpty } from '../../utils';
import { connectAlert } from '../../components/Alert';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import {
  updateSignupEmail,
  updateSignupUsername,
  updateSignupPassword,
  updateSignupPasswordRetype,
  updateSignupPhoneNumber,
  signUp,
} from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
  $lightOrange: '$primaryCarrotOrange',
  $viewStyles: '$keyboardAvoidingView',
});

class SignupScreen extends Component {
  static propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordRetype: PropTypes.string,
    phone_number: PropTypes.string,
    updateUsername: PropTypes.func,
    updateEmail: PropTypes.func,
    updatePassword: PropTypes.func,
    updatePasswordRetype: PropTypes.func,
    updatePhoneNumber: PropTypes.func,
    signUp: PropTypes.func,
    error: PropTypes.object,
    alertWithType: PropTypes.func,
    isTransitioning: PropTypes.bool,
  };

  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      borderBottomWidth: 0,
    }),
  };

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (!isEmpty(error.signup) && error.signup !== this.props.error.signup) {
      this.props.alertWithType(error.signup.alertStyle, error.signup.title, error.signup.msg);
    }
  }

  render() {
    /* Would like to use const { props } = this; but eslint does not support */
    /* and throws a no-unused-props error. See git issue here: */
    /* https://github.com/yannickcr/eslint-plugin-react/issues/1393 */

    const keyboardOffset = Header.HEIGHT + 22;
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView
          style={styles.$viewStyles}
          keyboardVerticalOffset={keyboardOffset}
          behavior="padding"
        >
          <InputNoBorder
            placeholder="Pick a username"
            onChangeText={username => this.props.updateUsername(username)}
            autoCapitalize="none"
          />
          <InputNoBorder
            placeholder="Email"
            onChangeText={email => this.props.updateEmail(email)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputNoBorder
            placeholder="Password"
            onChangeText={password => this.props.updatePassword(password)}
            autoCapitalize="none"
            secureTextEntry
          />
          <InputNoBorder
            placeholder="Re-type Password"
            onChangeText={passwordRetype => this.props.updatePasswordRetype(passwordRetype)}
            autoCapitalize="none"
            secureTextEntry
          />
          <InputNoBorder
            placeholder="Phone Number"
            onChangeText={(phone_number) => {
              if (phone_number.substring(0, 2) === '+1') this.props.updatePhoneNumber(phone_number);
              else this.props.updatePhoneNumber(`+1${phone_number}`);
            }}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
          <ButtonWithChevron
            text="Sign Up"
            color={styles.$lightOrange}
            onPress={() => {
              if (this.props.password === this.props.passwordRetype) {
                this.props.signUp({
                  username: this.props.username,
                  password: this.props.password,
                  email: this.props.email,
                  phone_number: this.props.phone_number,
                });
              } else console.log("Error: passwords don't match");
            }}
            disabled={this.props.isTransitioning}
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    name, username, email, password, passwordRetype, phone_number,
  } = state.welcome.signup;
  const { error } = state.welcome;
  const { isTransitioning } = state.nav;

  return {
    name,
    username,
    email,
    password,
    passwordRetype,
    phone_number,
    error,
    isTransitioning,
  };
};

const mapDispatchToProps = {
  updateEmail: updateSignupEmail,
  updateUsername: updateSignupUsername,
  updatePassword: updateSignupPassword,
  updatePasswordRetype: updateSignupPasswordRetype,
  updatePhoneNumber: updateSignupPhoneNumber,
  signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(connectAlert(SignupScreen));
