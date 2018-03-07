import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../../components/Container';
import { WhiteLogo, LogoTorch } from '../../components/Logo';
import { ButtonWithChevron } from '../../components/Button';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
  $yellow: '$primaryYellow',
});

class WelcomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  /* Interesting method for incorporating stylesheet vars into header */
  /* see https://github.com/vitalets/react-native-extended-stylesheet/issues/50 */
  // static navigationOptions = {
  //   headerTitle: <WhiteLogo percentScale="50%" />,
  //   headerStyle: EStyleSheet.create({
  //     backgroundColor: () => EStyleSheet.value('$primaryTeal'),
  //   }),
  // };

  static navigationOptions = {
    header: null /* hide the header */,
  };

  handleLoginPress = () => {
    this.props.navigation.navigate('Login');
  };

  handleSignupPress = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
<<<<<<< HEAD
        <View style={{ paddingBottom: 50 }}>
          <WhiteLogo scale={0.9} />
=======
        <View style={{ paddingBottom: 70 }}>
          <WhiteLogo scale={0.95} />
>>>>>>> 998e0b9cd01acf5d2531ec777f0c64ba0707951a
        </View>
        <ButtonWithChevron text="Login" color={styles.$orange} onPress={this.handleLoginPress} />
        <ButtonWithChevron text="Signup" color={styles.$yellow} onPress={this.handleSignupPress} />
        <LogoTorch />
      </Container>
    );
  }
}

export default WelcomeScreen;
