import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { WhiteLogo } from '../../components/Logo';
import { ScorePanel } from '../../components/Score';

import { logOut } from '../../actions/app';
import { ButtonWithChevron } from '../../components/Button';
import { Heading } from '../../components/Text';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
  $green: '$primaryGreen',
});

class HomeScreen extends Component {
  static propTypes = {
    firstName: PropTypes.string,
  };

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
      <Container
        style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}
        backgroundColor="white"
      >
        <ScorePanel />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Heading text={`Welcome, ${this.props.firstName}!`} />
          <ButtonWithChevron
            text="Score Details"
            color={styles.$yellow}
            onPress={() => console.log('Score button pressed')}
            size="xlarge"
          />
          <ButtonWithChevron
            text="Improve Your Score"
            color={styles.$green}
            onPress={() => console.log('Score button pressed')}
            size="xlarge"
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  firstName: state.auth.attributes.given_name,
});

export default connect(mapStateToProps)(HomeScreen);