import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import PropTypes from 'prop-types';

import { styles as ContainerStyles } from '../../components/Container';
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
    const containerStyles = [ContainerStyles.container, { backgroundColor: styles.$teal }];

    return (
      <KeyboardAvoidingView style={containerStyles} behavior="padding">
        <InputNoBorder
          placeholder="Username"
          onChangeText={userName => this.handleUpdateTempUserName(userName)}
          autoCapitalize="none"
        />
        <InputNoBorder
          placeholder="Password"
          onChangeText={password => this.handleUpdateTempPassword(password)}
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
    );
  }
}

export default LoginScreen;
