import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isEmpty } from '../../utils';
import { connectAlert } from '../../components/Alert';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateLoginPassword, updateLoginUsername, logIn } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
  $viewStyles: '$keyboardAvoidingView',
});

class LoginScreen extends Component {
  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    updateUsername: PropTypes.func,
    updatePassword: PropTypes.func,
    logIn: PropTypes.func,
    error: PropTypes.object,
    alertWithType: PropTypes.func,
  };

  static navigationOptions = {
    title: 'Login',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      borderBottomWidth: 0,
    }),
    headerTintColor: '#fff',
    headerTitleStype: {
      fontWeight: '600',
      fontSize: 80,
    },
  };

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (!isEmpty(error.login) && error.login !== this.props.error.login) {
      this.props.alertWithType(error.login.alertStyle, error.login.title, error.login.msg);
    }
  }

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView style={styles.$viewStyles} behavior="padding">
          <InputNoBorder
            placeholder="Username"
            onChangeText={username => this.props.updateUsername(username)}
            autoCapitalize="none"
          />
          <InputNoBorder
            placeholder="Password"
            onChangeText={password => this.props.updatePassword(password)}
            autoCapitalize="none"
            secureTextEntry
          />
          <ButtonWithChevron
            text="Login"
            color={styles.$orange}
            onPress={() =>
              this.props.logIn({
                username: this.props.username,
                password: this.props.password,
                resend: false,
              })
            }
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { username, password } = state.welcome.login;
  const { error } = state.welcome;

  return {
    username,
    password,
    error,
  };
};

const mapDispatchToProps = {
  updatePassword: updateLoginPassword,
  updateUsername: updateLoginUsername,
  logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(connectAlert(LoginScreen));
