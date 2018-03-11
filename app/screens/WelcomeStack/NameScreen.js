import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Header } from 'react-navigation';
import { connect } from 'react-redux';

import { connectAlert } from '../../components/Alert';

import { Container } from '../../components/Container';
import { Subheading } from '../../components/Text';
import { InputNoBorder } from '../../components/TextInput';
import { ButtonWithChevron } from '../../components/Button';

import { updateSignupName, updateName } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
  $viewStyles: '$keyboardAvoidingView',
  $textViewStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

class NameScreen extends Component {
  static propTypes = {
    user: PropTypes.object,
    name: PropTypes.string,
    updateName: PropTypes.func,
    updateSignupName: PropTypes.func,
    alertWithType: PropTypes.func,
  };

  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      borderBottomWidth: 0,
    }),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: 25,
    },
  };

  render() {
    const keyboardOffset = Header.HEIGHT + 22;
    return (
      <Container backgroundColor={styles.$teal}>
        <KeyboardAvoidingView
          style={styles.$viewStyles}
          keyboardVerticalOffset={keyboardOffset}
          behavior="padding"
        >
          <View style={styles.$textViewStyles}>
            <Subheading color="white" text="Last Step!" />
            <Text style={{ color: 'white', width: '80%', marginBottom: 10 }}>
              Please enter your full name to complete registration.
            </Text>
          </View>
          <InputNoBorder
            placeholder="Full Name"
            onChangeText={name => this.props.updateSignupName(name)}
            autoCapitalize="words"
          />
          <ButtonWithChevron
            text="Submit"
            color={styles.$yellow}
            onPress={() => {
              const fullName = this.props.name.split(' ');
              if (fullName.length === 2 && this.props.user) {
                this.props.updateName({
                  first: fullName[0],
                  last: fullName[1],
                  user: this.props.user,
                });
              } else {
                this.props.alertWithType(
                  'error',
                  'Signup Error',
                  'Please enter your first and last name',
                );
              }
            }}
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const { name } = state.welcome.signup;
  return {
    user,
    name,
  };
};

const mapDispatchToProps = {
  updateSignupName,
  updateName,
};

export default connect(mapStateToProps, mapDispatchToProps)(connectAlert(NameScreen));
