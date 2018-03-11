import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { Heading } from '../../components/Text';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
});

class ProfileScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      paddingHorizontal: 8,
    }),
    title: 'Profile',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: 20,
    },
    headerLeft: null,
  });

  render() {
    return (
      <Container backgroundColor="white">
        <Heading color={styles.$orange} text="Profile" />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProfileScreen);
