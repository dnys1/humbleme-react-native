import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Header } from 'react-navigation';
import { connect } from 'react-redux';

import { connectAlert } from '../../components/Alert';
import { isEmpty } from '../../utils';

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
    isTransitioning: PropTypes.bool,
    error: PropTypes.object,
  };

  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      borderBottomWidth: 0,
    }),
    headerLeft: null,
  };

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (!isEmpty(error.confirm) && error.confirm !== this.props.error.confirm) {
      this.props.alertWithType(error.confirm.alertStyle, error.confirm.title, error.confirm.msg);
    }
  }

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
              this.props.updateName({
                name: this.props.name,
                user: this.props.user,
              });
            }}
            disabled={this.props.isTransitioning}
            size="small"
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const { error } = state.welcome;
  const { name } = state.welcome.signup;
  const { isTransitioning } = state.nav;
  return {
    user,
    name,
    isTransitioning,
    error,
  };
};

const mapDispatchToProps = {
  updateSignupName,
  updateName,
};

export default connect(mapStateToProps, mapDispatchToProps)(connectAlert(NameScreen));
