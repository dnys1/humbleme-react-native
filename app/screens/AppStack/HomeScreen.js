import React, { Component } from 'react';
import { View } from 'react-native';
import { Asset } from 'expo';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { WhiteLogo } from '../../components/Logo';
import { ScorePanel } from '../../components/Score';

import { ButtonWithChevron, LogOutButton } from '../../components/Button';
import { Heading } from '../../components/Text';

const styles = EStyleSheet.create({
  $teal: '$primaryTeal',
  $yellow: '$primaryYellow',
  $green: '$primaryGreen',
});

class HomeScreen extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    profile: PropTypes.instanceOf(Asset),
    navigation: PropTypes.object,
  };

  static navigationOptions = ({ navigation }) => ({
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      paddingHorizontal: 8,
      paddingBottom: 8,
    }),
    headerTitle: <WhiteLogo scale={0.34} />,
    headerTitleStyle: {
      margin: -8,
    },
    headerLeft: <LogOutButton />,
    headerRight:
      navigation.state.params && navigation.state.params.profile ? (
        <Avatar
          small
          rounded
          source={{ uri: navigation.state.params.profile.uri }}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
        />
      ) : (
        <Avatar
          small
          rounded
          icon={{ name: 'user' }}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
        />
      ),
  });

  componentWillMount() {
    this.props.navigation.setParams({ profile: this.props.profile });
  }

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
  profile: state.app.profile,
});

export default connect(mapStateToProps)(HomeScreen);
