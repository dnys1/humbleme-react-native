import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { styles as ContainerStyles } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import {
  updateTempName,
  updateTempUserName,
  updateTempPassword,
  updateTempPhoneNumber,
} from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
});

class SignupScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
    }),
    headerTintColor: '#fff',
    headerTitleStype: {
      fontWeight: '600',
      fontSize: 80,
    },
  };

  handleUpdateTempName = (name) => {
    console.log(updateTempName(name));
  };

  handleUpdateTempUserName = (userName) => {
    console.log(updateTempUserName(userName));
  };

  handleUpdateTempPassword = (password) => {
    console.log(updateTempPassword(password));
  };

  handleUpdateTempPhoneNumber = (phoneNumber) => {
    console.log(updateTempPhoneNumber(phoneNumber));
  };

  handleUserSignup = () => {
    console.log('signup button pressed!');
    /* TODO: User signup logic */
    this.props.navigation.navigate('TFA');
  };

  render() {
    const containerStyles = [ContainerStyles.container, { backgroundColor: styles.$teal }];

    return (
      <KeyboardAvoidingView behavior="padding" style={containerStyles}>
        <InputNoBorder
          placeholder="Name"
          onChangeText={name => this.handleUpdateTempName(name)}
          autoCapitalize="words"
          autoCorrect /* Because their name might be weird */
        />
        <InputNoBorder
          placeholder="Email"
          onChangeText={userName => this.handleUpdateTempUserName(userName)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <InputNoBorder
          placeholder="Password"
          onChangeText={password => this.handleUpdateTempPassword(password)}
          autoCapitalize="none"
          secureTextEntry
        />
        <InputNoBorder
          placeholder="Phone Number"
          onChangeText={phoneNumber => this.handleUpdateTempPhoneNumber(phoneNumber)}
          autoCapitalize="none"
          keyboardType="phone-pad"
        />
        <ButtonWithChevron
          text="Sign Up"
          color={styles.$yellow}
          onPress={this.handleUserSignup}
          size="small"
        />
      </KeyboardAvoidingView>
    );
  }
}

export default SignupScreen;
