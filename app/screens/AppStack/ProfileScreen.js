import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../../components/Container';
import { ProfilePicture, ProfileName } from '../../components/Profile';

// const styles = EStyleSheet.create({
//   $teal: '$primaryTeal',
//   $orange: '$primaryOrange',
// });

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
      fontFamily: 'Avenir-Black',
      fontSize: 20,
    },
    headerLeft: null,
  });

  static propTypes = {
    profile: PropTypes.string,
    images: PropTypes.object,
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
        <ProfileName />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { profile, images } = state.auth;
  return {
    profile,
    images,
  };
};

export default connect(mapStateToProps)(ProfileScreen);
