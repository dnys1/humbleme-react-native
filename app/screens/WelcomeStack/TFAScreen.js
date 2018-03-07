import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import PropTypes from 'prop-types';

import { styles as ContainerStyles } from '../../components/Container';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateTempAuthCode } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
});

class TFAScreen extends Component {
  // static propTypes = {
  //   navigation: PropTypes.object,
  // };

  static navigationOptions = {
    title: 'Authentication',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
    }),
    headerTintColor: '#fff',
    headerTitleStype: {
      fontWeight: '600',
      fontSize: 80,
    },
  };

  handleUpdateTempAuthCode = (authCode) => {
    /* TODO: Check Cognito AuthCode */
    console.log(updateTempAuthCode(authCode));
  };

  render() {
    const containerStyles = [ContainerStyles.container, { backgroundColor: styles.$teal }];

    return (
      <KeyboardAvoidingView behavior="padding" style={containerStyles}>
        <InputNoBorder
          placeholder="Authentication Code"
          onChangeText={authCode => this.handleUpdateTempAuthCode(authCode)}
          autoCapitalize="none"
        />
        <ButtonWithChevron
          text="Verify"
          color={styles.$yellow}
          onPress={this.handleLoginRequest}
          size="small"
        />
      </KeyboardAvoidingView>
    );
  }
}

export default TFAScreen;
