import React, { Component } from 'react';
import { View, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { connect } from 'react-redux';
import { connectAlert } from '../../components/Alert';

import { isEmpty } from '../../utils';

import { Container } from '../../components/Container';
import { WhiteLogo, LogoTorch } from '../../components/Logo';
import { ButtonWithChevron } from '../../components/Button';
import { HeaderWarningNotification } from '../../components/Header';

import { applicationLoaded, clearWarning, clearError } from '../../actions/app';
import { changeConnectionStatus } from '../../actions/network';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
  $yellow: '$primaryYellow',
});

class WelcomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    changeConnectionStatus: PropTypes.func,
    applicationLoaded: PropTypes.func,
    alertWithType: PropTypes.func,
    error: PropTypes.object,
    clearWarning: PropTypes.func,
    clearError: PropTypes.func,
  };

  /* Interesting method for incorporating stylesheet vars into header */
  /* see https://github.com/vitalets/react-native-extended-stylesheet/issues/50 */
  // static navigationOptions = {
  //   headerTitle: <WhiteLogo percentScale="50%" />,
  //   headerStyle: EStyleSheet.create({
  //     backgroundColor: () => EStyleSheet.value('$primaryTeal'),
  //   }),
  // };

  static navigationOptions = ({ navigation }) => ({
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      borderBottomWidth: 0 /* iOS fix */,
      elevation: 0 /* Android fix */,
    }),
    headerTitle:
      navigation.state.params && navigation.state.params.showWarning ? (
        <HeaderWarningNotification />
      ) : null,
  });

  componentWillMount() {
    NetInfo.addEventListener('connectionChange', this.props.changeConnectionStatus);
  }

  componentDidMount() {
    setTimeout(() => this.props.applicationLoaded(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (!isEmpty(error)) {
      console.log(`There's a ${error.type} error: `, error);
      this.props.alertWithType(error.alertStyle, error.title, error.msg);
      if (error.alertStyle === 'warn') {
        this.props.clearWarning();
      } else if (error.alertStyle === 'error') {
        this.props.clearError();
      }
    }
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.props.changeConnectionStatus);
  }

  handleLoginPress = () => {
    this.props.navigation.navigate('Login');
  };

  handleSignupPress = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <View style={{ paddingBottom: 50 }}>
          <WhiteLogo scale={0.9} />
        </View>
        <ButtonWithChevron text="Login" color={styles.$orange} onPress={this.handleLoginPress} />
        <ButtonWithChevron text="Sign Up" color={styles.$yellow} onPress={this.handleSignupPress} />
        <LogoTorch scale={0.18} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { connected, hasCheckedStatus } = state.network;
  const { error } = state.app;

  return {
    connected,
    hasCheckedStatus,
    error,
  };
};

const mapDispatchToProps = {
  applicationLoaded,
  changeConnectionStatus,
  clearWarning,
  clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(connectAlert(WelcomeScreen));
