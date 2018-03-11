import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { logOut } from '../../actions/app';

import { Container } from '../../components/Container';
import { ProfilePicture, ProfileName } from '../../components/Profile';

// const styles = EStyleSheet.create({
//   $teal: '$primaryTeal',
//   $orange: '$primaryOrange',
// });

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: EStyleSheet.create({
      backgroundColor: () => EStyleSheet.value('$primaryTeal'),
      paddingHorizontal: 8,
    }),
    title: 'Profile',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '600',
      fontFamily: 'Avenir-Black',
      fontSize: 20,
    },
    headerLeft: (
      // TODO: 'color' property sets background color in Android
      // Style looks back... build own?
      <TouchableOpacity onPress={() => navigation.dispatch(logOut())}>
        <Text style={{ color: 'white', fontSize: 19 }}>Logout</Text>
      </TouchableOpacity>
    ),
  });

  static propTypes = {
    profile: PropTypes.string,
    images: PropTypes.object,
    name: PropTypes.string,
  };

  render() {
    let profileImage;
    if (this.props.profile) {
      profileImage = this.props.images[this.props.profile].imageURL;
    } else {
      profileImage =
        'https://s3-us-west-2.amazonaws.com/humblemern-hosting-mobilehub-1610310657/default.jpg';
    }
    console.log(profileImage);
    return (
      <Container
        style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}
        backgroundColor="white"
      >
        <ProfilePicture source={{ uri: profileImage }} />
        <ProfileName name={this.props.name} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { profile, images } = state.auth;
  const { given_name, family_name } = state.auth.attributes;
  const name = `${given_name} ${family_name}`;
  return {
    profile,
    images,
    given_name,
    family_name,
    name,
  };
};

export default connect(mapStateToProps)(ProfileScreen);
