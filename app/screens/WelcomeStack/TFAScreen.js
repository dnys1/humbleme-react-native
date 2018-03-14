import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isEmpty } from '../../utils';
import { connectAlert } from '../../components/Alert';

import { Container } from '../../components/Container';
import { Subheading } from '../../components/Text';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateTFACode, confirmSignup, confirmLogin, resendSignUp } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
  $orange: '$primaryOrange',
  $green: '$primaryGreen',
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
    email: PropTypes.string,
    confirmSignup: PropTypes.func,
    confirmLogin: PropTypes.func,
    updateTFACode: PropTypes.func,
    resendSignUp: PropTypes.func,
    error: PropTypes.object,
    alertWithType: PropTypes.func,
    isTransitioning: PropTypes.bool,
  };

  static navigationOptions = {
    title: 'Authentication',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      borderBottomWidth: 0,
    }),
    /* To prevent user from being unable to sign up */
    headerLeft: null,
    gesturesEnabled: false,
  };

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (!isEmpty(error.confirm) && error.confirm !== this.props.error.confirm) {
      this.props.alertWithType(error.confirm.alertStyle, error.confirm.title, error.confirm.msg);
    }
  }

  render() {
    const { signup, resend } = this.props.navigation.state.params;
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView behavior="padding" style={styles.$viewStyles}>
          <View style={styles.$textViewStyles}>
            <Subheading color="white" text={signup ? 'Complete Signup' : 'Complete Login'} />
            <Text style={{ color: 'white', width: '80%', marginBottom: 10 }}>
              Please enter the 5-digit verification code sent to{' '}
              {`${this.props.email || 'your email'}`} to continue.
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
              color={styles.$green}
              onPress={() =>
                this.props.confirmSignup({
                  username: this.props.username,
                  password: this.props.password,
                  TFACode: this.props.TFACode,
                  resend,
                })
              }
              disabled={this.props.isTransitioning}
              size="small"
            />
          ) : (
            <ButtonWithChevron
              text="Login"
              color={styles.$orange}
              onPress={() =>
                this.props.confirmLogin({ user: this.props.user, TFACode: this.props.TFACode })
              }
              disabled={this.props.isTransitioning}
              size="small"
            />
          )}
          <ButtonWithChevron
            text="Resend Code"
            color={styles.$yellow}
            onPress={() =>
              this.props.resendSignUp({
                username: this.props.username,
              })
            }
            size="large"
            disabled={this.props.isTransitioning}
            style={{ marginVertical: 8 }}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { TFACode, error } = state.welcome;
  const { password } = state.welcome.login || state.welcome.signup;
  const { user } = state.auth;
  const { isTransitioning } = state.nav;

  let email;
  if (user.signInUserSession) {
    ({ email } = state.auth.attributes);
  } else {
    ({ email } = state.welcome.signup);
  }

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
    error,
    email,
    isTransitioning,
  };
};

const mapDispatchToProps = {
  confirmSignup,
  confirmLogin,
  updateTFACode,
  resendSignUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(connectAlert(TFAScreen));
