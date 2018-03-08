import React, { Component } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import {
  updateTempSignupEmail,
  updateTempSignupUserName,
  updateTempSignupPassword,
  updateTempSignupPasswordRetype,
  updateTempSignupPhoneNumber,
} from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
  $viewStyles: '$keyboardAvoidingView',
});

class SignupScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordRetype: PropTypes.string,
    phone_number: PropTypes.string,
  };

  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
    }),
    headerTintColor: '#fff',
    headerTitleStype: {
      fontWeight: '600',
      fontSize: 80,
    },
  };

  // handleUpdateName = (name) => {
  //   this.props.dispatch(updateTempSignupName(name));
  // };

  handleUpdateEmail = (email) => {
    this.props.dispatch(updateTempSignupEmail(email));
  };

  handleUpdateUserName = (username) => {
    this.props.dispatch(updateTempSignupUserName(username));
  };

  handleUpdatePassword = (password) => {
    this.props.dispatch(updateTempSignupPassword(password));
  };

  handleUpdatePasswordRetype = (passwordRetype) => {
    this.props.dispatch(updateTempSignupPasswordRetype(passwordRetype));
  };

  handleUpdatePhoneNumber = (phone_number) => {
    /* TODO: Fix country code issue */
    const numberWithCallingCode = `+1${phone_number}`;
    this.props.dispatch(updateTempSignupPhoneNumber(numberWithCallingCode));
  };

  handleUserSignup = () => {
    if (this.props.password !== this.props.passwordRetype) {
      setTimeout(() => Alert.alert('Error', 'Passwords do not match.'), 50);
      return;
    }

    Auth.signUp({
      username: this.props.username,
      password: this.props.password,
      attributes: {
        phone_number: this.props.phone_number,
        email: this.props.email,
      },
    })
      .then((res) => {
        console.log('successful signup!: ', res);
        this.props.navigation.navigate('TFA', {
          signup: true,
        });
      })
      .catch((err) => {
        if (err.code === 'InvalidPasswordException') {
          setTimeout(
            () =>
              Alert.alert(
                'Password error',
                'Password must be 8 characters long and contain:\n- uppercase letters\n- lowercase letters\n- special characters\n- numbers',
              ),
            50,
          );
        } else if (err.code === 'UsernameExistsException') {
          setTimeout(
            () =>
              Alert.alert(
                'Signup error',
                "Username already exists. If you've already signed up, please use the Login page.",
              ),
            50,
          );
        }
        console.log('error signing up: ', err);
      });
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView style={styles.$viewStyles} behavior="padding">
          <InputNoBorder
            placeholder="Pick a username"
            onChangeText={username => this.handleUpdateUserName(username)}
            autoCapitalize="none"
          />
          <InputNoBorder
            placeholder="Email"
            onChangeText={email => this.handleUpdateEmail(email)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputNoBorder
            placeholder="Password"
            onChangeText={password => this.handleUpdatePassword(password)}
            autoCapitalize="none"
            secureTextEntry
          />
          <InputNoBorder
            placeholder="Re-type Password"
            onChangeText={passwordRetype => this.handleUpdatePasswordRetype(passwordRetype)}
            autoCapitalize="none"
            secureTextEntry
          />
          <InputNoBorder
            placeholder="Phone Number"
            onChangeText={phone_number => this.handleUpdatePhoneNumber(phone_number)}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
          <ButtonWithChevron
            text="Sign Up"
            color={styles.$yellow}
            onPress={this.handleUserSignup}
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    name,
    username,
    email,
    password,
    passwordRetype,
    phone_number,
  } = state.welcome.tempSignup;

  return {
    name,
    username,
    email,
    password,
    passwordRetype,
    phone_number,
  };
};

export default connect(mapStateToProps)(SignupScreen);
