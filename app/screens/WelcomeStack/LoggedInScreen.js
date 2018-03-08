import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../../components/Container';
import { Heading } from '../../components/Text';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
});

export default class LoggedInScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <Heading color={styles.$orange} text="Logged In" />
      </Container>
    );
  }
}
