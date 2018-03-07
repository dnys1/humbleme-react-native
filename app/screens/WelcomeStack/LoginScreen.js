import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
// import PropTypes from 'prop-types';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateTempUserName, updateTempPassword } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
});

class LoginScreen extends Component {
  // static propTypes = {
  //   navigation: PropTypes.object,
  // };

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

  handleUpdateTempUserName = (userName) => {
    console.log(updateTempUserName(userName));
  };

  handleUpdateTempPassword = (password) => {
    console.log(updateTempPassword(password));
  };

  handleLoginRequest = () => {
    console.log('login request');
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <InputNoBorder
          placeholder="Username"
          onChangeText={userName => this.handleUpdateTempUserName(userName)}
          autoCapitalize="none"
        />
        <InputNoBorder
          placeholder="Password"
          onChangeText={password => this.handleUpdateTempPassword(password)}
          autoCapitalize="none"
        />
        <ButtonWithChevron
          text="Login"
          color={styles.$orange}
          onPress={this.handleLoginRequest}
          size="small"
        />
      </Container>
    );
  }
}

export default LoginScreen;
