import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { Heading } from '../../components/Text';

import { logOut } from '../../actions/app';

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
      <TouchableOpacity onPress={() => navigation.dispatch(logOut())}>
        <Text style={{ color: 'white', fontSize: 19 }}>Logout</Text>
      </TouchableOpacity>
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

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(LoggedInScreen);
