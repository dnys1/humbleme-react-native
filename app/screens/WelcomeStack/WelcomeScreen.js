import React, { Component } from 'react';
import { View, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { WhiteLogo, LogoTorch } from '../../components/Logo';
import { ButtonWithChevron } from '../../components/Button';
import { HeaderWarningNotification } from '../../components/Header';

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
      borderBottomWidth: 0 /* https://github.com/react-navigation/react-navigation/issues/865 */,
    }),
    headerTitle:
      navigation.state.params && navigation.state.params.showWarning ? (
        <HeaderWarningNotification />
      ) : null,
  });

  componentWillMount() {
    NetInfo.addEventListener('connectionChange', this.props.changeConnectionStatus);
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

const mapState = (state) => {
  const { connected, hasCheckedStatus } = state.network;
  return {
    connected,
    hasCheckedStatus,
  };
};

const mapDispatch = {
  changeConnectionStatus,
};

export default connect(mapState, mapDispatch)(WelcomeScreen);
