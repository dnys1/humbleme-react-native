import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import PropTypes from 'prop-types';

import { Container } from '../../components/Container';

class WelcomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  handleLoginPress = () => {
    this.props.navigation.navigate('Login');
  };

  handleSignupPress = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    return (
      <Container>
        <Text>Welcome!</Text>
        <Button title="Login" onPress={this.handleLoginPress} />
        <Button title="Signup" onPress={this.handleSignupPress} />
      </Container>
    );
  }
}

export default WelcomeScreen;
