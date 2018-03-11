import React from 'react';
import { View } from 'react-native';
import { ImagePicker } from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';

import { uploadImage } from '../../actions/app';

import styles from './styles';

class ProfilePicture extends React.Component {
  async pickImage(upload) {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
      exif: true,
    };

    try {
      const response = await ImagePicker.launchImageLibraryAsync(options);
      console.log(response);
      if (response.cancelled) {
        console.log('User cancelled image upload');
      } else {
        upload({ image: response, type: 'profile' });
      }
    } catch (err) {
      console.log('Image upload error: ', err);
    }
  }

  render() {
    return (
      <View style={styles.pictureContainer}>
        <Avatar
          xlarge
          rounded
          source={this.props.source}
          onPress={() => this.pickImage(this.props.uploadImage)}
          activeOpacity={0.8}
        />
      </View>
    );
  }
}

ProfilePicture.propTypes = {
  source: PropTypes.object.isRequired,
  uploadImage: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  uploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture);
