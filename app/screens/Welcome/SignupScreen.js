import React, { Component } from 'react';
import { Button } from 'react-native';

import { Container } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';

import {
  updateTempFirstName,
  updateTempLastName,
  updateTempUserName,
  updateTempPassword,
} from '../../actions/welcome';

class SignupScreen extends Component {
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
      <Container>
        <InputNoBorder
          placeholder="First Name"
          onChangeText={firstName => this.handleUpdateTempFirstName(firstName)}
        />
        <InputNoBorder
          placeholder="Last Name"
          onChangeText={lastName => this.handleUpdateTempLastName(lastName)}
        />
        <InputNoBorder
          placeholder="Username"
          onChangeText={username => this.handleUpdateTempUserName(username)}
        />
        <InputNoBorder
          placeholder="Password"
          onChangeText={password => this.handleUpdateTempPassword(password)}
        />
        <Button title="Sign Up!" onPress={this.handleUserSignup} />
      </Container>
    );
  }
}

export default SignupScreen;
