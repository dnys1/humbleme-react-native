import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateTempLoginUserName, updateTempLoginPassword, logIn } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
  $viewStyles: '$keyboardAvoidingView',
});

class LoginScreen extends Component {
  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    handleLogin: PropTypes.func,
    updateUsername: PropTypes.func,
    updatePassword: PropTypes.func,
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

  render() {
    const {
      username, password, updateUsername, updatePassword, handleLogin,
    } = this.props;
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView style={styles.$viewStyles} behavior="padding">
          <InputNoBorder
            placeholder="Username"
            onChangeText={val => updateUsername(val)}
            autoCapitalize="none"
          />
          <InputNoBorder
            placeholder="Password"
            onChangeText={val => updatePassword(val)}
            autoCapitalize="none"
            secureTextEntry
          />
          <ButtonWithChevron
            text="Login"
            color={styles.$orange}
            onPress={() => handleLogin(username, password)}
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapState = (state) => {
  const { username, password } = state.welcome.login;

  return {
    username,
    password,
  };
};

const mapDispatch = {
  updatePassword: updateTempLoginPassword,
  updateUsername: updateTempLoginUserName,
  handleLogin: logIn,
};

export default connect(mapState, mapDispatch)(LoginScreen);
