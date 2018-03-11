import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { Heading } from '../../components/Text';
import { WhiteLogo } from '../../components/Logo';

import { logOut } from '../../actions/app';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $orange: '$primaryOrange',
});

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      paddingHorizontal: 8,
    }),
    headerTitle: <WhiteLogo scale={0.34} />,
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
      <Container backgroundColor="white">
        <Heading color={styles.$orange} text="Logged In" />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);
