import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import {
  updateTempLoginUserName,
  updateTempLoginPassword,
  handleLogIn,
} from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
  $viewStyles: '$keyboardAvoidingView',
});

class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
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
    const { username, password } = this.props;
    this.props.dispatch(handleLogIn(username, password));
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView style={styles.$viewStyles} behavior="padding">
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
  const { username, password } = state.welcome.login;

  return {
    username,
    password,
  };
};

export default connect(mapStateToProps)(LoginScreen);
