import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateTempTFACode } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
  $view: '$keyboardAvoidingView',
});

class TFAScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    username: PropTypes.string,
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

  confirmSignUp = () => {
    Auth.confirmSignUp(this.props.username, this.props.TFACode)
      .then((res) => {
        setTimeout(
          () =>
            Alert.alert(
              'Success!',
              'Your account has been created! Please login to complete registration.',
            ),
          50,
        );
        this.props.navigation.navigate('Login');
        console.log('successful confirmation: ', res);
      })
      .catch((err) => {
        setTimeout(
          () =>
            Alert.alert('Error', 'There was an error in verifying your number. Please try again.'),
          50,
        );
        console.log('error confirming user: ', err);
      });
  };

  confirmSignIn = () => {
    Auth.confirmSignIn(this.props.user, this.props.TFACode)
      .then(() => {
        setTimeout(() => Alert.alert('Success', "You're logged in!"), 50);
        this.props.navigation.navigate('LoggedIn');
      })
      .catch((err) => {
        setTimeout(() => Alert.alert('Error', 'Please try entering the number again.'), 50);
        console.log('error confirming sign in: ', err);
      });
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView behavior="padding" style={styles.$view}>
          <Text style={{ color: 'white', width: '80%', paddingBottom: 20 }}>
            Please enter the 6-digit verification code sent your your phone number.
          </Text>
          <InputNoBorder
            placeholder="Authentication Code"
            onChangeText={TFACode => this.handleUpdateTempAuthCode(TFACode)}
            autoCapitalize="none"
          />
          <ButtonWithChevron
            text="Verify"
            color={styles.$yellow}
            onPress={
              this.props.navigation.state.params.signup ? this.confirmSignUp : this.confirmSignIn
            }
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.welcome;
  const { TFACode } = state.welcome.tempSignup;
  let username;
  if (state.welcome.tempSignup.username === '') {
    ({ username } = state.welcome.tempLogin);
  } else {
    ({ username } = state.welcome.tempSignup);
  }
  return {
    user,
    username,
    TFACode,
  };
};

export default connect(mapStateToProps)(TFAScreen);
