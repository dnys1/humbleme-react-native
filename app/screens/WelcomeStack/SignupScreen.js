import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import {
  updateTempSignupEmail,
  updateTempSignupUserName,
  updateTempSignupPassword,
  updateTempSignupPasswordRetype,
  updateTempSignupPhoneNumber,
  signUp,
} from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
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
    handleSignUp: PropTypes.func,
  };

  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
    }),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: 25,
    },
  };

  render() {
    const {
      username,
      email,
      password,
      passwordRetype,
      phone_number,
      updateUsername,
      updateEmail,
      updatePassword,
      updatePasswordRetype,
      updatePhoneNumber,
      handleSignUp,
    } = this.props;
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView style={styles.$viewStyles} behavior="padding">
          <InputNoBorder
            placeholder="Pick a username"
            onChangeText={val => updateUsername(val)}
            autoCapitalize="none"
          />
          <InputNoBorder
            placeholder="Email"
            onChangeText={val => updateEmail(val)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputNoBorder
            placeholder="Password"
            onChangeText={val => updatePassword(val)}
            autoCapitalize="none"
            secureTextEntry
          />
          <InputNoBorder
            placeholder="Re-type Password"
            onChangeText={val => updatePasswordRetype(val)}
            autoCapitalize="none"
            secureTextEntry
          />
          <InputNoBorder
            placeholder="Phone Number"
            onChangeText={(val) => {
              if (val.substring(0, 2) === '+1') updatePhoneNumber(val);
              else updatePhoneNumber(`+1${val}`);
            }}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
          <ButtonWithChevron
            text="Sign Up"
            color={styles.$yellow}
            onPress={() => {
              if (password === passwordRetype) {
                handleSignUp(username, email, password, phone_number);
              } else console.log("Error: passwords don't match");
            }}
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapState = (state) => {
  const {
    name, username, email, password, passwordRetype, phone_number,
  } = state.welcome.signup;

  return {
    name,
    username,
    email,
    password,
    passwordRetype,
    phone_number,
  };
};

const mapDispatch = {
  updateEmail: updateTempSignupEmail,
  updateUsername: updateTempSignupUserName,
  updatePassword: updateTempSignupPassword,
  updatePasswordRetype: updateTempSignupPasswordRetype,
  updatePhoneNumber: updateTempSignupPhoneNumber,
  handleSignUp: signUp,
};

export default connect(mapState, mapDispatch)(SignupScreen);
