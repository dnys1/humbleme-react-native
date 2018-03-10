import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { Subheading } from '../../components/Text';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateTFACode, confirmSignup, confirmLogin } from '../../actions/welcome';

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
    navigation: PropTypes.object,
    username: PropTypes.string,
    password: PropTypes.string,
    TFACode: PropTypes.string,
    user: PropTypes.object,
    confirmSignup: PropTypes.func,
    confirmLogin: PropTypes.func,
    updateTFACode: PropTypes.func,
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

  render() {
    const { signup, resend } = this.props.navigation.state.params;
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
            onChangeText={TFACode => this.props.updateTFACode(TFACode)}
            autoCapitalize="none"
          />
          {signup ? (
            <ButtonWithChevron
              text="Verify"
              color={styles.$yellow}
              onPress={() =>
                this.props.confirmSignup({
                  username: this.props.username,
                  password: this.props.password,
                  TFACode: this.props.TFACode,
                  resend,
                })
              }
              size="small"
            />
          ) : (
            <ButtonWithChevron
              text="Login"
              color={styles.$orange}
              onPress={() =>
                this.props.confirmLogin({ user: this.props.user, TFACode: this.props.TFACode })
              }
              size="small"
            />
          )}
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapState = (state) => {
  const { TFACode } = state.welcome;
  const { password } = state.welcome.login; // Only pull for user logging in

  let username;
  if (state.welcome.signup.username) {
    ({ username } = state.welcome.signup);
  } else {
    ({ username } = state.welcome.login);
  }
  return {
    user: state.auth,
    username,
    password,
    TFACode,
  };
};

const mapDispatch = {
  confirmSignup,
  confirmLogin,
  updateTFACode,
};

export default connect(mapState, mapDispatch)(TFAScreen);
