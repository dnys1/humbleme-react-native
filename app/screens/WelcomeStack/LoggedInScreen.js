import React, { Component } from 'react';
import { Button } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { Heading } from '../../components/Text';

import { logOut } from '../../actions/welcome';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
});

class LoggedInScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      paddingHorizontal: 8,
    }),
    headerTintColor: '#fff',
    headerTitleStype: {
      fontWeight: '600',
      fontSize: 80,
    },
    headerLeft: (
      // TODO: 'color' property sets background color in Android
      // Style looks back... build own?
      <Button
        title="Logout"
        style={{ color: 'white', backgroundColor: 'transparent' }}
        onPress={() => navigation.dispatch(logOut())}
      />
    ),
  });

  render() {
    return (
      <Container backgroundColor={styles.$teal}>
        <Heading color={styles.$orange} text="Logged In" />
      </Container>
    );
  }
}

const mapState = state => ({
  user: state.welcome.user,
});

export default connect(mapState)(LoggedInScreen);
