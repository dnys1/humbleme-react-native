import React, { Component } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import {
  updateTempLoginUserName,
  updateTempLoginPassword,
  loginUserSuccess,
} from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
  $view: '$keyboardAvoidingView',
});

class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    username: PropTypes.string,
    password: PropTypes.string,
  };

  static navigationOptions = {
    title: 'Login',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
    }),
    headerTintColor: '#fff',
    headerTitleStype: {
      fontWeight: '600',
      fontSize: 80,
    },
  };

  handleUpdateUserName = (userName) => {
    this.props.dispatch(updateTempLoginUserName(userName));
  };

  handleUpdatePassword = (password) => {
    this.props.dispatch(updateTempLoginPassword(password));
  };

  handleLoginRequest = () => {
    console.log('login attempt');
    Auth.signIn(this.props.username, this.props.password)
      .then((user) => {
        this.props.dispatch(loginUserSuccess(user));
        console.log(user);
        this.props.navigation.navigate('TFA', {
          signup: false,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'UserNotConfirmedException') {
          this.resendSignUp();
        } else if (err.code === 'UserNotFoundException') {
          setTimeout(() => Alert.alert('Error', 'Username not found.'), 50);
        }
      });
  };

  resendSignUp = () => {
    Auth.resendSignUp(this.props.username)
      .then((res) => {
        console.log(res);
        this.props.navigation.navigate('TFA', {
          signup: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView style={styles.$view} behavior="padding">
          <InputNoBorder
            placeholder="Username"
            onChangeText={userName => this.handleUpdateUserName(userName)}
            autoCapitalize="none"
          />
          <InputNoBorder
            placeholder="Password"
            onChangeText={password => this.handleUpdatePassword(password)}
            autoCapitalize="none"
            secureTextEntry
          />
          <ButtonWithChevron
            text="Login"
            color={styles.$orange}
            onPress={this.handleLoginRequest}
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { username, password } = state.welcome.tempLogin;

  return {
    username,
    password,
  };
};

export default connect(mapStateToProps)(LoginScreen);
