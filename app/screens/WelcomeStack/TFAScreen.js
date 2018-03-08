import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { Subheading } from '../../components/Text';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateTempTFACode, handleConfirmSignup, handleConfirmLogin } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
  $orange: '$primaryOrange',
  $viewStyles: '$keyboardAvoidingView',
  $textViewStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

class TFAScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    username: PropTypes.string,
    password: PropTypes.string,
    TFACode: PropTypes.string,
    user: PropTypes.object,
  };

  static navigationOptions = {
    title: 'Authentication',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
    }),
    headerTintColor: '#fff',
    headerTitleStype: {
      fontWeight: '600',
      fontSize: 80,
    },
    /* To prevent user from being unable to sign up */
    headerLeft: null,
    gesturesEnabled: false,
  };

  handleUpdateTempAuthCode = (TFACode) => {
    this.props.dispatch(updateTempTFACode(TFACode));
  };

  confirmSignup = () => {
    const { username, password, TFACode } = this.props;
    const { resend } = this.props.navigation.state.params;
    this.props.dispatch(handleConfirmSignup(username, password, TFACode, resend));
  };

  confirmLogin = () => {
    const { user, TFACode } = this.props;
    this.props.dispatch(handleConfirmLogin(user, TFACode));
  };

  render() {
    const { signup } = this.props.navigation.state.params;
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView behavior="padding" style={styles.$viewStyles}>
          <View style={styles.$textViewStyles}>
            <Subheading color="white" text={signup ? 'Complete Signup' : 'Complete Login'} />
            <Text style={{ color: 'white', width: '80%', marginBottom: 10 }}>
              Please enter the 6-digit verification code sent to your phone number in order to
              continue.
            </Text>
          </View>
          <InputNoBorder
            placeholder="Authentication Code"
            onChangeText={TFACode => this.handleUpdateTempAuthCode(TFACode)}
            autoCapitalize="none"
          />
          {signup ? (
            <ButtonWithChevron
              text="Verify"
              color={styles.$yellow}
              onPress={this.confirmSignup}
              size="small"
            />
          ) : (
            <ButtonWithChevron
              text="Login"
              color={styles.$orange}
              onPress={this.confirmLogin}
              size="small"
            />
          )}
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.welcome;
  const { TFACode } = state.welcome.signup;
  const { password } = state.welcome.login; // Only pull for user logging in

  let username;
  if (state.welcome.signup.username) {
    ({ username } = state.welcome.signup);
  } else {
    ({ username } = state.welcome.login);
  }
  return {
    user,
    username,
    password,
    TFACode,
  };
};

export default connect(mapStateToProps)(TFAScreen);
