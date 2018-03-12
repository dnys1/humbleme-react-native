import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Animatable from 'react-native-animatable';

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

const SHOULD_ANIMATE = true; // process.env.NODE_ENV !== 'development';

const bounceInLeftCustom = {
  0: {
    opacity: 0,
    translateX: -600,
  },
  0.6: {
    opacity: 1,
    translateX: 20,
  },
  0.9: {
    translateX: -8,
  },
  1: {
    translateX: 0,
  },
};

const bounceInRightCustom = {
  0: {
    opacity: 0,
    translateX: 600,
  },
  0.6: {
    opacity: 1,
    translateX: -20,
  },
  0.9: {
    translateX: 8,
  },
  1: {
    translateX: 0,
  },
};

Animatable.initializeRegistryWithDefinitions({ bounceInRightCustom, bounceInLeftCustom });

class WelcomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    changeConnectionStatus: PropTypes.func,
    alertWithType: PropTypes.func,
    error: PropTypes.object,
    applicationLoaded: PropTypes.func,
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

  constructor(props) {
    super(props);
    this.buttonsEnabled = false;
  }

  componentWillMount() {
    NetInfo.addEventListener('connectionChange', this.props.changeConnectionStatus);
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
    this.props.navigation.navigate('Login');
  };

  handleSignupPress = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    const ANIMATION_DURATION = 1300;
    return (
      <Container backgroundColor={styles.$teal}>
        <Animatable.View
          animation={(SHOULD_ANIMATE && 'fadeInDown') || null}
          duration={ANIMATION_DURATION}
          onAnimationEnd={() => setTimeout(() => this.props.applicationLoaded(), 400)}
        >
          <WhiteLogo scale={0.9} style={{ paddingBottom: 50 }} />
        </Animatable.View>
        <Animatable.View
          animation={(SHOULD_ANIMATE && 'bounceInLeftCustom') || null}
          duration={ANIMATION_DURATION}
        >
          <ButtonWithChevron text="Login" color={styles.$orange} onPress={this.handleLoginPress} />
        </Animatable.View>
        <Animatable.View
          animation={(SHOULD_ANIMATE && 'bounceInRightCustom') || null}
          duration={ANIMATION_DURATION}
        >
          <ButtonWithChevron
            text="Sign Up"
            color={styles.$yellow}
            onPress={this.handleSignupPress}
          />
        </Animatable.View>
        <Animatable.View
          animation={(SHOULD_ANIMATE && 'fadeInUp') || null}
          duration={ANIMATION_DURATION}
        >
          <LogoTorch scale={0.18} />
        </Animatable.View>
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
