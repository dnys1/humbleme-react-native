import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import {
  updateTempFirstName,
  updateTempLastName,
  updateTempUserName,
  updateTempPassword,
} from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
});

class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Signup',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
    }),
    headerTintColor: '#fff',
    headerTitleStype: {
      fontWeight: '600',
      fontSize: 80,
    },
  };

  handleUpdateTempFirstName = (firstName) => {
    console.log(updateTempFirstName(firstName));
  };

  handleUpdateTempLastName = (lastName) => {
    console.log(updateTempLastName(lastName));
  };

  handleUpdateTempUserName = (userName) => {
    console.log(updateTempUserName(userName));
  };

  handleUpdateTempPassword = (password) => {
    console.log(updateTempPassword(password));
  };

  handleUserSignup = () => {
    console.log('signup button pressed!');
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <InputNoBorder
          placeholder="First Name"
          onChangeText={firstName => this.handleUpdateTempFirstName(firstName)}
          autoCapitalize="words"
        />
        <InputNoBorder
          placeholder="Last Name"
          onChangeText={lastName => this.handleUpdateTempLastName(lastName)}
          autoCapitalize="words"
        />
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
          text="Signup"
          color={styles.$yellow}
          onPress={this.handleUserSignup}
          size="small"
        />
      </Container>
    );
  }
}

export default SignupScreen;
