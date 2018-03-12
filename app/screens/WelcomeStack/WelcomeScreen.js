import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { connect } from 'react-redux';
import { connectAlert } from '../../components/Alert';

import { isEmpty } from '../../utils';

import { Container } from '../../components/Container';
import { WhiteLogo, LogoTorch } from '../../components/Logo';
import { ButtonWithChevron } from '../../components/Button';
// import { HeaderWarningNotification } from '../../components/Header';

import { applicationLoaded } from '../../actions/app';
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
  };

  /* Interesting method for incorporating stylesheet vars into header */
  /* see https://github.com/vitalets/react-native-extended-stylesheet/issues/50 */
  // static navigationOptions = {
  //   headerTitle: <WhiteLogo percentScale="50%" />,
  //   headerStyle: EStyleSheet.create({
  //     backgroundColor: () => EStyleSheet.value('$primaryTeal'),
  //   }),
  // };

  static navigationOptions = () => ({
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      borderBottomWidth: 0 /* iOS fix */,
      elevation: 0 /* Android fix */,
    }),
    // headerTitle:
    //   navigation.state.params && navigation.state.params.showWarning ? (
    //     <HeaderWarningNotification />
    //   ) : null,
  });

  componentWillMount() {
    NetInfo.addEventListener('connectionChange', this.props.changeConnectionStatus);
    this.buttonsEnabled = false;
  }

  componentDidMount() {
    setTimeout(() => this.props.applicationLoaded(), 1000);
    this.buttonsEnabled = true;
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (!isEmpty(error) && error !== this.props.error) {
      this.props.alertWithType(error.alertStyle, error.title, error.msg);
    }
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.props.changeConnectionStatus);
  }

  handleLoginPress = () => {
    this.buttonsEnabled = false;
    this.props.navigation.navigate('Login');
    this.buttonsEnabled = true;
  };

  handleSignupPress = () => {
    this.buttonsEnabled = false;
    this.props.navigation.navigate('Signup');
    this.buttonsEnabled = true;
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <WhiteLogo scale={0.9} style={{ paddingBottom: 50 }} />
        <ButtonWithChevron
          text="Login"
          color={styles.$orange}
          onPress={this.handleLoginPress}
          disabled={!this.buttonsEnabled}
        />
        <ButtonWithChevron
          text="Sign Up"
          color={styles.$yellow}
          onPress={this.handleSignupPress}
          disabled={!this.buttonsEnabled}
        />
        <LogoTorch scale={0.18} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { connected, hasCheckedStatus, error } = state.network;

  return {
    connected,
    hasCheckedStatus,
    error,
  };
};

const mapDispatchToProps = {
  applicationLoaded,
  changeConnectionStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(connectAlert(WelcomeScreen));
